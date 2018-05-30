import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        test: 'test',
        caminhoAtual: '',
        turmaAtual: null,
        setor:' '
    },
    getters: {
        CaminhoAtual: state => { return state.caminhoAtual; },
        TurmaAtual: state => { return state.turmaAtual; },
        Setor: state => { return state.setor}

    },
    mutations: {
        TurmaAtual: (state, payload) => {
            state.turmaAtual = payload;
        },
        Setor: (state, payload) => {
            state.setor = payload;
        }
    },
    modules: {

    },
});