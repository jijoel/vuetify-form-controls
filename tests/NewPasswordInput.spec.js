import './setup'
import { common } from './common'
import { shallowMount } from '@vue/test-utils'
import NewPasswordInput from '../src/controls/NewPasswordInput'

describe('NewPasswordInput', () => {

  const zResponse = {
    score: 0,
    feedback: {
      warning: 'x',
      suggestions: ['foo']
    }
  }

  describe('it runs all common tests', () => {
    global.zxcvbn = jest.fn(() => zResponse)
    global.hibp = jest.fn()

    common(NewPasswordInput, { sync: false })
  })

  test('it loads external scripts (zxcvbn & hibp)', () => {
    global.zxcvbn = null
    global.hibp = null
    document.body.appendChild = jest.fn()

    const wrapper = shallowMount(NewPasswordInput)

    const sources = document.body.appendChild.mock.calls.reduce((acc, el) => {
      return acc.concat(el[0].src)
    }, []).join(' ')

    const scripts = ['zxcvbn', 'hibp']
    scripts.map(script => {
      expect(sources).toContain(script)
    })
  })

  // TODO: use mock object for zxcvbn
  // Skip this test for now; the function does not
  // load the correct mock object
  test.skip('it shows progress bar and color based on password strength', () => {
    global.zxcvbn = jest.fn()

    const wrapper = shallowMount(NewPasswordInput)
    wrapper.setValue('x')

    zxcvbn.mockReturnValue(Object.assign(zResponse, {score:5}))
    wrapper.trigger('input', 'x')
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.color).toBe('success')
    expect(wrapper.vm.progress).toBe(100)

    zxcvbn.mockReturnValue(Object.assign(zResponse, {score:3}))
    wrapper.trigger('input', 'x')
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.color).toBe('warning')
    expect(wrapper.vm.progress).toBe(75)

    zxcvbn.mockReturnValue(Object.assign(zResponse, {score:2}))
    wrapper.trigger('input', 'x')
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.color).toBe('warning')
    expect(wrapper.vm.progress).toBe(50)

    zxcvbn.mockReturnValue(Object.assign(zResponse, {score:0}))
    wrapper.trigger('input', 'x')
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.vm.color).toBe('error')
    expect(wrapper.vm.progress).toBe(0)
  })

})
