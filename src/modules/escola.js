import { REFUSED } from "dns";

export const state = {
    id:0,
    nome:'etec',
    turmas:[]
};

export const getters = {
    getEscola: state => {
        return {
            id: state.id,
            nome: state.nome,
            turmas: state.turmas
        };
    },
    getId: state =>{
        return state.id;
    }
};

export const mutations = {
    setEscola:(state, payload) => {
        state.id=payload.id;
        state.nome=payload.nome;
        state.turmas=payload.turmas;
    },
    setId: (state, payload) => {
        state.id = payload;
    },
    setNome: (state, payload) => {
        state.nome = payload;
    },
    setTurmas: (state, payload) => {
        state.turmas = payload;
    }
};

export const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions
};