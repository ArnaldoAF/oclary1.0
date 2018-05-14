import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        test: 'test',
        caminhoAtual: ' ',
        turmaAtual: null
    },
    getters: {
        CaminhoAtual: state => { return state.caminhoAtual; },
        TurmaAtual: state => { return state.turmaAtual; }

    },
    mutations: {
        TurmaAtual: (state, payload) => {
            state.turmaAtual = payload;
        }
    },
    modules: {

    },
});