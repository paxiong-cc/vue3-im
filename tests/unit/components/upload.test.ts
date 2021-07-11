import { shallowMount, VueWrapper, flushPromises, mount } from '@vue/test-utils'
import Upload from '@/components/Upload/index.vue'
// import flushPromises from 'flush-promises'
import axios from 'axios'

jest.mock('axios')

let wrapper: VueWrapper<any>
const mockedAxios = axios as jest.Mocked<typeof axios>
const testFile = new File(['xyz'], 'test1.png', { type: 'image/png' })
const testFile2 = new File(['xyz'], 'test2.png', { type: 'image/png' })

const mockComponent = {
  template: '<div><slot></slot></div>'
}
const mockComponents = {
  DeleteOutlined: mockComponent,
  LoadingOutlined: mockComponent,
  FileOutlined: mockComponent
}

const setInputValue = (input: HTMLInputElement, file = testFile) => {
  const files = [file] as any
  Object.defineProperty(input, 'files', {
    value: files,
    writable: false
  })
}

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
    expect(wrapper.get('.upload-area button').text()).toBe('点击上传')
    expect(wrapper.get('input').isVisible()).toBeFalsy()
  })

  it('测试上传成功流程', async() => {
    mockedAxios.post.mockResolvedValueOnce(Promise.resolve({ status: 'success' }))
    const fileInput = wrapper.get('input').element as HTMLInputElement
    const files = [testFile] as any
    setInputValue(fileInput, files)
    await wrapper.get('input').trigger('change')
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('.upload-area button').text()).toBe('正在上传')
    // 按钮为禁用状态
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
    await flushPromises()
    expect(wrapper.get('.upload-area button').text()).toBe('点击上传')
    expect(wrapper.get('ul li:first-child').classes()).toContain('upload-success')
  })

  it('测试上传失败流程', async() => {
    mockedAxios.post.mockRejectedValueOnce({ error: 'error' })
    await wrapper.get('input').trigger('change')
    expect(mockedAxios.post).toHaveBeenCalledTimes(2)
    expect(wrapper.get('.upload-area button').text()).toBe('点击上传')
    expect(wrapper.get('ul li:nth-child(2)').classes()).toContain('upload-error')
  })

  it('测试删除流程', async() => {
    const firstEleDel = wrapper.get('ul li:first-child button')
    await firstEleDel.trigger('click')
    expect(wrapper.findAll('ul li').length).toBe(1)
  })

  it.only('测试自定义样式上传', async() => {
    // mockedAxios.post.mockResolvedValueOnce(Promise.resolve({ status: 'success' }))
    mockedAxios.post.mockResolvedValueOnce(Promise.resolve({ data: { url: 'dummy.url' } }))
    mockedAxios.post.mockResolvedValueOnce(Promise.resolve({ data: { url: 'xyz.url' } }))
    // mockedAxios.post.mockResolvedValueOnce({ data: {url: 'xyz.url'}})
    wrapper = mount(Upload, {
      props: {
        action: 'test.url'
      },
      slots: {
        default: '<button>custom button</button>',
        loading: '<div class="loading">custom loading</div>',
        uploaded: `<template #uploaded="{ uploadedData }">
          <div class="custom-loaded">{{ uploadedData.url }}</div>
        </template>
        `
      },
      global: {
        stubs: mockComponents
      }
    })

    expect(wrapper.get('.upload-area button').text()).toBe('custom button')
    const fileInput = wrapper.get('input').element as HTMLInputElement
    setInputValue(fileInput)
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('.loading').text()).toBe('custom loading')
    await flushPromises()
    expect(wrapper.get('.custom-loaded').text()).toBe('dummy.url')
    await wrapper.get('input').trigger('change')
    expect(wrapper.get('.loading').text()).toBe('custom loading')
    await flushPromises()
    expect(wrapper.get('.custom-loaded').text()).toBe('xyz.url')
  })
})
