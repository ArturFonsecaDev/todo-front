<template>
    <form class="card border-secondary text-bg-dark flex-fill p-4">
    <h2 class="text-center text-white">{{ title }}</h2>
    <div class="inputs m-2">
      <GenericInput :label="label1" icon="bi bi-person" type="email"></GenericInput>
      <GenericInput :label="label2" icon="bi bi-key" type="password" @update:label2=""></GenericInput>
      <GenericInput :label="label3" icon="bi bi-key" type="password" @update:label3="" ></GenericInput>
      </div>
      <div class="btns d-flex flex-column gap-2">
      <GenericButton :buttonLabel="buttonLabel1" class="btn-primary"> </GenericButton>
      <GenericButton :buttonLabel="buttonLabel2" class="btn-outline-primary"> </GenericButton>
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
  computed: {
    doesPasswordsMatch(){
      return this.label2 === this.label3;
    }
  },
  methods: {
    
  }
}
</script>
