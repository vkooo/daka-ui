import { website } from "@/api/common";

const getDefaultState = () => {
  return {
    data: {},
  }
}
const state = getDefaultState()

const mutations = {
  DATA: (state, data) => {
    state.data = data
  },
}

const actions = {
  init({ commit }) {
    return new Promise((resolve, reject) => {
      website().then(res=>{
        if(res.code == 200 && res.data){
          commit("DATA", res.data)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}