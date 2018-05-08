<template>
    <div class="container">
        <h1>Escolas</h1>
        <ul class="collapsible">
            <li v-for="escola in escolasArray" class="collection-item">
                <div class="collapsible-header">
                    {{escola.nome}}
                    <span class="badge">
                        <a class="btn-floating  btn-small modal-trigger" href="#modal2" @click="idEscolaTurma=escola.id" ><i class="material-icons">group_add</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#modal1" @click="EditarEscola(escola)" ><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small" @click="ExcluirEscola(escola)"><i class="material-icons">delete</i></a>
                    </span>
                </div>
                <div class="collapsible-body">
                    <table class="highlight">
                        <tbody>
                            <tr v-for="turma in turmasArray" v-if="turma.idEscola===escola.id">
                                <td> {{turma.nome}} </td>
                                <td> {{turma.disciplina}} </td>
                                <td> {{turma.idEscola}} </td>
                                <td> 
                                    <a class="btn-floating  btn-small" ><i class="material-icons">delete</i></a> 
                                    <a class="btn-floating  btn-small" ><i class="material-icons">forward</i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                <input id="last_name" type="text" v-model="nomeEscola" autofocus required class="validate">
                <label for="last_name">Nome da Escola</label>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn modal-action modal-close red" @click="nomeEscola=''; EditingEscola=null">CANCELAR</button>
            <button class="btn modal-action modal-close green" v-if="EditingEscola===null" @click="InserirEscola()">INCLUIR</button>
            <button class="btn modal-action modal-close green" v-else @click="UpdateEscola()">EDITAR</button>
        </div>
        </div>

        <div id="modal2" class="modal">
        <div class="modal-content">
            <div class="input-field ">
                <input id="last_name" type="text" v-model="nomeTurma" autofocus class="validate">
                <label for="last_name">Nome da Turma</label>
            </div>
            <div class="input-field ">
                <input id="last_name" type="text" v-model="disciplinaTurma" autofocus class="validate">
                <label for="last_name">Disciplina da Turma</label>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn modal-action modal-close red" @click="nomeTurma=''; disciplinaTurma=''">CANCELAR</button>
            <button class="btn modal-action modal-close green"  @click="InserirTurma()">INCLUIR</button>
            
            
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
                // ESCOLA
                escolasArray:[],                    // é rodada em um for para exibir as escolas no DOM
                nomeEscola:'',                      // um valor temporario para edição e exclusão
                EditingEscola:null,                 // objeto temporario para edição

                //escolasRef: Database.ref('escolas').orderByChild('nome').equalTo('Etec'),   // referencia
                escolasRef: Database.ref('escolas'),
                
                //TURMA
                turmasArray:[],
                nomeTurma:'',
                disciplinaTurma:'',
                idEscolaTurma:'',
                editingTurma:null,

                turmaRef: Database.ref('turmas')

            };
        },
        methods: {
            // ESCOLA
            InserirEscola () {
                //Database.ref('escolas').push({nome: this.nomeEscola});
                
                this.escolasRef.push({nome: this.nomeEscola});
                this.nomeEscola='';
                this.EditingEscola=null;
            },
            ExcluirEscola (escola) {
                this.escolasRef.child(escola.id).remove();
                console.log("excluir Escola");
            },
            EditarEscola (escola) {
                this.EditingEscola = escola;
                this.nomeEscola = escola.nome;
            },
            UpdateEscola () {
                console.log("update Escola");
                this.escolasRef.child(this.EditingEscola.id).update({nome: this.nomeEscola});
                this.nomeEscola=''; 
                this.EditingEscola=null;
            },

            // TURMA
            InserirTurma () {
                this.turmaRef.push({
                    idEscola: this.idEscolaTurma,
                    nome: this.nomeTurma,
                    disciplina: this.disciplinaTurma
                });
                nomeTurma=''; 
                disciplinaTurma='';
            },
            ExcluirTurma (turma) {
            },
            EditarTurma (turma) {
            },
            UpdateTurma () {
            }
        },
        created () {
            // ESCOLAS
            //Database.ref('escolas').orderByChild('nome').equalTo('Etec').
            this.escolasRef.on('child_added', snapshot => {
                this.escolasArray.push({...snapshot.val(), id: snapshot.key});
                this.escolasArray.sort(function(a,b) {
                    if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1
                    if (a.nome.toUpperCase() < b.nome.toUpperCase()) return -1
                    return 0
                })
            })
           this.escolasRef.on('child_removed', snapshot => {
                const EscolaRemovida = this.escolasArray.find(escola => escola.id === snapshot.key)
                const index = this.escolasArray.indexOf(EscolaRemovida)
                this.escolasArray.splice(index, 1)
                this.escolasArray.sort(function(a,b) {
                    if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1
                    if (a.nome.toUpperCase() < b.nome.toUpperCase()) return -1
                    return 0
                })
            })
            this.escolasRef.on('child_changed', snapshot => {
                const EscolaEditada = this.escolasArray.find(escola => escola.id === snapshot.key)
                EscolaEditada.nome = snapshot.val().nome
                //const index = this.escolasArray.indexOf(EscolaEditada)
                //this.escolasArray.splice(index, 1,"snapshot.val().nome");
                this.escolasArray.sort(function(a,b) {
                    if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1
                    if (a.nome.toUpperCase() < b.nome.toUpperCase()) return -1
                    return 0
                })
            })
            //Database.ref('escolas').on('value', snapshot => console.log(snapshot.val()));

            // TURMAS
            
            this.turmaRef.on('child_added', snapshot => {
                this.turmasArray.push({...snapshot.val(), id: snapshot.key});
            })
            


        }
    };
</script>