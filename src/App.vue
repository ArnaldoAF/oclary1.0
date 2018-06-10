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
  },
  updated: function() {
        console.log("ESCOLA - updated");
  },
  mounted: function() {
        // Jquery para o modal
        console.log("APP - mounted");
        $(document).ready(function() {
            
            $(".collapsible").collapsible();
            $(".modal").modal();
            //$(".modal").modal('open');
            //$("#last_name").focus();
            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
            $(".collapsible").collapsible();
            
            console.log($(".collapsible").collapsible());
            
            //Materialize.updateTextFieldscollapsible
        });
    }
}
</script>

<style lang="scss">

tbody {
    display:block;
    max-height:320px;
    overflow:auto;
}
thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}
thead {
    width: calc( 100% - 1em )
}
table {
    width:100%;
}

.content {
      padding-left: 300px;
    }

    @media only screen and (max-width : 992px) {
      .content {
        padding-left: 0;
      }
    }
</style>
