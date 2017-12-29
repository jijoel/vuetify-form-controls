import { createLocalVue, shallow, mount } from 'vue-test-utils';
import expect from 'expect'

import Vuetify from 'vuetify/dist/vuetify'
import DateControl from '../src/controls/Date.vue'

const localVue = createLocalVue();
localVue.use(Vuetify);


describe ('Date', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(DateControl, { localVue })
    })

    it('includes a text field', () => {
        expect(wrapper.html()).toContain('<input')
    })

    it('can set display props', () => {
        wrapper.setProps({
            label: 'Foo',         // default: Date
            prependIcon: 'fish',  // default: event
            required: true,       // default: false
        })
        expect(wrapper.html()).toContain('Foo')
        expect(wrapper.html()).toContain('fish')
        expect(wrapper.html()).toContain('input-group--required')
    })

    it('can set a date via text field', () => {
        enterText('12/1/2017')
        expectText('12/1/2017')
    })

    it('formats the date as M/D/YYYY by default', () => {
        enterText('2017-12-01')
        expectText('12/1/2017')
    })

    it('can set a different display format', () => {
        wrapper.setProps({
            format: 'MMMM Do, YYYY'
        })
        enterText('2017-12-01')
        expectText('December 1st, 2017')
    })

    it('ignores empty dates', () => {
        wrapper.find('input').trigger('blur')
        expectText('')
    })

    it('only validates when the field is changed', () => {
        inputText('1/1')
        expectText('1/1')

        inputText('foo')
        expectText('foo')

        enterText('1/1/2017')
        expectText('1/1/2017')
    })

    it('leaves the text field alone if given an invalid date', () => {
        enterText('invalid')
        expectText('invalid')
        expect(wrapper.html()).toContain('input-group--error')
    })

    it('sets the year to current year if not provided', () => {
        const year = (new Date()).getFullYear()
        enterText('12/1')
        expectText('12/1/'+year)
    })

    it('uses a flag to avoid setting the year', () => {
        wrapper.setProps({
            useCurrentYear: false
        })
        enterText('12/1')
        expectText('12/1/2001')
    })

    it('prevents the user from entering a disallowed date', () =>{
        wrapper.setProps({
            allowedDates: [ '2017-12-22' ]
        })
        enterText('12/25/2017')
        expectText('12/25/2017')
        expect(wrapper.vm.internal_date).toBe('')
        expect(wrapper.html()).toContain('input-group--error')
    })

    // I'm not sure how to find the date picker
    it('includes a date picker')
    it('can set the date with the date picker')
    it('synchronizes the date picker date with the text date')


    let inputText = (value) => {
        const input = wrapper.find('input')
        input.element.value = value
        input.trigger('input')
        return input
    }
    let enterText = (value) => {
        const input = inputText(value)
        input.trigger('blur')
    }
    let expectText = (value) => {
        expect(wrapper.find('input').element.value)
            .toBe(value)
    }

})
