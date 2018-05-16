<template>
    <div >
        <router-link class="btn-floating blue" to="/escola" ><i class="material-icons">arrow_back</i></router-link>
        <div v-if="loading" class="progress center">
            <div class="indeterminate"></div>
        </div>
        <div v-else class="container">
        <div class="card-panel">
        
        Nome da turma : {{objTurma.nome}} <br>
        disciplina da turma : {{objTurma.disciplina}} <br>

        <div class="card-panel">
           <i class="material-icons tiny">person</i> Numero de Alunos: <span class="new badge blue"  data-badge-caption=""> {{objTurma.alunosCount}} </span>
        </div>

        <div class="row card-panel">
            <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue" :to="'/escola/turma/'+objTurma.id+'/alunos'"><i class="material-icons">person</i></router-link> </div>
            <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue " :to="'/escola/turma/'+objTurma.id+'/planejamento'"><i class="material-icons">event</i></router-link></div>
            <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue disabled" :to="'/escola/turma/'+objTurma.id+'/provas'"><i class="material-icons">style</i></router-link></div>
            <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue disabled" :to="'/escola/turma/'+objTurma.id+'/presencas'"><i class="material-icons">done</i></router-link></div>
        </div>
        
        </div>
        </div>
    </div>
</template>
<script>

    import Database from "../firebase.js";
    import {mapMutations, mapGetters} from 'vuex';

export default{
    firebase:{},
    computed:{
        ...mapMutations([
            'TurmaAtual'
        ]),
        ...mapGetters([
            'TurmaAtual'
        ])
    },
    data () {
        return {
            loading: true,
            idTurma: this.$route.params.id,
            turmaRef: Database.ref("turmas"),
            AlunosRef:Database.ref("alunos/"+this.$store.getters.TurmaAtual.id),
            objTurma: null
        }
    },
    methods: {

    },
    created() {
        console.log("Turma atual is null = " + (this.$store.getters.TurmaAtual==null));
        
            this.turmaRef.orderByKey().equalTo(this.idTurma).on("child_added", snapshot => {
                this.objTurma = {...snapshot.val(), id: snapshot.key };
                this.$store.commit("TurmaAtual",this.objTurma);
            });
        
       
        this.turmaRef.on("value", snapshot => {
            this.loading = false;
            
        });
        
        
    }

}

</script>
