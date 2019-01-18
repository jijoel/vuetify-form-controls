<template>
<v-btn
  v-bind="$attrs"
  v-on="$listeners"
  :color="color"
  :loading="form.busy"
  :disabled="form.busy"
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
    color: {
      type: String,
      default: 'primary'
    },
    label: {
      type: String,
      default: 'Submit',
    },
    form: {
      type: Object,
      required: true,
    },
  }
}
</script>
