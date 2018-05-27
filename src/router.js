import Escola from './telas/Escola.vue';
import DashBoardGeral from './telas/DashBoardGeral.vue';
import Turma from './telas/TurmaDashBoard';
import Alunos from './telas/ListaAluno.vue';
import NotFound from './telas/NotFound.vue';
import Planejamento from './telas/ListaPlanejamento.vue';
import Prova from './telas/ListaProva.vue';
import Presenca from './telas/ListaPresenca.vue'

export const routes = [
    { path: '', component: DashBoardGeral },
    { path: '/escola', component: Escola },
    {
        path: '/escola/turma/:id',
        component: Turma
    },
    { path: '/escola/turma/:id/alunos', component: Alunos },
    { path: '/escola/turma/:id/planejamento', component: Planejamento },
    { path: '/escola/turma/:id/provas', component: Prova },
    { path: '/escola/turma/:id/presencas', component: Presenca},
    { path: '/notfound', component: NotFound },

    //{ path: 'NotFound', component: NotFound },
    { path: '*', redirect: '/notfound' }
];