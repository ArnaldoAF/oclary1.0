<template>
    <div>
        <h1>Escolas</h1>
        <ul class="collection">
            <li v-for="escola in escolas" class="collection-item">{{escola.nome}}</li>
        </ul>
        

        <!-- Modal Trigger -->
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large red modal-trigger" href="#modal1">
            <i class="large material-icons">add</i>
             </a>
        </div>

        <!-- Modal Structure -->
        <div id="modal1" class="modal">
        <div class="modal-content">
            <div class="input-field ">
          <input id="last_name" type="text" v-model="nomeEscola" autofocus class="validate">
          <label for="last_name">Nome da Escola</label>
        </div>
        </div>
        <div class="modal-footer">
            <button class="btn modal-action modal-close red" @click="nomeEscola=''">CANCELAR</button>
            <button class="btn modal-action modal-close green" @click="test()">INCLUIR</button>
        </div>
        </div>

        
</div>
</template>
<script>
    

    import Database from '../firebase.js';


    export default {
        firebase: {
            escolas: Database.ref('escolas')
        },
        mounted: function () {
            // Jquery para o modal
            $(document).ready(function(){
                $(".modal").modal();
                //$(".modal").modal('open');
                //$("#last_name").focus();
                $(document).on('shown.bs.modal', function (e) {
                $('[autofocus]', e.target).focus();
                });
            });
        },
        data() {
            return {
                nomeEscola:''
            };
        }
    };
</script>