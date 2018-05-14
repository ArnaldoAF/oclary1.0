import Escola from './telas/Escola.vue';
import DashBoardGeral from './telas/DashBoardGeral.vue';
import Turma from './telas/TurmaDashBoard';
import Alunos from './telas/ListaAluno.vue';
import NotFound from './telas/NotFound.vue';

export const routes = [
    { path: '', component: DashBoardGeral },
    { path: '/escola', component: Escola },
    {
        path: '/escola/turma/:id',
        component: Turma
    },
    { path: '/escola/turma/:id/alunos', component: Alunos },
    { path: '*', component: NotFound }
];