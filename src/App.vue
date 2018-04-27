<template>
  <div id="app">
    
    <div class="content">
      <h1>OClary</h1>
      <router-view ></router-view>
      <button class="btn">TESTE</button>
    </div>
    <app-navbar></app-navbar>
    
</div>  
</template>

<script>
import Navbar from './telas/Navbar.vue';
export default {
  components: {
    appNavbar: Navbar
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.content {
      padding-left: 300px;
    }

    @media only screen and (max-width : 992px) {
      .content {
        padding-left: 0;
      }
    }
</style>
