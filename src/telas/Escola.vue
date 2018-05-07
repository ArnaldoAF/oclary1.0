<template>
    <div>
        <h1>Escolas</h1>
        <ul class="collapsible">
            <li v-for="escola in escolasArray" class="collection-item">
                <div class="collapsible-header">
                    {{escola.nome}}
                    <span class="badge">
                        <a class="btn-floating  btn-small modal-trigger" href="#modal1" @click="EditarEscola(escola)" ><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small" @click="ExcluirEscola(escola)"><i class="material-icons">delete</i></a>
                    </span>
                </div>
                <div class="collapsible-body">
                    <a class="btn-floating  btn-small" @click="ExcluirEscola(escola)"><i class="material-icons">delete</i></a>
                    
                    {{escola.id}}
                </div>
            </li>
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
            <button class="btn modal-action modal-close red" @click="nomeEscola=''; EditingEscola=null">CANCELAR</button>
            <button class="btn modal-action modal-close green" v-if="EditingEscola===null" @click="InserirEscola()">INCLUIR</button>
            <button class="btn modal-action modal-close green" v-else @click="UpdateEscola()">EDITAR</button>
            
        </div>
        </div>

        
</div>
</template>
<script>
    

    import Database from '../firebase.js';


    export default {
        firebase: {
            //escolas: Database.ref('escolas')
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
                $('.collapsible').collapsible();
            });
        },
        data() {
            return {
                escolasArray:[],
                nomeEscola:'',
                escolas: Database.ref('escolas'),
                EditingEscola:null
            };
        },
        methods: {
            InserirEscola () {
                Database.ref('escolas').push({nome: this.nomeEscola});
                this.nomeEscola='';
            },
            ExcluirEscola (escola) {
                Database.ref('escolas').child(escola.id).remove();

            },
            EditarEscola (escola) {
                this.EditingEscola = escola;
                this.nomeEscola = escola.nome;
            },
            UpdateEscola () {
                Database.ref('escolas').child(this.EditingEscola.id).update({nome: this.nomeEscola});
                this.nomeEscola=''; 
                this.EditingEscola=null;
            }
        },
        created () {
            Database.ref('escolas').on('child_added', snapshot => this.escolasArray.push({...snapshot.val(), id: snapshot.key}))
            Database.ref('escolas').on('child_removed', snapshot => {
                const EscolaRemovida = this.escolasArray.find(escola => escola.id === snapshot.key)
                const index = this.escolasArray.indexOf(EscolaRemovida)
                this.escolasArray.splice(index, 1);
            })
            Database.ref('escolas').on('child_changed', snapshot => {
                const EscolaEditada = this.escolasArray.find(escola => escola.id === snapshot.key)
                EscolaEditada.nome = snapshot.val().nome
                //const index = this.escolasArray.indexOf(EscolaEditada)
                //this.escolasArray.splice(index, 1,"snapshot.val().nome");
            })
            //Database.ref('escolas').on('value', snapshot => console.log(snapshot.val()));
            
        }
    };
</script>