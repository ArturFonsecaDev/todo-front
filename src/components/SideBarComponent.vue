<template>
  <aside :class="['side-bar d-flex flex-column align-items-center', { collapsed: sideBarColapsed }]">
    <ul class="list-group w-100 d-flex flex-column justify-content-between">
      <div>
      <!-- Botões principais -->
      <li class="list-group-item text-center p-3">
        <button class="btn btn-primary btn-sm w-100" @click="changeSideBarState">
          <i class="bi bi-list"></i>
        </button>
      </li>
      <li class="list-group-item text-center p-3">
        <button class="btn btn-light btn-sm w-100">
          <i class="bi bi-house-door"></i>
        </button>
      </li>
      <li class="list-group-item text-center p-3">
        <button class="btn btn-light btn-sm w-100">
          <i class="bi bi-gear"></i>
        </button>
      </li>
      </div>

      <!-- Botão de logout no final -->
      <li id="logout" class="list-group-item text-center p-3">
        <button class="btn btn-light btn-sm w-100" @click="handleLogout">
          <i class="bi bi-box-arrow-left"></i> <!-- Ícone do logout sem texto -->
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["sideBarColapsed"])
  },
  methods: {
    ...mapMutations(["changeSideBarState"]),

    handleLogout(){
      this.$store.commit('logout');
      this.$router.push({
        name: 'login'
      });
    },

  }
};
</script>

<style scoped>
/* Sidebar */
.side-bar {
  width: 160px;
  background-color: #ecf0f1;
  color: #2c3e50;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s ease-in-out;
  z-index: 1000;
}

/* Sidebar colapsado */
.side-bar.collapsed {
  width: 60px;
}


.list-group-item {
  background: transparent;
  border: none;
}


.list-group-item:hover {
  background: #bdc3c7;
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
}

.btn-primary:hover {
  background-color: #5dade2;
  border-color: #5dade2;
}

.btn-light {
  background-color: #f5f5f5;
  border-color: #ddd;
  color: #2c3e50;
}

.btn-light:hover {
  background-color: #dfe6e9;
  border-color: #b0bec5;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
}

button i {
  font-size: 1.5rem;
}

button .collapsed i {
  font-size: 1.2rem;
}

.list-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

#logout{
  margin-bottom: 5px;
}

</style>
