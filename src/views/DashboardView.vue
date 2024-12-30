<template>
<div class="wrapper">
  <div class="side-bar">
    <SideBarComponent></SideBarComponent>
  </div>
  <div class="main-content">
    <h1>DASHBOARD</h1>
    <p>Bom dia <span id="user-email">{{ user.email }}</span></p>
    <KanbanList></KanbanList>
  </div>
</div>
</template>

<script>

import { mapState } from 'vuex';
import GenericButton from '../components/GenericButtonComponent.vue';
import KanbanList from '../components/KanbanListComponent.vue';
import SideBarComponent from '../components/SideBarComponent.vue';


export default {
  components: {
    GenericButton,
    SideBarComponent,
    KanbanList
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

  .main-content{
    display: flex;
    flex-direction: column;
    color: #fff;
    height: 100vh;
    width: 100vw;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  #user-email{
    color: yellowgreen;
  }

</style>

