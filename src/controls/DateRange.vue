<template>
<v-container fluid grid-list-md class="pa-0 ma-0">
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date
        v-model="val.start"
        label="From"
        @input="onInput"
      ></v-date>
    </v-flex>
    <v-flex xs12 sm6>
      <v-date
        v-model="val.end"
        label="To"
        @input="onInput"
      ></v-date>
    </v-flex>
  </v-layout>
</v-container>
</template>


<script>
import DateSelector from './Date'

export default {

  components: {
    'v-date': DateSelector
  },

  props: {
    value: null
  },

  data: () => ({
    val: {
      start: null,
      end: null,
    }
  }),

  methods: {
    onInput() {
        this.$emit('input', this.val)
    }
  },

  watch: {
    value() {
      this.val = this.value
    }
  }

}
</script>
