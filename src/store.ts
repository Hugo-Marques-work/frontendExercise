import { createStore } from 'vuex';

const store = createStore({
  state () {
    return {
      alertContent: '',
    }
  },
  mutations: {
    setAlertContent(state: any, alert: string) {
      state.alertContent = alert;
    }
  },
  getters: {
    getAlertContent(state: any): {status: number, content: string} {
      return state.alertContent;
    }
  },
  actions: {
    setAlertContent({ commit }, alertUpdate: {status: number, content: string}) {
      commit('setAlertContent', alertUpdate)
    },
  }
})

export default store;