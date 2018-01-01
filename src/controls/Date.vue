<template>
  <v-menu
    offset-y
    full-width
    v-model="show_picker"
    :max-width="width"
    :min-width="width"
    :lazy="lazy"
    :close-on-content-click="false"
    :transition="transition"
  >

    <v-text-field
      slot="activator"
      v-model="formatted_date"
      autocomplete="off"
      @blur='onTextBlur'

      :append-icon-cb="appendIconCb"
      :append-icon="appendIcon"
      :auto-grow="autoGrow"
      :autofocus="autofocus"
      :box="box"
      :clearable="clearable"
      :color="color"
      :counter="counter"
      :dark="dark"
      :disabled="disabled"
      :dont-fill-mask-blanks="dontFillMaskBlanks"
      :error-messages="getErrorMessages"
      :error="error"
      :full-width="fullWidth"
      :hide-details="hideDetails"
      :hint="hint"
      :label="label"
      :light="light"
      :loading="loading"
      :mask="mask"
      :multi-line="multiLine"
      :persistent-hint="persistentHint"
      :placeholder="placeholder"
      :prefix="prefix"
      :prepend-icon-cb="prependIconCb"
      :prepend-icon="prependIcon"
      :readonly="readonly"
      :required="required"
      :return-masked-value="returnMaskedValue"
      :rows="rows"
      :rules="rules"
      :single-line="singleLine"
      :solo="solo"
      :suffix="suffix"
      :tabindex="tabindex"
      :textarea="textarea"
      :toggle-keys="toggleKeys"
      :type="type"
      :validate-on-blur="validateOnBlur"
      :value="value"

    ></v-text-field>

    <v-date-picker
      no-title
      v-model="internal_date"
      @input="onPickerInput"
      :autosave="true"

      :actions="actions"
      :allowed-dates="allowedDates"
      :color="color"
      :dark="dark"
      :first-day-of-week="firstDayOfWeek"
      :landscape="landscape"
      :light="light"
      :scrollable="scrollable"
      :year-icon="yearIcon"
    ></v-date-picker>

  </v-menu>

</template>

<script>
import getYear from 'date-fns/get_year'
import setYear from 'date-fns/set_year'
import formatDate from 'date-fns/format'
import parseDate from 'date-fns/parse'
import isValidDate from 'date-fns/is_valid'

export default {

  data: () => ({
    show_picker: false,
    formatted_date: null,
    internal_date: null,
    error_messages: [],
  }),


  props: {
    // Inherited from VTextField
    appendIconCb: null,
    appendIcon: null,
    autoGrow: null,
    autofocus: null,
    box: null,
    clearable: null,
    color: null,
    counter: null,
    dark: null,
    disabled: null,
    dontFillMaskBlanks: null,
    errorMessages: null,
    error: null,
    fullWidth: null,
    hideDetails: null,
    hint: null,
    label: null,
    light: null,
    loading: null,
    mask: null,
    multiLine: null,
    persistentHint: null,
    placeholder: null,
    prefix: null,
    prependIconCb: null,
    prependIcon: null,
    readonly: null,
    required: null,
    returnMaskedValue: null,
    rows: null,
    rules: null,
    singleLine: null,
    solo: null,
    suffix: null,
    tabindex: null,
    textarea: null,
    toggleKeys: null,
    type: null,
    validateOnBlur: null,
    value: null,

    // Inherited from VDatePicker
    actions: null,
    allowedDates: null,
    color: null,
    dark: null,
    firstDayOfWeek: null,
    landscape: null,
    light: null,
    scrollable: null,
    yearIcon: null,

    // Specific to this control
    format: {
      type: String,
      default: 'M/D/YYYY',
    },
    label: {
      type: String,
      default: 'Date',
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    prependIcon: {
      type: String,
      default: 'event',
    },
    transition: {
      type: String,
      default: 'scale-transition'
    },
    useCurrentYear: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: '290px'
    }
  },

  computed: {
    getErrorMessages() {
      if (!this.errorMessages)
        return this.error_messages

      return this.error_messages.concat(this.errorMessages)
    }
  },

  methods: {
    onPickerInput() {
      this.synchronizeDates(this.internal_date)
    },

    onTextBlur() {
      this.synchronizeDates(this.formatted_date)
      this.$emit('blur')
    },

    synchronizeDates(newDate) {
      const date = this.getValidatedDate(newDate)

      this.internal_date = (date)
        ? formatDate(date, 'YYYY-MM-DD')
        : ''

      this.formatted_date = (date)
        ? formatDate(date, this.format)
        : newDate

        this.$emit('input', this.internal_date)
    },

    getValidatedDate(d) {
      if (! d)
        return

      var date = parseDate(d)
      if (! isValidDate(date))
        return this.setError('Invalid date specified')

      if (this.useCurrentYear && getYear(date) == '2001')
        date = setYear(date, getYear(Date()))

      if (! this.isAllowed(formatDate(date,'YYYY-MM-DD')))
        return this.setError('Requested date is not allowed')

      this.setError(null)
      return date
    },

    // Make sure the given date is allowed;
    // copied directly from vuetify VDatePicker.js
    isAllowed (date) {
      if (!this.allowedDates) return true

      // date parameter must be in ISO 8601 format with leading zero
      // If allowedDates is an array its values must be in ISO 8601 format with leading zero
      // If allowedDates is on object its min/max properties must be in ISO 8601 with leading zero
      if (Array.isArray(this.allowedDates)) {
        return this.allowedDates.indexOf(date) > -1
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date)
      } else if (this.allowedDates instanceof Object) {
        const min = this.allowedDates.min
        const max = this.allowedDates.max
        return (!min || min <= date) && (!max || max >= date)
      }

      return true
    },

    setError(err) {
      if (! err)
        this.error_messages = []
      else
        this.error_messages = [ err ]
    },
  },

}
</script>
