import Vue from 'vue';
import Router from 'vue-router';

import FormLogin from './views/FormLoginView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: FormLogin,
      props: {
        title: 'Login',
        label: 'Email',
        label2: 'Senha',
        buttonLabelLogin: 'Entrar',
        buttonLabelRegister: 'Registrar',
      }
    },
  ]
}); 