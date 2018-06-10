<template>
    <div>
    
    <div class="container">
        <div v-if="loading" class="progress center">
            <div class="indeterminate"></div>
        </div>
        <div v-else-if="!loading && escolasArray.length==0">
            <div class="card-panel">
                <h3>Não há Escolas</h3>
            </div>
        </div>
            <!-- LISTA DE ESCOLAS -->
            <ul v-else class="collapsible" >
                <li v-for="escola in escolasArray" >
                    <div class="collapsible-header">
                        <strong>  {{escola.nome}} </strong>
                        
                        <span class=" badge">
                            <span class="badge left" data-badge-caption=""> 
                                <i class="small material-icons " :class="[colorText]">group  </i> 
                                <span class="new badge right" data-badge-caption="" :class="[color]">
                                    {{turmasArray.filter( function(turma){return (turma.idEscola===escola.id);}).length }}
                                </span>
                            </span>
                            <span class="badge left" data-badge-caption="">  </span>
                            
                            <a class="btn-floating  btn btn-small modal-trigger " href="#modal2" data-position="bottom" data-tooltip="ADICIONAR TURMA"    @click="idEscolaTurma=escola.id" :class="[color]"><i class="material-icons ">group_add</i></a>
                            <a class="btn-floating  btn btn-small modal-trigger " href="#modal1" data-position="bottom" data-tooltip="EDITAR"             @click="EditarEscola(escola)" :class="[color]"><i class="material-icons ">edit</i></a>
                            <a class="btn-floating  btn btn-small modal-trigger " href="#modal3" data-position="bottom" data-tooltip="EXCLUIR"            @click="EditarEscola(escola)" :class="[color]"><i class="material-icons ">delete</i></a>
                        </span>
                        
                    </div>
                    <div class="collapsible-body">
                        <table class="highlight">
                        
                            <tbody>
                                <tr v-for="turma in turmasArray" v-if="turma.idEscola===escola.id">
                                    <td> {{turma.nome}} </td>
                                    <td> {{turma.disciplina}} </td>
                                    <td class="right">
                                        <router-link class="btn-floating  btn-small " :to="'/escola/turma/'+turma.id+''" :class="[color]" data-position="bottom" data-tooltip="ACESAR TURMA"><i @click="StoreTurma(turma)" class="material-icons">forward</i></router-link>
                                        <a class="btn-floating  btn-small modal-trigger " href="#modal2" data-position="bottom" data-tooltip="EDITAR" @click="EditarTurma(turma)" :class="[color]"><i class="material-icons">edit</i></a>
                                        <a class="btn-floating  btn-small modal-trigger " href="#modal4" data-position="bottom" data-tooltip="EXCLUIR" @click="EditarTurma(turma)" :class="[color]"><i class="material-icons">delete</i></a>
                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <ul class="collection hide">
                            <li v-for="turma in turmasArray" v-if="turma.idEscola===escola.id" class="collection-item">
                                <div class="container">
                                {{turma.nome}} - {{turma.disciplina}}

                                <a href="#!" class="btn-floating hide btn-small white"></a>
                                <a class="btn-floating  btn-small modal-trigger right" href="#modal2" @click="EditarTurma(turma)" ><i class="material-icons">edit</i></a>
                                <a class="btn-floating  btn-small right" @click="ExcluirTurma(turma)"><i class="material-icons">delete</i></a>
                                <router-link class="btn-floating  btn-small right" :to="'/escola/turma/'+turma.id+''" ><i @click="StoreTurma(turma)" class="material-icons">forward</i></router-link>
                                teste
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

            <ul class="collapsible hide">
                <li v-for="escola in escolasArray">
                    <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>
            <ul class="collapsible hide">
                <li>
                    <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
                    <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
            </ul>

            <!-- BOTÃO QUE ATIVA O FORMULARIO -->
            <div v-if="!loading" class="fixed-action-btn" @click="nomeEscola=''; objEscola=null">
                <a class="btn-floating btn-large red modal-trigger" href="#modal1">
                <i class="large material-icons">add</i>
                </a>
            </div>

            <!-- FORMULARIO ESCOLA -->
            <div id="modal1" class="modal" @keyup.enter="ValidarEscola()">
                <div class="modal-content">
                    <div class="input-field ">
                        <input id="last_name" placeholder="NOME DA ESCOLA" type="text" v-model="nomeEscola" autofocus required="" aria-required="true" class=" active">
                        <label class="active" for="last_name">Nome da Escola</label>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="nomeEscola=''; objEscola=null">CANCELAR</button>
                    
                    <button class="btn modal-action  green" @click="ValidarEscola()">
                        <a class="white-text" v-if="objEscola===null">INCLUIR</a> 
                        <a class="white-text" v-else>EDITAR</a> 
                    </button>
                    
                </div>
            </div>

            <!-- FORMULARIO TURMA -->
            <div id="modal2" class="modal" @keyup.enter="ValidarTurma()">
                <div class="modal-content">
                    <div class="input-field ">
                        <input id="last_name" placeholder="NOME DA TURMA" type="text" v-model="objTurma.nome" autofocus class="validate">
                        <label class="active" for="last_name">Nome da Turma</label>
                    </div>
                    <div class="input-field ">
                        <input id="last_name" placeholder="DISCIPLINA DA TURMA" type="text" v-model="objTurma.disciplina" autofocus class="validate">
                        <label class="active" for="last_name">Disciplina da Turma</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="ResetObjTurma()">CANCELAR</button>
                    
                    <button class="btn modal-action  green" @click="ValidarTurma()">
                        <a class="white-text" v-if="objTurma.id === ''">INCLUIR</a> 
                        <a class="white-text" v-else>EDITAR</a> 
                    </button>
                </div>

            </div>
        
            <div id="modal3" class="modal" @keyup.enter="ExcluirEscola(objEscola); ">
                <div class="modal-content">
                    <h5>Deseja excluir a escola {{nomeEscola}}?</h5>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="nomeEscola=''; objEscola=null">CANCELAR</button>
                    <button class="btn modal-action green" @click="ExcluirEscola(objEscola)">EXCLUIR</button>
                    
                </div>
            </div>

            <div id="modal4" class="modal" @keyup.enter="ExcluirTurma(objTurma); ">
                <div class="modal-content">
                    <h5>Deseja excluir a turma {{objTurma.nome}} ? Essa ação irá excluir todos os dados dessa turma!</h5>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="ResetObjTurma()">CANCELAR</button>
                    <button class="btn modal-action green" @click="ExcluirTurma(objTurma)">EXCLUIR</button>
                    
                </div>
            </div>
            
    </div>

</div>
</template>
<script>
import Database from "../firebase.js";
import {mapMutations} from 'vuex';

export default {
    firebase: {
        //escolas: Database.ref('escolas')
    },
    computed:{
        ...mapMutations([
            'TurmaAtual'
        ])
    },
    beforeCreate() {
        this.$store.commit("Setor","escola");
    },
    beforeUpdate: function() {
        console.log("ESCOLA - beforeUpdate");
        // Jquery para o modal
            //$(document).ready(function() {
            //$(".collapsible").collapsible();
            //$('.tooltipped').tooltip();
            
            //console.log($(".collapsible").collapsible());
        //});
    },
    updated: function() {
        console.log("ESCOLA - updated");
        // Jquery para o modal
            ///$(document).ready(function() {
            //$(".collapsible").collapsible();
            //console.log($(".collapsible").collapsible());
        //});
    },
    beforeMount: function() {
        console.log("ESCOLA - beforeMount");
        //$(document).ready(function() {
            //$(".collapsible").collapsible();
            //$('.tooltipped').tooltip();
            //console.log($(".collapsible").collapsible());
        //})
    },
    mounted: function() {
        // Jquery para o modal
        console.log("ESCOLA - mounted");
        /*
        //$(".modal").modal();
        $(document).ready(function() {
            //$(".collapsible").collapsible();
            //$(".modal").modal();
            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
            //console.log($(".collapsible").collapsible());
        });
        */
    },
    watch: {
        loading: function (val){
            console.log("wacth loading : "+ val);
            M.AutoInit();
            $(document).ready(function() {
                $(document).on("shown.bs.modal", function(e) {
                    $("[autofocus]", e.target).focus();
                });
            });
            document.addEventListener('DOMContentLoaded', function() {
                //var elems = document.querySelectorAll('.modal');
                //var instances = M.Modal.init(elems, options);
            });
        }

    },
    data() {
        return {
            loading: true,
            color:'blue',
            colorText:'blue-text',
            // ESCOLA
            escolasArray: [], // é rodada em um for para exibir as escolas no DOM
            nomeEscola: "", // um valor temporario para edição e exclusão
            objEscola: null, // objeto temporario para edição

            //escolasRef: Database.ref('escolas').orderByChild('nome').equalTo('Etec'),   // referencia
            escolasRef: Database.ref("escolas"),
            //TURMA
            turmasArray: [],
            nomeTurma: "",
            disciplinaTurma: "",
            idEscolaTurma: "",
            editingTurma: null,
            objTurma:{
                id:'',
                nome:'',
                disciplina:'',
                idEscola:'',
                alunosCount:0
            },

            turmaRef: Database.ref("turmas"),

            oldNome:""
        };
    },
    methods: {
        // ESCOLA
        InserirEscola() {
            //Database.ref('escolas').push({nome: this.nomeEscola});

            this.escolasRef.push({ nome: this.nomeEscola });
            this.nomeEscola = "";
            this.objEscola = null;
            
            console.log("insert");
            M.toast({html: 'Escola Inserida'})
            //console.log($("#modal1").modal("close"));
            //var instance = M.Modal.getInstance("#modal1");
            //instance.open();
        },
        ExcluirEscola(escola) {
            var EscolaTurmas = this.turmasArray.filter( function(turma){return (turma.idEscola===escola.id);} );
            EscolaTurmas.forEach(turma => {
                this.ExcluirTurma(turma);
            });
            this.escolasRef.child(escola.id).remove();
             $("#modal3").modal("close");
             M.toast({html: 'Escola Excluida'})
        },
        EditarEscola(escola) {
            this.objEscola = escola;
            this.nomeEscola = escola.nome;
            this.oldNome=escola.nome;
        },
        UpdateEscola() {
            this.escolasRef
                .child(this.objEscola.id)
                .update({ nome: this.nomeEscola });
            this.nomeEscola = "";
            this.objEscola = null;
            
             M.toast({html: 'Escola Editada'})
        },
        ValidarEscola() {
            var mensagem=[];

            // verificações
            if(this.nomeEscola.trim() == "") mensagem.push("Preencha Nome!");
            const Escola = this.escolasArray.find(
                escola => escola.nome === this.nomeEscola
            );

            if(Escola!=null) {
                if(this.objEscola.id==='') mensagem.push("Escola já exixte!");
                else if(Escola.nome !== this.oldNome) mensagem.push("Data já existente!");

            }

            if(mensagem.length>0) {
                for (var i=0; mensagem.length; i++) {
                    M.toast({html: mensagem[i]})
                }
            }
            else {
                if(this.objEscola===null) this.InserirEscola();
                else this.UpdateEscola();

                $("#modal1").modal("close");
                this.oldNome="";
            }

            
        },

        // TURMA
        InserirTurma() {
            this.objTurma.idEscola = this.idEscolaTurma;
            delete this.objTurma.id;
            this.turmaRef.push(this.objTurma);
            this.ResetObjTurma();
            M.toast({html: 'Turma Criada'})
           
        },
        ExcluirTurma(turma) {
            Database.ref("alunos").child(turma.id).remove();
            this.turmaRef.child(turma.id).remove();
             $("#modal4").modal("close");
             M.toast({html: 'Turma Excluida'})
        },
        EditarTurma(turma) {
            this.objTurma=Object.assign({}, turma);
        },
        UpdateTurma() {
            this.turmaRef
                .child(this.objTurma.id)
                .update({ 
                    nome: this.objTurma.nome,
                    disciplina: this.objTurma.disciplina
                 });
            
            this.ResetObjTurma();
            M.toast({html: 'Turma Editada'})
        },
        ValidarTurma(){
            if(this.objTurma.nome=="" && this.objTurma.disciplina=="") 
            { 
                M.toast({html: 'Nome e disciplina estão vazios'})
                return 0;
            }
            console.log(this.objTurma.idEscola);
            const Turma = this.turmasArray.find(
                turma => (turma.nome === this.objTurma.nome && 
                            turma.disciplina === this.objTurma.disciplina &&
                            turma.idEscola === this.idEscolaTurma
                            )
            );

            console.log(this.idEscolaTurma);

            if(Turma!=null) M.toast({html: 'Turma já existe'})
            else{
                if(this.objTurma.id === '') this.InserirTurma();
                else this.UpdateTurma();
                $("#modal2").modal("close");
                //console.log("TURMA "+ Turma.nome);
            }

        },

        ResetObjTurma() {
            this.objTurma={
                id:'',
                nome:'',
                disciplina:'',
                idEscola:'',
                alunosCount:0
            }
        },

        //VUEX
        StoreTurma(turma) {
            this.objTurma=Object.assign({}, turma);
            this.$store.commit("TurmaAtual",this.objTurma);
        }

    },
    created() {
        // ESCOLAS
        //Database.ref('escolas').orderByChild('nome').equalTo('Etec').
       

        this.$store.commit("TurmaAtual",null);

        this.escolasRef.on("value", snapshot => this.loading = false);

        this.escolasRef.on("child_added", snapshot => {
            this.escolasArray.push({ ...snapshot.val(), id: snapshot.key });

            this.escolasArray.sort(function(a, b) {
                if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1;
                if (a.nome.toUpperCase() < b.nome.toUpperCase()) return -1;
                return 0;
            });
            //this.loading = false;
        });

        this.escolasRef.on("child_removed", snapshot => {
            const EscolaRemovida = this.escolasArray.find(
                escola => escola.id === snapshot.key
            );
            const index = this.escolasArray.indexOf(EscolaRemovida);
            this.escolasArray.splice(index, 1);

            this.escolasArray.sort(function(a, b) {
                if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1;
                if (a.nome.toUpperCase() < b.nome.toUpperCase()) return -1;
                return 0;
            });
        });

        this.escolasRef.on("child_changed", snapshot => {
            const EscolaEditada = this.escolasArray.find(
                escola => escola.id === snapshot.key
            );
            EscolaEditada.nome = snapshot.val().nome;
            //const index = this.escolasArray.indexOf(EscolaEditada)
            //this.escolasArray.splice(index, 1,"snapshot.val().nome");
            this.escolasArray.sort(function(a, b) {
                if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1;
                if (a.nome.toUpperCase() < b.nome.toUpperCase()) return -1;
                return 0;
            });
        });
        //Database.ref('escolas').on('value', snapshot => console.log(snapshot.val()));

        // TURMAS

        this.turmaRef.on("child_added", snapshot => {
            this.turmasArray.push({ ...snapshot.val(), id: snapshot.key });
        });

        this.turmaRef.on("child_removed", snapshot => {
            const TurmaRemovida = this.turmasArray.find(
                turma => turma.id === snapshot.key
            );

            const index = this.turmasArray.indexOf(TurmaRemovida);
            this.turmasArray.splice(index, 1);
        });

        this.turmaRef.on("child_changed", snapshot => {
            const TurmaEditada = this.turmasArray.find(
                turma => turma.id === snapshot.key
            );
            TurmaEditada.id = snapshot.key;
            TurmaEditada.nome = snapshot.val().nome;
            TurmaEditada.disciplina = snapshot.val().disciplina;
            TurmaEditada.alunosCount = snapshot.val().alunosCount;
            //const index = this.escolasArray.indexOf(EscolaEditada)
            //this.escolasArray.splice(index, 1,"snapshot.val().nome");
        });
    }
};
</script>