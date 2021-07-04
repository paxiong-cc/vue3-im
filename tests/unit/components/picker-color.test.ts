import { shallowMount, VueWrapper } from '@vue/test-utils'
import ColorPicker from '@/components/ColorPicker/index.vue'
import rgbHex from 'rgb-hex'
const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']

let wrapper: VueWrapper<any>

describe('ColorPicker', () => {
  beforeAll(() => {
    wrapper = shallowMount(ColorPicker, {
      props: {
        value: '#ffffff'
      }
    })
  })

  it('初始化校验', () => {
    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input').element
    expect(input.type).toBe('color')
    expect(input.value).toBe('#ffffff')
    expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColors.length)
    const firstItem = wrapper.get('li:first-child div').element as HTMLElement
    expect('#' + rgbHex(firstItem.style.backgroundColor)).toBe(defaultColors[0])
    const lastItem = wrapper.get('li:last-child div').element as HTMLElement
    expect(lastItem.classList.contains('transparent-back')).toBeTruthy()
  })

  it('选择选择器中的颜色', async() => {
    type basic = string[]
    type event = basic[]
    const black = '#000000'
    const input = wrapper.get('input')
    await input.setValue(black)
    // 发送的事件是change
    expect(wrapper.emitted()).toHaveProperty('change')
    const events: event = wrapper.emitted('change') || []
    expect(events[0]).toEqual([black])
  })

  it('选择颜色改变颜色', () => {
    type basic = string[]
    type event = basic[]
    const secondItem = wrapper.get('li:nth-child(2)')
    secondItem.trigger('click')
    const events: event = wrapper.emitted('change') || []
    expect(events[1]).toEqual([defaultColors[1]])
  })
})
