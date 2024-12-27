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

      const url = 'http://localhost:8000/accounts/token/';
      const payload = { email: this.email, password: this.password };

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Login falhou');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Login bem-sucedido:', data);
        })
        .catch((error) => {
          console.error('Erro:', error);
          alert('Erro ao realizar login. Verifique seus dados.');
        });
    },
    goToRegisterPage(){
      this.$router.push({
        name: 'register'
      });
    }
  },
};
</script>
