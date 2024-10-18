import app from './modules/app'
import lambda from './modules/lambda'
import tatatonga from './modules/tatatonga'
import plan from '~~/plan/store/plan'
import { createStore } from 'vuex';

const store = createStore({
  mutations: {},
  actions: {},
  modules: {
    app,
    lambda,
    tatatonga,
    plan
  },
});

export default store
