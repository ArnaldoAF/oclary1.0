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
            Numero de Alunos: <span class="new badge blue"  data-badge-caption=""> 0 </span>
        </div>
        
        </div>
        </div>
    </div>
</template>
<script>

    import Database from "../firebase.js";
    import {mapMutations} from 'vuex';

export default{
    firebase:{},
    computed:{
        ...mapMutations([
            'TurmaAtual'
        ])
    },
    data () {
        return {
            loading: true,
            idTurma: this.$route.params.id,
            turmaRef: Database.ref("turmas"),
            objTurma: null
        }
    },
    methods: {

    },
    created() {

        
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
