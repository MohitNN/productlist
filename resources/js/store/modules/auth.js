import axios from "../../plugins/customAxios";

const state = {
    authenticated: false,
    user: '',
    idToken: '',
    getAllProduct: '',
    getAllSearchProduct: ''

};

const actions = {
    async login({ commit }, data) {
        // console.log(data);
        const resp = await axios.post('/api/login', data)
            // console.log('resp.data.data.status', resp.data.status)
        console.log(resp.data.user);
        if (resp.data.status) {
            console.log("token", resp.data.token);
            commit('SET_USER', JSON.stringify(resp.data.user))
            commit('SET_ID_TOKEN', resp.data.token)
            commit('SET_AUTHENTICATED', true)
        } else {
            commit('SET_ID_TOKEN', '')
            commit('SET_AUTHENTICATED', false)
        }
        return resp;
    },
    async register({ commit }, data) {
        const resp = await axios.post('/api/register', data);
        if (resp.data.status) {
            commit('SET_AUTHENTICATED', '')
            return true;
        } else {
            return false;
        }
    },
    async logout({ commit }, data) {
        const resp = await axios.post('/api/logout')
        commit('SET_USER', '')
        commit('SET_ID_TOKEN', '')
        commit('SET_AUTHENTICATED', false)
        return resp;
    },
    async product({ commit }, data) {
        let resp = await axios.get('/api/product?search=' + data)
        if (resp.data.status == true) {
            commit('SET_PRODUCT_DATA', resp.data.data)
        }
        return resp;
    },
    async searchProduct({ commit }, data) {
        let resp = await axios.post('/api/product-search', data)
        if (resp.data.status == true) {
            commit('SET_PRODUCT_SEARCH_DATA', resp.data.data)
        }
        return resp;
    },
};

const mutations = {
    SET_AUTHENTICATED(state, value) {
        state.authenticated = value
    },
    SET_USER(state, value) {
        state.user = value
    },
    SET_ID_TOKEN(state, value) {
        state.idToken = value
    },
    SET_PRODUCT_DATA(state, value) {
        state.getAllProduct = value
    },
    SET_PRODUCT_SEARCH_DATA(state, value) {
        state.getAllSearchProduct = value
    }
}

const getters = {
    authenticated(state) {
        return state.authenticated
    },
    user(state) {
        return state.user
    },
    getIdToken(state) {
        return state.idToken
    },
    getProduct(state) {
        return state.getAllProduct
    },
    getSearchProduct(state) {
        return state.getAllSearchProduct
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
