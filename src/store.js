import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {},
    accessToken: JSON.parse(localStorage.getItem('accessToken')) || '',
    refreshToken: JSON.parse(localStorage.getItem('refreshToken')) || ''
  },
  mutations: {
    setUser(state, user){
      state.user = { ...user }; 
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setActiveToken(state, token){
      state.accessToken = token;
      localStorage.setItem('Authorization', `Bearer ${JSON.stringify(state.accessToken)}`);
    },
    setRefreshToken(state, token){
      state.refreshToken = token;
      localStorage.setItem('refreshToken', JSON.stringify(state.refreshToken));
    },
    logout(state) {
      state.user = {}; 
      state.accessToken = ''; 
      state.refreshToken = '';
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
})