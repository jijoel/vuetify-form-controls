<template>
<v-text-field
  :value="value"
  v-bind="$attrs"
  v-on="listeners"
  @input="input"
  @blur="blur"
  :name="name"
  :label="label"
  :type="passwordType"
  :prepend-icon="prependIcon"
  :append-icon="passwordIcon"
  @click:append="show_password=!show_password"
  :browser-autocomplete="browserAutocomplete"
>
  <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>
  <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
    <slot :name="slot" v-bind="scope"/>
  </template>
</v-text-field>
</template>

<script>
import ChildControl from '../mixins/ChildControl'

export default {

  name: 'PasswordInput',

  mixins: [ ChildControl ],

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
  },

  data: () => ({
    show_password: false,
  }),

  computed: {
      progress () {
        const x = Math.min(100, this.value.length * 10)
        console.log(x)
        return x
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
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

}
</script>
