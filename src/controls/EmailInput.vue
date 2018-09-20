<template>
<v-text-field
  :value="value"
  v-bind="$attrs"
  v-on="$listeners"
  @input="input"
  @blur="blur"
  type="email"
  :name="name"
  :browser-autocomplete="browserAutocomplete"
  :label="label"
  :prepend-icon="prependIcon"
></v-text-field>
</template>

<script>
export default {

  name: 'EmailInput',

  inheritAttrs: false,

  props: {
    name: {
      required: false,
      default: 'email'
    },
    browserAutocomplete: {
      required: false,
      default: 'email'
    },
    label: {
      required: false,
      default: 'E-Mail Address'
    },
    prependIcon: {
      required: false,
      default: 'email'
    },
    value: {
      type: String,
      default: null,
    }
  },

  methods: {
    blur() {
      this.$emit('blur')
    },
    input(value) {
      this.$emit('input', value)
    },
  },
}
</script>
