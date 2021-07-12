import { shallowMount, VueWrapper } from '@vue/test-utils'
import ComponentList from '@/components/ComponentList/index.vue'
import { wrap } from 'lodash-es'

let wrapper: VueWrapper<any>

const mockComponent = {
  template: '<div></div>'
}
const components = {
  PText: mockComponent
}

describe('组件列表', () => {
  beforeAll(() => {
    wrapper = shallowMount(ComponentList, {
      props: {
        list: [
          {
            text: '哈哈',
            fontSize: '12px',
            fontWeight: '600'
          }
        ]
      },

      global: {
        stubs: components
      }
    })
  })

  it('组件初始化', () => {
      type basic = {
        name: string,
        id: string,
        text: string,
        fontSize: string,
        fontWeight: string
      }
      type event = basic[]
      expect(wrapper.findAll('.component-item').length).toBe(1)
      const firstItem = wrapper.find('.component-item:first-child')
      firstItem.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('on-item-click')
      const events: event = wrapper.emitted('on-item-click') || []
      const id = JSON.parse(JSON.stringify(events[0]))[0].id
      expect(events[0]).toEqual([
        {
          name: 'p-text',
          id,
          props: {
            text: '哈哈',
            fontSize: '12px',
            fontWeight: '600'
          }
        }
      ])
  })
})
