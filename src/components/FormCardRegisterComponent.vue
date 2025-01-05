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
import { registerRequest, loginRequest } from '../requests/auth.js';

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
    async submitForm(){
      if(!this.validateFields()){
        return;
      }
      try{
      const registerData = await registerRequest(this.email, this.password, this.confirmPassword);
      if(!registerData.user.email){
        throw new Error('Registration Failed!');
      }
      const user = registerData.user; 
      this.$store.commit('setUser', user);
      console.log(user);
      }
      catch(err){
        console.error(`Error message: ${err}`);
        alert('An error occurred during registration. Please try again.');
        return;
      }

      alert('Registration successful!');

    // auto login
    try{
      const loginResponse = await loginRequest(this.email, this.password);
      if(!loginResponse.user.email){
        throw new Error('Login failed!');
      }
      // setting env variables
      const accessToken = loginResponse.token;
      this.$store.commit('setAccessToken', accessToken);
      const refreshToken = loginResponse.refreshToken;
      this.$store.commit('setRefreshToken', refreshToken);
      const user = loginResponse.user;
      this.$store.commit('setUser', user);
      this.goToMainAppPage();
      return;
    }catch(err){
      console.error(`Error message: ${err}`);
      alert('An error occurred during login. Please try again.');
      return;
    }

    },
    goToLoginPage(){
      this.$router.push({
        name: 'login'
      })
    },
    goToMainAppPage(){
      this.$router.push({
        name: 'app'
      });
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
