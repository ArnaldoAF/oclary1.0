<template>
  <div id="app">
    
    
    <div class="content">
      <appBreadCrumb></appBreadCrumb>
      <div class="card-panel">
        <router-view></router-view>
      </div>
    </div>
    
    <app-navbar></app-navbar>

    
</div>  
</template>

<script>
import Navbar from './telas/Navbar.vue';
import BreadCrumb from './telas/BreadCrumb.vue'

export default {
  components: {
    appNavbar: Navbar,
    appBreadCrumb: BreadCrumb
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
