<template>
  <ul v-if="howMuchKanbans">
    <li v-for="kanban in kanbans" :key="kanban.id"></li>
  </ul>
  <div v-else>
    <p>Nenhum Kanban encontrado.</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { listKanbans } from '../requests/KanbanRequests.js';

export default {
  computed: {
    ...mapState(['accessToken', 'refreshToken', 'kanbans']),
    howMuchKanbans(){
      return this.kanbans.length;
    }
  },
  methods: {
    ...mapMutations(['setActiveToken', 'setKanbans']),
    async fetchKanbans() {
      try {
        const data = await listKanbans(this.accessToken, this.refreshToken);

        if(data.newAccess){
          this.setActiveToken(data.newAccess);
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