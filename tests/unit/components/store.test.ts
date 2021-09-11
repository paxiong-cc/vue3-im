import store from '@/store/index'
import { componentData } from '@/store/modules/editor'
import { ComponentData } from '@/store/interfaces'
import { clone, last } from 'lodash-es'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'
jest.mock('ant-design-vue', () => ({
  message: {
    config: jest.fn()
  }
}))

const cloneComponents = clone(componentData)

const uid = uuidv4()

describe('test editor module', () => {
  beforeAll(() => {

  })
  it('should have default components', () => {
    expect(store.state.editor.components.length).toBe(cloneComponents.length)
  })

  it('add component', () => {
    const component = { id: uid, text: '组件二', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false }
    store.commit('addComponent', component)
    expect(store.state.editor.components).toHaveLength(cloneComponents.length + 1)
  })

  it('select element', () => {
    store.commit('selectCurrentElement', uid)
    expect(store.state.editor.currentElement).toBe(uid)
  })

  // it('update component', () => {
  //   store.commit('selectCurrentElement', { text: uid })
  //   expect
  // })
})
