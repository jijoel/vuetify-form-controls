Vuetify Helper Controls
=========================
This package contains several components that work with forms in the [vuetify](https://vuetifyjs.com/) library.

**Controls** can be dropped in to any page that uses vuetify:

Component      | Description
---------------|---------------
EmailInput     | For e-mail addresses; it includes a default label, icon, and browser autocomplete settings
PasswordInput  | For password entry; it has a button that shows or hides the password when clicked
NewPasswordInput | For entering a new password; it connects to the [zxcvbn](https://github.com/dropbox/zxcvbn) and [hibp](https://github.com/wKovacs64/hibp) libraries to determine the password's strength, and whether it has been compromised.

**Form Controls** require a form object (eg, from [vform](https://github.com/cretueusebiu/vform)), to be passed in. They include:

Component      | Description
---------------|--------------
SubmitButton   | A button to submit the form; it shows up as loading and disabled when the form is busy


Installation
-------------
Enter this in dependencies in your package.json file:

    "vuetify-form-controls": "jijoel/vuetify-form-controls#master",

or:

    yarn add https://github.com/jijoel/vuetify-form-controls#master


Usage
---------
Require each component that you want in your main .js file:

    Vue.component('date-control', require('vuetify-form-controls/src/Date.vue'));

Load the component on your page:

    <date-control></date-control>

