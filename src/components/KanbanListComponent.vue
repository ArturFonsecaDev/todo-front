<template>
  <button type="button" @click="handleClick">Request</button>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { listKanbans } from '../requests/KanbanRequests.js';

export default {
  computed: {
    ...mapState(['accessToken', 'refreshToken', 'kanbans']),
  },
  methods: {
    ...mapMutations(['setActiveToken', 'setKanbans']),
    async handleClick() {
      try {
        const data = await listKanbans(this.accessToken, this.refreshToken);

        if (data.newAccess) {
          this.setActiveToken(data.newAccess);
        }
        if (data.kanbans) {
          this.setKanbans(data.kanbans);
        }
      } catch (error) {
        console.error('Erro ao listar kanbans:', error.message);
        alert('Não foi possível carregar os kanbans. Tente novamente.');
      }
    },
  },
};
</script>