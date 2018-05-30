<template>
  <div>
    <h1>DashBoard</h1>
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
