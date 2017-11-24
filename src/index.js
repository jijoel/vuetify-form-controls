import Vue from 'vue'

[
    'DateControl',
].map((part) => {
    Vue.component(part, require('vuetify-form-controls/src/controls/'+part+'.vue'))
})


