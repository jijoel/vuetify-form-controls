<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <v-layout row wrap justify-center>
            <v-flex xs12 sm10 md6>
              <v-card>
                <v-card-text>
                  <form @submit.prevent="submit">
                    <SocialLoginButton name="facebook" />
                    <SocialLoginButton name="twitter" />
                    <SocialLoginButton name="github" />
                    <EmailInput v-model="email" />
                    <PasswordInput v-model="password" />
                    <NewPasswordInput v-model="newpassword" />
                    <SubmitButton :form="form" />
                  </form>
                </v-card-text>
              </v-card>
              <v-card>
                <v-card-text>
                  <JsonView>{{ $data }}</JsonView>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import EmailInput from './controls/EmailInput.vue'
import PasswordInput from './controls/PasswordInput.vue'
import NewPasswordInput from './controls/NewPasswordInput.vue'
import SocialLoginButton from './controls/SocialLoginButton.vue'
import SubmitButton from './controls/SubmitButton.vue'
import JsonView from './components/JsonView.vue'

export default {
  name: 'app',

  components: {
    EmailInput,
    PasswordInput,
    NewPasswordInput,
    SocialLoginButton,
    SubmitButton,
    JsonView
  },

  data: function () {
    return {
      email: null,
      password: null,
      newpassword: null,
      form: { busy: false },
    }
  },

  methods: {
    submit() {
      console.log('submitted')
      this.form.busy = true
      setTimeout(() => {
          this.form.busy = false;
      }, 2000);

    }
  },

}
</script>
