import {PROJECT_PERMISSION} from "~~/plan/store/mutation-types";
import {state} from "~/store/state";

export const plan ={
  state: {
    projectPermission:3,
  },
  mutations: {
    [PROJECT_PERMISSION]: (state, с) => {
      state.projectPermission = с
    },
  },
  getters:{
    projectPermission(state) {
      return state.projectPermission
    }
  }
}
export default plan
