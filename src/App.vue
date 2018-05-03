<template>
  <div id="app">
    
    <div class="content">
      <router-view ></router-view>
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
