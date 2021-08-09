import { shallowMount, VueWrapper, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import EditText from '@/components/MountList/components/EditText.vue'

let wrapper:VueWrapper<any>

describe('EditText', () => {
  beforeAll(() => {
    wrapper = shallowMount(EditText, {
      props: {
        text: 'jj',
        isLocked: false
      }
    })
  })

  it('组件初始化', () => {
    expect(wrapper.get('span').text()).toBe('jj')
  })

  it('鼠标点击输入框修改内容', async () => {
    await wrapper.trigger('click')
    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input')
    input.setValue('ddd')
    expect(input.element.value).toBe('ddd')
  })

  it('鼠标点击后按回车', async () => {
    await wrapper.trigger('click')
    const event = new KeyboardEvent('keydown', { key: 'Enter'})
    document.dispatchEvent(event)
    await nextTick()
    expect(wrapper.get('span').text()).toBe('ddd')
  })

  it('鼠标点击后按ESC', async () => {
    await wrapper.trigger('click')
    const event = new KeyboardEvent('keydown', { key: 'Escape'})
    document.dispatchEvent(event)
    await nextTick()
    expect(wrapper.get('span').text()).toBe('jj')
  })

  it('鼠标点击后点出', async () => {
    await wrapper.trigger('click')
    wrapper.get('input').setValue('ffff')
    const event = new MouseEvent('click')
    document.dispatchEvent(event)
    await nextTick()
    expect(wrapper.get('span').text()).toBe('ffff')
  })
})

