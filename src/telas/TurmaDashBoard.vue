<template>
    <div class="container" >
        <h1>TURMA</h1>
        <router-link class="btn-floating blue" to="/escola" ><i class="material-icons">arrow_back</i></router-link>
        <div class="card-panel">
        
        Nome da turma : {{objTurma.nome}} <br>
        disciplina da turma : {{objTurma.disciplina}} <br>

        <div class="card-panel">
            Numero de Alunos: <span class="new badge blue"  data-badge-caption=""> 0 </span>
        </div>
        
        </div>
    </div>
</template>
<script>

    import Database from "../firebase.js";

export default{
    firebase:{},
    data () {
        return {
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
        });
        
    }

}

</script>
