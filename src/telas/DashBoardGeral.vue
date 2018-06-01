<template>
  <div class="container">
    <div class="card-panel center-align ">
      <h1>Bem vindo ao <span class="blue-text">OClaRy</span></h1>
      <h2>
        <span class="blue-text">O</span>nline  <span class="blue-text">CLA</span>ss dia<span class="blue-text">RY</span>
      </h2>
      <router-link to="/escola"  class="btn-large blue "> <span class="valign-wrapper">Começar <i class="material-icons">forward</i></span>  </router-link>

    </div>
  </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    export default {
      computed:{
        ...mapMutations([
            'TurmaAtual',
            'Setor'
        ])
      },
      beforeCreate() {
        this.$store.commit("Setor",null);
     },
      created() {
        this.$store.commit("TurmaAtual",null);
      }
    }
</script>
