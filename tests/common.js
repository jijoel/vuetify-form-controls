import { mount, shallowMount } from '@vue/test-utils'

function common(control, options={}) {

  // https://github.com/vuejs/vue-test-utils/issues/839
  const { getComputedStyle } = window
  window.getComputedStyle = function getComputedStyleStub(el) {
    return {
      ...getComputedStyle(el),
      transitionDelay: '',
      transitionDuration: '',
      animationDelay: '',
      animationDuration: '',
    }
  }

  test('is rendered as custom vuetify text field', () => {
    const wrapper = shallowMount(control, options)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('renders properties sent by parent', () => {
    const wrapper = shallowMount(control,
      Object.assign({
        propsData: { ':solo': true }
      }, options))
    expect(wrapper.element).toMatchSnapshot()
  })

  test('informs parent when blurred', () => {
    const wrapper = mount(control, options)
    const input = wrapper.find('input')
    input.trigger('blur')

    expect(wrapper.emitted().blur).toBeTruthy()
  })

  test('informs parent when value changes', () => {

    const wrapper = mount(control, options)
    const input = wrapper.find('input')
    input.element.value = 'common value change'
    input.trigger('input')

    expect(wrapper.emitted().input).toBeTruthy()
  })

}

export {
    common
}
