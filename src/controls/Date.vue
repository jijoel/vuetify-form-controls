<template>

  <v-menu
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
    v-model="isOpen"
    :lazy="lazy"
    :close-on-click="true"
    :close-on-content-click="true"
    :transition="transition"
  >
    <v-text-field
      slot="activator"
      autocomplete="off"
      v-model="formatted_date"
      :label="label"
      :required="required"
      :prepend-icon="prependIcon"
      :error-messages="errorMessages"
      @blur="onBlur"
    ></v-text-field>
    <v-date-picker
      no-title
      v-model="date_model"
      :allowed-dates="allowedDates"
    >
    </v-date-picker>
  </v-menu>

</template>

<script>
import getYear from 'date-fns/get_year'
import setYear from 'date-fns/set_year'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import isValidDate from 'date-fns/is_valid'

export default {

  data() {
    return {
      dateMenu: null,
      workspace: null,
      dirty: false,
      touched: false,
    }
  },

  props: {
    allowedDates: null,
    value: {},
    yearIcon: {},

    errorMessages: {
      type: Array,
      default: [],
    },
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
    required: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'scale-transition'
    },
    useCurrentYear: {
      type: Boolean,
      default: true,
    }
  },

  computed: {

    isOpen: {
      get() { return this.dateMenu },
      set(v) {
        this.touched = true
        this.dateMenu = v
      }
    },

    formatted_date: {
      get() {
        return (this.workspace || this.dirty || !this.value)
          ? this.workspace
          : format(this.value, this.format)
      },
      set(v) {
        this.dirty = true
        this.workspace = v
      },
    },

    date_model: {
      get() { return this.value },
      set(v) {
        this.workspace = this.dirty = this.touched = null
        this.$emit('input', v)
      },
    }
  },

  methods: {
    onBlur() {
      if (! this.dirty && ! this.touched)
        return

      this.syncDateValues(this.formatted_date)
      this.$emit('blur')  // to work with vee-validate
    },

    syncDateValues(data) {
      const date = this.getValidatedDate(data)
      if (! date) {
        return this.date_model = null
      }

      this.workspace = this.dirty = null
      this.date_model = format(date, 'YYYY-MM-DD')
    },

    // run validation rules on the data entered
    // (either selected in the picker
    // or entered in the text box)
    getValidatedDate(d) {
      if (! d)
        return

      var date = parse(d)
      if (! isValidDate(date))
        return

      // If a shortcut M/D was entered, use current year
      if (this.useCurrentYear && getYear(date) == '2001')
        date = setYear(date, getYear(Date()))

      if (! this.isAllowed(format(date,'YYYY-MM-DD')))
        return

      return date
    },

    // Make sure the given date is allowed;
    // copied directly from vuetify
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
  },

}

</script>

