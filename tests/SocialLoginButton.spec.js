import './setup'
import { shallowMount } from '@vue/test-utils'
import SocialLoginButton from '../src/controls/SocialLoginButton'

describe('SocialLoginButton', () => {

  const mocks = { '$t': (val) => val }

  test('it renders a standard button', () => {
    const wrapper = shallowMount(SocialLoginButton, {
        propsData: { name: 'foo' },
        mocks,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it renders a github button', () => {
    const wrapper = shallowMount(SocialLoginButton, {
        propsData: { name: 'github' },
        mocks,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it renders a facebook button', () => {
    const wrapper = shallowMount(SocialLoginButton, {
        propsData: { name: 'facebook' },
        mocks,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  // TODO: Mock the axios plugin @/plugins/axios
  test.skip('it sets the window location to the social login page', ()=>{
  })

})
