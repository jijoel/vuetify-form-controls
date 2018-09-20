<template>
<v-text-field
  :value="value"
  v-bind="$attrs"
  v-on="$listeners"
  @input="input"
  @blur="blur"
  :name="name"
  :label="label"
  :type="passwordType"
  :prepend-icon="prependIcon"
  :append-icon="passwordIcon"
  @click:append="show_password=!show_password"
  :browser-autocomplete="browserAutocomplete"
></v-text-field>
</template>

<script>
export default {

  name: 'PasswordInput',

  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: 'password'
    },
    browserAutocomplete: {
      type: String,
      default: 'current-password'
    },
    hideIcon: {
      type: [Boolean, String],
      default: false
    },
    label: {
      type: String,
      default: 'Password'
    },
    prependIcon: {
      type: String,
      default: 'vpn_key'
    },
    value: {
      type: String,
      default: null,
    }
  },

  data: () => ({
    show_password: false,
  }),

  computed: {
    passwordIcon() {
      if (this.hideIcon)
        return ''

      return (this.show_password)
        ? 'visibility_off'
        : 'visibility'
    },
    passwordType() {
      return (this.show_password)
        ? 'text'
        : 'password'
    },
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
