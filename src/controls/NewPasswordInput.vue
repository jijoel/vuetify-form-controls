<template>
<password-input
  :value="value"
  v-bind="$attrs"
  v-on="listeners"
  @input="input"
  @blur="blur"
  :label="label"
  :hint="message"
  :persistentHint="true"
  :loading="loading"
>
  <v-progress-linear
    slot="progress"
    :value="progress"
    :color="color"
    height="2"
  ></v-progress-linear>
</password-input>
</template>

<script>
// These are external scripts to run to check password strength
// They will be loaded when the control is initialized
//
// zxcvbn - check password as it is being entered
// hibp - has the enterd password been pwned? How often?
const strengthCheckers = {
  zxcvbn: 'https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js',
  hibp: 'https://unpkg.com/hibp@7.3.0/dist/hibp.min.js',
}
import ChildControl from '../mixins/ChildControl'
import PasswordInput from './PasswordInput'

export default {

  name: 'NewPasswordInput',

  mixins: [ ChildControl ],
  components: { 'password-input': PasswordInput },

  props: {
    label: {
      type: String,
      default: 'New Password'
    },
  },

  data: () => ({
    password_pwned: null,
    password_strength: {
      score: 0,
      feedback: {warning: null, suggestions: []},
    },
  }),

  created() {
    this.loadPasswordStrengthCheckers()
  },

  computed: {
    progress() {
      return this.password_strength.score * 25
    },
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    },
    loading() {
      return !! (this.value && this.value.length)
    },
    message() {
      var message = ''
      if (this.password_pwned)
        message += this.password_pwned

      if (this.password_strength.feedback.warning)
        message += '⚠️ ' + this.password_strength.feedback.warning + '. '

      if (this.password_strength.feedback.suggestions.length)
        message += '🤔 Suggestions: '
          + this.password_strength.feedback.suggestions.join(' ') + '. '

      return message.replace('..', '.')
    }
  },

  methods: {
    blur() {
      this.checkPasswordPwned()
      this.$emit('blur')
    },
    input(value) {
      this.checkPasswordStrength(value)
      this.$emit('input', value)
    },
    loadPasswordStrengthCheckers() {
      Object.keys(strengthCheckers).filter((key) => {
        return (typeof window[key] !== 'function')
      }).map((key) => {
        var tag = document.createElement('script')
        tag.src = strengthCheckers[key]
        document.body.appendChild(tag)
      })
    },
    checkPasswordStrength(value) {
      this.password_pwned = null
      this.password_strength = (!!value && typeof zxcvbn === 'function')
        ? zxcvbn(value)
        : {score: 0, feedback: {warning: null, suggestions: []}}
    },
    checkPasswordPwned() {
      if (typeof hibp !== 'object') {
        console.log('hibp service not found')
        return
      }
      if (!this.value) return

      hibp.pwnedPassword(this.value)
      .then(n => {
        if (n === 0)
          return this.password_pwned = null

        const pwned = [
          {n:10, b:'⚠️', f:'some', s:'questionable'},
          {n:100, b:'⚠️', f:'dozens of', s:'not secure'},
          {n:1000, b:'⚠️', f:'hundreds of', s:'highly insecure'},
          {n:100000, b:'🛑', f:'thousands of', s:'dangerously insecure'},
          {n:Number.MAX_SAFE_INTEGER, b:'🛑', f:'over 100,000', s:'very dangerous to use'},
        ].find(cur => n <= cur.n)

        this.password_pwned = `${pwned.b} Warning: This password has been exposed in ${pwned.f} data breaches. It is ${pwned.s}. Please consider using a different password. `
      })
    }
  },

}
</script>
