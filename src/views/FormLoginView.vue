<template>
  <div class="card border border-tertiary bg-light d-flex flex-row">
    <img 
      src="../assets/form-image.png" 
      alt="Imagem do formulário" 
      class="img-fluid object-fit-cover" 
      style="width: 150px;"
    >
    <FormCard 
    :title="title"
    :label1="label"
    :label2="label2"
    :buttonLabelLogin="buttonLabelLogin"
    :buttonLabelRegister="buttonLabelRegister"
    ></FormCard>
  </div>
</template>

<script>

import FormCard from '../components/FormCardLoginComponent.vue';

export default {
  props: {
    title: String,
    label: String,
    label2: String,
    buttonLabelLogin: String,
    buttonLabelRegister: String,
  },
  components: {
    FormCard,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 60px 30px;
}
</style>
