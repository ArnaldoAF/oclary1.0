<template>
<div>
    <ul id="slide-out" class="sidenav sidenav-fixed">
        <li><router-link to="/"><i class="material-icons">home</i>Home</router-link> </li>
        <li><router-link to="/escola"><i class="material-icons">school</i>Escola</router-link></li>
        <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+''"> <i class="material-icons">group</i>{{TurmaAtual.nome}} {{TurmaAtual.disciplina}} </router-link></li>
        <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/alunos'"> <i class="material-icons">person</i>Alunos</router-link></li>
        <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/alunos'"> <i class="material-icons">event</i>Planejamento</router-link></li>
        <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/alunos'"> <i class="material-icons">style</i>Provas</router-link></li>
        <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/alunos'"> <i class="material-icons">done</i>Presença</router-link></li>
    </ul>
    <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          

     
</div>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                "TurmaAtual"
            ])
        }
    }
    
</script>
<style>

</style>
