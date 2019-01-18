import './setup'
import { shallowMount } from '@vue/test-utils'
import SubmitButton from '../src/controls/SubmitButton'

describe('SubmitButton', () => {

  test('it is rendered as custom vuetify button', () => {
    const wrapper = shallowMount(SubmitButton, {
        propsData: { form: jest.mock() }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it has a slot for a label', () => {
    const wrapper = shallowMount(SubmitButton, {
        propsData: { form: jest.mock() },
        slots: { default: 'Do it' },
    })
    expect(wrapper.text()).toContain('Do it')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it can have label in prop', () => {
    const wrapper = shallowMount(SubmitButton, {
        propsData: { form: jest.mock(), label: 'Do it' },
    })
    expect(wrapper.text()).toContain('Do it')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('it can show loading status when form is busy', () => {
    const wrapper = shallowMount(SubmitButton, {
        propsData: { form: { busy: true }}
    })
    expect(wrapper.html()).toContain('loading')
    expect(wrapper.html()).toContain('disabled')
    expect(wrapper.element).toMatchSnapshot()
  })

})
