import Vue from 'vue'

import EmailInput from './controls/EmailInput'
import PasswordInput from './controls/PasswordInput'
import NewPasswordInput from './controls/NewPasswordInput'
import SocialLoginButton from './controls/SocialLoginButton'
import SubmitButton from './controls/SubmitButton'

const components = {
    EmailInput,
    PasswordInput,
    NewPasswordInput,
    SocialLoginButton,
    SubmitButton,
}

Object.keys(components.forEach(name => {
    Vue.components(name, components[name])
}))

export default components
