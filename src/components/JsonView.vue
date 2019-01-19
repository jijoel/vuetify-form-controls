<template>
<pre :style="style">
<slot>
</slot>
</pre>
</template>

<script>
export default {
  computed: {
    style() {
      return {
        background: '#EEE',
        border: '1px solid #CCC',
        borderRadius: '3pt',
        padding: '10px'
      }
    }
  }
}
</script>
