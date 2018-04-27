import Escola from './telas/Escola.vue';
import DashBoardGeral from './telas/DashBoardGeral.vue';

export const routes = [
    { path: '', component: DashBoardGeral},
    { path: '/escola', component: Escola }
];