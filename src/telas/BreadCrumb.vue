<template>
  
  <nav>
    <div class="nav-wrapper row blue">
      <div class="col s12">
        <router-link to="/escola" class="breadcrumb black-text">Escolas</router-link>
        <router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+''" class="breadcrumb black-text"> {{TurmaAtual.nome}} {{TurmaAtual.disciplina}}</router-link>
      </div>
    </div>
  </nav>
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
