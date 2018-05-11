import Escola from './telas/Escola.vue';
import DashBoardGeral from './telas/DashBoardGeral.vue';
import Turma from './telas/TurmaDashBoard';

export const routes = [
    { path: '', component: DashBoardGeral },
    { path: '/escola', component: Escola },
    { path: '/escola/turma/:id', component: Turma }
];