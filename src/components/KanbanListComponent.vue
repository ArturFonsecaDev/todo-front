<template>
  <ul v-if="howMuchKanbans">
    <li v-for="kanban in kanbans" :key="kanban.id"></li>
  </ul>
  <div v-else>
    <p>Nenhum Kanban encontrado.</p>
    <GenericButton buttonLabel="Criar Kanban" type="button" class="btn-success custom"></GenericButton>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { listKanbans } from '../requests/KanbanRequests.js';
import GenericButton from './GenericButtonComponent.vue';

export default {
  components: {
    GenericButton,
  },
  computed: {
    ...mapState(['accessToken', 'refreshToken', 'kanbans', 'user']),
    howMuchKanbans(){
      return this.kanbans.length;
    }
  },
  methods: {
    ...mapMutations(['setAccessToken', 'setKanbans']),
    async fetchKanbans() {
      try {
        const data = await listKanbans();

        if(data.newAccess){
          this.setAccessToken(data.newAccess);
        }
        if(data.kanbans){
          this.setKanbans(data.kanbans);
        }
      } catch(error){
        console.error('Erro ao listar kanbans:', error.message);
        alert('Não foi possível carregar os kanbans. Tente novamente.');
      }
    },
  },
  created(){
    this.fetchKanbans()
  },
};
</script>