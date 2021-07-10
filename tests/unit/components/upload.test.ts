import { shallowMount, VueWrapper, flushPromises } from '@vue/test-utils'
import Upload from '@/components/Upload/index.vue'
// import flushPromises from 'flush-promises'
import axios from 'axios'

jest.mock('axios')

let wrapper: VueWrapper<any>
const mockedAxios = axios as jest.Mocked<typeof axios>
const testFile = new File(['xyz'], 'test1.png', { type: 'image/png' })
const testFile2 = new File(['xyz'], 'test2.png', { type: 'image/png' })

describe('Upload Component', () => {
  beforeAll(() => {
    wrapper = shallowMount(Upload, {
      props: {
        action: 'test.url'
      }
    })
  })

  it('初始化验证', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.get('button span').text()).toBe('点击上传')
    expect(wrapper.get('input').isVisible()).toBeFalsy()
  })

  it('测试上传成功流程', async() => {
    mockedAxios.post.mockResolvedValueOnce(Promise.resolve({ status: 'success' }))
    const fileInput = wrapper.get('input').element as HTMLInputElement
    const files = [testFile] as any
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false
    })
    await wrapper.get('input').trigger('change')
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button span').text()).toBe('正在上传')
    // 按钮为禁用状态
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
    await flushPromises()
    expect(wrapper.get('button span').text()).toBe('点击上传')
    expect(wrapper.get('ul li:first-child').classes()).toContain('upload-success')
  })

  it('测试上传失败流程', async() => {
    mockedAxios.post.mockRejectedValueOnce({ error: 'error' })
    await wrapper.get('input').trigger('change')
    expect(mockedAxios.post).toHaveBeenCalledTimes(2)
    expect(wrapper.get('button span').text()).toBe('点击上传')
    expect(wrapper.get('ul li:nth-child(2)').classes()).toContain('upload-error')
  })

  it('测试删除流程', async() => {
    const firstEleDel = wrapper.get('ul li:first-child button')
    await firstEleDel.trigger('click')
    expect(wrapper.findAll('ul li').length).toBe(1)
  })
})
