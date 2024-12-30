<template>
<div class="wrapper">
  <div class="side-bar">
    <SideBarComponent></SideBarComponent>
  </div>
  <h1>DASHBOARD</h1>
  <p>Bom dia <span id="user-email">{{ user.email }}</span></p>
</div>
</template>

<script>

import { mapState } from 'vuex';
import GenericButton from '../components/GenericButtonComponent.vue';
import SideBarComponent from '../components/SideBarComponent.vue';


export default {
  components: {
    GenericButton,
    SideBarComponent,
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


  h1, p{
    color: #fff;
  }

  #user-email{
    color: yellowgreen;
  }

</style>

