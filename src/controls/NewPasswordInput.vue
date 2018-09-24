<template>
<v-text-field
  :value="value"
  v-bind="$attrs"
  v-on="$listeners"
  @input="input"
  @blur="blur"
  :name="name"
  :label="label"
  :type="passwordType"
  :prepend-icon="prependIcon"
  :append-icon="passwordIcon"
  @click:append="show_password=!show_password"
  :browser-autocomplete="browserAutocomplete"
  :hint="passwordMessage"
  :persistentHint="true"
  :loading="true"
>
  <v-progress-linear
    slot="progress"
    :value="passwordProgress"
    :color="passwordColor"
    height="2"
  ></v-progress-linear>
</v-text-field>
</template>

<script>
export default {

  name: 'NewPasswordInput',

  inheritAttrs: false,

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
      default: 'New Password'
    },
    prependIcon: {
      type: String,
      default: 'vpn_key'
    },
    value: {
      type: String,
      default: null,
    }
  },

  data: () => ({
    show_password: false,
    password_pwned: null,
    password_strength: {
      score: 0,
      feedback: {warning: null, suggestions: []}
    },
  }),

  created() {
    // Include zxcvbn for password strength meters
    if (typeof zxcvbn === 'undefined') {
      var zxcvbnTag = document.createElement('script');
      zxcvbnTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js';
      document.body.appendChild(zxcvbnTag);
    }

    // Include hibp to see if the password is in a
    // list of pwned passwords (and warn the user, if needed)
    if (typeof hibp === 'undefined') {
      var hibpTag = document.createElement('script');
      hibpTag.src = 'https://unpkg.com/hibp@7.1.3/dist/hibp.min.js'
      document.body.appendChild(hibpTag)
    }
  },

  computed: {
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
    passwordProgress() {
      return Math.min(100, this.value.length * 10)
    },
    passwordColor () {
      var strength = this.password_strength.score * 25
        - this.password_pwned
      if (strength < 0)
        strength = 0

      return ['error', 'warning', 'success'][Math.floor(strength / 40)]
    },
    passwordMessage() {
      var message = ''
      if (this.password_pwned)
        message += this.pwnedMessage

      if (this.password_strength.feedback.warning)
        message += '⚠️ ' + this.password_strength.feedback.warning + '. '

      if (this.password_strength.feedback.suggestions.length)
        message += '🤔 Suggestions: '
          + this.password_strength.feedback.suggestions.join(' ') + '. '

      return message.replace('..', '.')
    },
    pwnedMessage() {
      if (! this.password_pwned) return ''

      const pwned = [
          {n:10, b:'⚠️', f:'some', s:'questionable'},
          {n:100, b:'⚠️', f:'dozens of', s:'not secure'},
          {n:1000, b:'⚠️', f:'hundreds of', s:'highly insecure'},
          {n:100000, b:'🛑', f:'thousands of', s:'dangerously insecure'},
          {n:Number.MAX_SAFE_INTEGER, b:'🛑', f:'over 100,000', s:'very dangerous to use'},
        ].find(cur => this.password_pwned <= cur.n)

        return `${pwned.b} Warning: This password is known to have been exposed in ${pwned.f} data breaches. It is ${pwned.s}. Please consider using a different password. `
    },
  },

  methods: {
    blur() {
      this.$emit('blur')
    },
    input(value) {
      this.$emit('input', value)
    },
    blur() {
      this.checkPasswordPwned()
      this.$emit('blur')
    },
    input(value) {
      this.checkPasswordStrength()
      this.$emit('input', value)
    },
    checkPasswordStrength() {
      this.password_pwned = null
      this.password_strength = (this.value && typeof zxcvbn !== 'undefined')
        ? zxcvbn(this.value)
        : {score: 0, feedback: {warning: null, suggestions: []}}
    },
    checkPasswordPwned() {
      if (!this.value || typeof hibp === 'undefined')
        return this.password_pwned = 0

      hibp.pwnedPassword(this.value)
      .then(n => {
        this.password_pwned = n
      })
    },
  },

}
</script>
