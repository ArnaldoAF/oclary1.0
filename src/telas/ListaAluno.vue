<template>
    <div>
        
        ALUNOS 
        
        <table class="highlight">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Aluno</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                </tr>
            </tbody>
        </table>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large red modal-trigger" href="#modal1"> <i class="large material-icons">add</i></a>
        </div>
        

    </div>
</template>
<script>
import Database from "../firebase.js";
import {mapMutations, mapGetters} from 'vuex';

export default {
    firebase: {
        //escolas: Database.ref('escolas')
    },
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
            loading:false,

            AlunosRef:Database.ref("alunos/"+this.$store.getters.TurmaAtual.id),
            AlunosArray:[]

        }
    },
    methods: {
    },
    created() {
        this.AlunosRef.on('child_added', snapshot => {
            this.AlunosArray.push({...snapshot.val(), id: snapshot.key});
        })

    }
}
</script>
