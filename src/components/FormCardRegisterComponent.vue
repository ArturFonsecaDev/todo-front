<template>
    <form class="card border-secondary text-bg-dark flex-fill p-4">
    <h2 class="text-center text-white card-title">{{ title }}</h2>
    <div class="inputs d-flex flex-column gap-2 p-3">
      <GenericInput :label="label1" icon="bi bi-person" type="email" v-model="email"></GenericInput>
      <GenericInput :label="label2" icon="bi bi-key" type="password" v-model="password"></GenericInput>
      <GenericInput :label="label3" icon="bi bi-key" type="password" v-model="confirmPassword"></GenericInput>
      </div>
      <div class="d-flex flex-column gap-3">
      <GenericButton :buttonLabel="buttonLabel1" class="btn-primary" type="button" @click="submitForm"> </GenericButton>
      <GenericButton :buttonLabel="buttonLabel2" class="btn-outline-primary" type="button" @click="goToLoginPage"> </GenericButton>
      </div>
    </form>
</template>

<script>

import GenericButton from './GenericButtonComponent.vue';
import GenericInput from './GenericInputComponent.vue';

export default {
  props: {
    title: String,
    label1: String,
    label2: String,
    label3: String,
    buttonLabel1: String,
    buttonLabel2: String
  },
  components: {
    GenericButton,
    GenericInput
  },
  data(){
    return{
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    submitForm(){
      if(!this.validateFields()){
        return;
      }
      const url = 'http://localhost:8000';
      const payload = {
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword
      }

      fetch(`${url}/accounts/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        })
      .then(r => {
        if(!r.ok){
          alert('Registration failed');
          return;
        }
        return r.json();
      })
      .then(data => {
        console.log(data);
        alert('Registration successful');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while registering');
      });
    },
    goToLoginPage(){
      this.$router.push({
        name: 'login'
      })
    },
    validateFields(){
      const validations = [
        {condition: this.email.trim(), message: 'Please enter a valid email'},
        {condition: this.password.trim(), message: 'Please enter a valid password'},
        {condition: this.confirmPassword.trim(), message: 'You must fill the "confirm password" field'},
        {condition: this.confirmPassword === this.password, message:'Passwords do not match'},
      ]
      
      const errors = validations.filter(validation => !validation.condition);

      if(errors.length > 0){
        alert(errors.map(error => error.message).join('\n'));
        return false;
      }
      return true;
    }
  }
}
</script>
