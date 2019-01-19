<template>
<v-tooltip top>
  <v-btn icon slot="activator" @click="click">
    <v-icon :color="_color">
      {{ _icon }}
    </v-icon>
  </v-btn>
  <span>
    Login with {{ name }}
  </span>
</v-tooltip>
</template>

<script>
import axios from 'axios'

export default {

  name: 'SocialLogin',

  props: {
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: false,
      default: '/api/oauth/'
    }
  },

  computed: {
    _color() {
      return this.color
      || {
        facebook:   '#3B5998',
        instagram:  '#262626',
        twitter:    '#1DA1F2',
        pinterest:  '#C92228',
        snapchat:   '#FFFC00',
        google:     '#DB4437',
        github:     '#666'
      }[this.name]
      || '#666'
    },
    _icon() {
      return this.icon
      || {
        facebook:   'fab fa-facebook-square',
        instagram:  'fab fa-instagram',
        twitter:    'fab fa-twitter',
        pinterest:  'fab fa-pinterest',
        snapchat:   'fab fa-snapchat',
        google:     'fab fa-google-plus',
        github:     'fab fa-github'
      }[this.name]
      || 'fas fa-user-circle'
    },
    _path() {
      return this.path + this.name
    },
  },

  methods: {
    async click() {
      const { data } = await axios.get(this._path)
      window.location = data.url
    }
  },

}
</script>
