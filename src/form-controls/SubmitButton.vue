<template>
<v-btn
  v-bind="$attrs"
  v-on="$listeners"
  :color="color"
  :label="label"
  :loading="form.busy"
  :disabled="form.busy"
  type="submit"
>
  {{ label }}
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
