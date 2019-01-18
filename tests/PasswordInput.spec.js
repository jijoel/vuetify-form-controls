import './setup'
import { common } from './common'
import { shallowMount } from '@vue/test-utils'
import PasswordInput from '../src/controls/PasswordInput'

describe('PasswordInput', () => {

  common(PasswordInput)

  test('icon can be hidden', () => {
    const wrapper = shallowMount(PasswordInput, {
      propsData: { 'hide-icon': true }
    })
    expect(wrapper.vm.passwordIcon).toBe('')
    expect(wrapper.attributes('append-icon')).toBe('')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('icon and text field change when showing password', () => {
    const wrapper = shallowMount(PasswordInput)
    expect(wrapper.vm.passwordIcon).toBe('visibility')
    expect(wrapper.attributes('append-icon')).toBe('visibility')
    expect(wrapper.attributes('type')).toBe('password')

    wrapper.setData({ show_password: true })

    expect(wrapper.vm.passwordIcon).toBe('visibility_off')
    expect(wrapper.attributes('append-icon')).toBe('visibility_off')
    expect(wrapper.attributes('type')).toBe('text')
  })

})
