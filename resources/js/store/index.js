import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
let stores = "";
stores = {
    auth,
}
const dataState = createPersistedState({
    paths: ['auth', 'general.theme_dark']
})
export default new Vuex.Store({
    plugins: [dataState],
    modules: stores
})