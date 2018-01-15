<template>
<v-container fluid grid-list-md class="pa-0 ma-0">
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date
        @input="onStartInput"
        v-model="val.start"
        label="From"
      ></v-date>
    </v-flex>
    <v-flex xs12 sm6>
      <v-date
        @input="onEndInput"
        v-model="val.end"
        label="To"
      ></v-date>
    </v-flex>
  </v-layout>
</v-container>
</template>


<script>
import differenceInDays from 'date-fns/difference_in_days'
import addDays from 'date-fns/add_days'
import DateSelector from './Date'

export default {

  components: {
    'v-date': DateSelector
  },

  props: {
    adjustEnd: {
      type: Boolean,
      default: false,
    },
    value: {
      default: () => ({
        start: null,
        end: null,
      })
    }
  },

  data() {
    return {
      nDays: this.days,
      val: {
        start: this.$props.value.start,
        end: this.$props.value.end,
      }
    }
  },

  computed: {
    days() {
      return differenceInDays(
        this.val.end, this.val.start
      )
    }
  },

  methods: {
    onStartInput(newDate) {
      if (this.adjustEnd && this.val.start)
        this.resetEndFromStart(newDate)

      this.$emit('input', this.val)
    },
    onEndInput() {
      this.nDays = this.days

      this.$emit('input', this.val)
    },

    resetEndFromStart(newDate) {
      if (this.nDays)
        return this.val.end = addDays(this.val.start, this.nDays)

      if (! this.val.end)
        return this.val.end = newDate
    }
  },

  watch: {
    value() {
      this.val = this.value
      this.nDays = this.days
    }
  }

}
</script>
