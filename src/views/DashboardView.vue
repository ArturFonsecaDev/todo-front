<template>
<div>
  <h1>DASHBOARD</h1>
  <p>Bom dia <span id="user-email">{{ user.email }}</span></p>
  <GenericButton buttonLabel="Logout!" type="button" @click="handleLogout" class="btn-primary"></GenericButton>
</div>
</template>

<script>

import { mapState } from 'vuex';
import GenericButton from '../components/GenericButtonComponent.vue';

export default {
  components: {
    GenericButton
  },
  computed: {
    ...mapState(['user', 'accessToken', 'refreshToken']),
  },
  methods: {
    handleLogout(){
      this.$store.commit('logout');
      this.$router.push({
        name: 'login'
      });
    }
  }
}
</script>

<style scoped>

  div{
    color: white;
  }

  #user-email{
    color: yellowgreen;
  }

</style>

