/**
 * This is a mixin for standard properties of any
 * control based on an input.
 */
export default {

  inheritAttrs: false,

  props: {
    value: {
      type: String,
      default: '',
    }
  },

  computed: {
    listeners() { return this.$listeners },
  },

  methods: {
    blur() { this.$emit('blur') },
    input(value) { this.$emit('input', value) },
  },

}
