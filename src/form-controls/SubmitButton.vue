<template>
<v-btn
  v-bind="$attrs"
  v-on="$listeners"
  :color="color"
  :loading="loading || form.busy"
  :disabled="disabled || form.busy || form.errors.any()"
  type="submit"
>
  <slot>{{ label }}</slot>
</v-btn>
</template>

<script>
export default {

  name: 'SubmitButton',

  inheritAttrs: false,

  props: {
    form: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Submit',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

}
</script>
