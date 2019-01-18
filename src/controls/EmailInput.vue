<template>
<v-text-field
  :value="value"
  v-bind="$attrs"
  v-on="$listeners"
  @input="input"
  @blur="blur"
  type="email"
  :name="name"
  :label="label"
  :browser-autocomplete="browserAutocomplete"
  :prepend-icon="prependIcon"
></v-text-field>
</template>

<script>
import ChildControl from '../mixins/ChildControl'

export default {

  name: 'EmailInput',

  mixins: [ ChildControl ],

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
  },

}
</script>
