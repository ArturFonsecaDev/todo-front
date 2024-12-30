<template>
  <form
    class="card border-secondary text-bg-dark flex-fill p-4 needs-validation"
    style="height: 100%"
    @submit.prevent="submitForm"
    novalidate
  >
    <h2 class="card-title text-center text-white">{{ title }}</h2>
    <div class="inputs d-flex flex-column gap-3">
      <GenericInput
        :label="label1"
        icon="bi bi-person-circle"
        type="email"
        v-model="email"
      />
      <GenericInput
        :label="label2"
        icon="bi bi-key"
        type="password"
        v-model="password"
      />
      <GenericButton
        :buttonLabel="buttonLabelLogin"
        type="submit"
        class="btn-outline-success"
      />
      <GenericButton
        :buttonLabel="buttonLabelRegister"
        class="btn-primary"
        type="button"
        @click="goToRegisterPage"
      />
    </div>
  </form>
</template>

<script>
import GenericInput from './GenericInputComponent.vue';
import GenericButton from './GenericButtonComponent.vue';
import { loginRequest } from '../requests/auth.js';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  components: {
    GenericInput,
    GenericButton,
  },
  props: {
    label1: String,
    label2: String,
    title: String,
    buttonLabelLogin: String,
    buttonLabelRegister: String,
  },
  methods: {
    submitForm() {
      if (!this.email.trim() || !this.password.trim()) {
        alert('Preencha todos os campos!');
        return;
      }
      loginRequest(this.email, this.password)
        .then(({ token, refreshToken, user }) => {
          this.$store.commit('setUser', user);
          this.$store.commit('setActiveToken', token);
          this.$store.commit('setRefreshToken', refreshToken);
          this.goToMainAppPage(); 
        })
        .catch((error) => {
          console.error('Erro no login:', error.message);
          alert('Erro ao realizar login: ' + error.message);
        });
    },
    goToRegisterPage(){
      this.$router.push({
        name: 'register'
      });
    },
    goToMainAppPage(){
      this.$router.push({
        name: 'app'
      });
    }
  },
};
</script>
