<template>
  <div class="navbar-fixed">
  <nav >
    <div class="nav-wrapper row blue">
      
    
      <div class="col s12">
        <a href="#!" data-target="slide-out" class="sidenav-trigger btn blue"><i class="material-icons">menu</i></a>
        <router-link v-if="Setor != null" to="/escola" class="breadcrumb black-text">Escolas</router-link>
        <router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+''" class="breadcrumb black-text"> {{TurmaAtual.nome}} {{TurmaAtual.disciplina}}</router-link>
        
        <router-link v-if="Setor == 'aluno'" :to="'/escola/turma/'+TurmaAtual.id+'/alunos'" class="breadcrumb black-text"> Alunos </router-link>
        <router-link v-if="Setor == 'planejamento'"  :to="'/escola/turma/'+TurmaAtual.id+'/planejamento'" class="breadcrumb black-text"> Planejamento </router-link>
        <router-link v-if="Setor == 'prova'" :to="'/escola/turma/'+TurmaAtual.id+'/provas'" class="breadcrumb black-text"> Provas </router-link>
        <router-link v-if="Setor == 'presenca'" :to="'/escola/turma/'+TurmaAtual.id+'/presencas'" class="breadcrumb black-text"> Presença</router-link>
        
      </div>
    </div>
  </nav>
  </div>
  
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                "TurmaAtual",
                "Setor"
            ])
        }
    }
</script>
