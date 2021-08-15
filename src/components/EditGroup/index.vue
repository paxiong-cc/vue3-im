<template>
  <a-collapse>
    <a-collapse-panel
      v-for="(item, idx) in renderEle"
      :key="idx"
      :header="item.header"
    >
      <PropsTable :props="item.props" @change="contentChange" />
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType, computed } from 'vue'
import PropsTable from '../PropsTable/index.vue'
import { TextComponentProps } from '../PText/interface'
import { intersection as _intersection } from 'lodash'

export interface RenderGroup {
  header: string;
  props: Partial<TextComponentProps>
}

type TextKeys = Partial<keyof TextComponentProps>[]

export interface Group {
  header: string;
  item: TextKeys;
}

const groupList: Group[] = [
  {
    header: '基本信息',
    item: ['text']
  },
  {
    header: '其他信息',
    item: ['fontSize', 'fontFamily', 'lineHeight']
  }
]

export default defineComponent({
  name: 'Home',

  components: {
    PropsTable
  },

  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      default: () => {
        return {} as PropType<TextComponentProps>
      }
    }
  },

  commits: ['change'],

  setup(props, context) {
    const renderEle = computed(() => {
      let preRenderGroup: Group[] = []
      const propsArray: TextKeys = Object.keys(props.props) as TextKeys
      let renderGroup: RenderGroup[] = []

      // 查找需要渲染的group
      preRenderGroup = groupList.filter(item => !!_intersection(item.item, propsArray).length)
      // 将相同的拥有本地模板项的属性筛选出来
      preRenderGroup = preRenderGroup.map(item => {
        return {
          header: item.header,
          item: _intersection(item.item, propsArray)
        }
      })
      // 将过滤出的属性转化成需要的属性
      renderGroup = preRenderGroup.map(item => {
        const newProps: {[key in keyof TextComponentProps]?: string} = {}
        item.item.forEach(key => {
          newProps[key] = props.props[key]
        })
        return {
          header: item.header,
          props: newProps
        }
      })

      return renderGroup
    })

    const contentChange = (e: any) => {
      context.emit('change', e)
    }

    return {
      renderEle,
      contentChange
    }
  }
})

</script>

<style lang='scss' scoped>
</style>
