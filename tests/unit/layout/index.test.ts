/* eslint-disable no-undef */
import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import Layout from '@/layout/index.vue'
import store from '@/store/index'
import { message } from 'ant-design-vue'

let wrapper: VueWrapper<any>

jest.mock('ant-design-vue', () => ({
  message: {
    success: jest.fn()
  }
}))

const mockRoutes: string[] = []
jest.mock('vue-router', () => ({
  // const router = useRouter() router.push()
  useRouter: () => {
    return {
      push: (url: string) => mockRoutes.push(url)
    }
  }
}))

const mockComponent = {
  template: '<div><slot></slot></div>'
}
const mockComponent2 = {
  template: '<div><slot></slot><slot name="overlay"></slot></div>'
}
const globalComponents = {
  'a-layout': mockComponent,
  'a-layout-header': mockComponent,
  'a-layout-content': mockComponent,
  'a-layout-footer': mockComponent,
  'a-button': mockComponent,
  'a-dropdown-button': mockComponent2,
  'router-link': mockComponent,
  'a-menu': mockComponent,
  'a-menu-item': mockComponent,
  'router-view': mockComponent
}

describe('Layout.vue', () => {
  beforeAll(() => {
    // 接管所有的定时器
    jest.useFakeTimers()
    wrapper = mount(Layout, {
      global: {
        components: globalComponents,

        provide: {
          store
        }
      }
    })
  })

  afterEach(() => {
    // 清楚message.success调用次数
    (message as jest.Mocked<typeof message>).success.mockReset()
  })

  // it('登录按钮展示为登录', () => {
  //   expect(wrapper.get('.login').text()).toBe('登录')
  // })

  // it('点击登录', async() => {
  //   await wrapper.get('.login').trigger('click')
  //   expect(message.success).toHaveBeenCalled()
  //   expect(store.state.user.userName).toBe('paxiong')
  // })

  // it('登录成功后', () => {
  //   expect(wrapper.get('.user-profile-component').html()).toContain('paxiong')
  // })

  // it('点击退出登录', async() => {
  //   await wrapper.get('.user-profile-dropdown div').trigger('click')
  //   expect(wrapper.find('.user-profile-component').exists()).toBeFalsy()
  //   expect(message.success).toHaveBeenCalledTimes(1)
  //   jest.runAllTimers()
  //   expect(mockRoutes).toEqual(['/'])
  // })

  // it('退出登录成功后', () => {
  //   expect(wrapper.get('.login').html()).toContain('登录')
  // })
})
