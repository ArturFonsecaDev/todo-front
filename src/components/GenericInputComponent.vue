<template>
  <div class="form-floating">
    <input
      v-model="localFormInput"
      :class="['form-control', 'text-bg-dark', 'text-light', 'rounded', 'fw-semibold', validationClass]"
      id="floatingInput"
      :type="type"
      :name="label"
      placeholder="a"
      required
    />
    <div class="valid-feedback" v-if="localFormInput.trim() !== ''">
      <span>Parece bom!</span>
    </div>
    <div class="invalid-feedback" v-if="localFormInput.trim() === ''">
      <span>Este campo é obrigatório.</span>
    </div>
    <label for="floatingInput">
      <i :class="icon"></i> {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    icon: String,   
    type: String,
  },
  data() {
    return {
      localFormInput: '',
    };
  },
  computed: {
    validationClass() {
      return this.localFormInput.trim() !== '' ? 'is-valid' : 'is-invalid';
    },
  }
};
</script>
