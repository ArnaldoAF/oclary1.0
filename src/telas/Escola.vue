<template>
    <div>
    
    <div class="container">
        <div v-if="loading" class="progress center blue">
            <div class="indeterminate"></div>
        </div>
        <div v-else-if="!loading && escolasArray.length==0">
            <div class="card-panel">
                <h3>Não há Escolas</h3>
            </div>
        </div>
            <!-- LISTA DE ESCOLAS -->
            <ul v-else class="collapsible" >
                <li v-for="escola in escolasArray" class="collection-item active">
                <div class="collapsible-header">
                    {{escola.nome}}
                    
                    <span class=" badge">
                        <span class="badge left" data-badge-caption=""> 
                            <i class="small material-icons ">group  </i> 
                            <span class="new badge right" data-badge-caption="">
                                {{turmasArray.filter( function(turma){return (turma.idEscola===escola.id);}).length }}
                            </span>
                        </span>
                        <span class="badge left" data-badge-caption="">  </span>
                        
                        <a class="btn-floating  btn-small modal-trigger" href="#modal2" @click="idEscolaTurma=escola.id" ><i class="material-icons">group_add</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#modal1" @click="EditarEscola(escola)" ><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small" @click="ExcluirEscola(escola)"><i class="material-icons">delete</i></a>
                    </span>
                    
                </div>
                <div class="collapsible-body">
                    <table class="highlight">
                        <!--
                    <thead>
                        <tr>
                            <th>Turma</th>
                            <th>Disciplina</th>
                            <th class="right">Ações</th>
                        </tr>
                    </thead>
                    -->
                    <tbody>
                        <tr v-for="turma in turmasArray" v-if="turma.idEscola===escola.id">
                        <td> {{turma.nome}} </td>
                        <td> {{turma.disciplina}} </td>
                        <td class="right">
                            <a class="btn-floating  btn-small modal-trigger" href="#modal2" @click="EditarTurma(turma)" ><i class="material-icons">edit</i></a>
                            <a class="btn-floating  btn-small" @click="ExcluirTurma(turma)"><i class="material-icons">delete</i></a>
                            <router-link class="btn-floating  btn-small" :to="'/escola/turma/'+turma.id+''" ><i @click="StoreTurma(turma)" class="material-icons">forward</i></router-link>
                        </td>
                        </tr>
                    </tbody>
                    </table>

                    <ul class="collection hide">
                        <li v-for="turma in turmasArray" v-if="turma.idEscola===escola.id" class="collection-item">
                            <div class="container">
                            {{turma.nome}} - {{turma.disciplina}}

                            <a href="#!" class="btn-floating btn-small white"></a>
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

            <!-- BOTÃO QUE ATIVA O FORMULARIO -->
            <div v-if="!loading" class="fixed-action-btn">
                <a class="btn-floating btn-large red modal-trigger" href="#modal1">
                <i class="large material-icons">add</i>
                </a>
            </div>

            <!-- FORMULARIO ESCOLA -->
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <div class="input-field ">
                        <input id="last_name" placeholder="NOME DA ESCOLA" type="text" v-model="nomeEscola" autofocus required class="validate active">
                        <label class="active" for="last_name">Nome da Escola</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="nomeEscola=''; EditingEscola=null">CANCELAR</button>
                    <button class="btn modal-action modal-close green" v-if="EditingEscola===null" @click="InserirEscola()">INCLUIR</button>
                    <button class="btn modal-action modal-close green" v-else @click="UpdateEscola()">EDITAR</button>
                </div>
            </div>

            <!-- FORMULARIO TURMA -->
            <div id="modal2" class="modal">
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
                    <button class="btn modal-action modal-close green" v-if="objTurma.id === ''" @click="InserirTurma()">INCLUIR</button>
                    <button class="btn modal-action modal-close green" v-else @click="UpdateTurma()">EDITAR</button>
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
        // Jquery para o modal
            $(document).ready(function() {
            $(".collapsible").collapsible();
            console.log("beforeUpdated");
            //console.log($(".collapsible").collapsible());
        });
    },
    updated: function() {
        // Jquery para o modal
            $(document).ready(function() {
            $(".collapsible").collapsible();
            console.log("updated");
            //console.log($(".collapsible").collapsible());
        });
    },
    beforeMount: function() {
        $(document).ready(function() {
            $(".collapsible").collapsible();
            console.log("beforeMounted");
            //console.log($(".collapsible").collapsible());
        })
    },
    mounted: function() {
        // Jquery para o modal
        $(document).ready(function() {
            $(".collapsible").collapsible();
            $(".modal").modal();
            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
            console.log("mounted");
            //console.log($(".collapsible").collapsible());
        });
    },
    data() {
        return {
            loading: true,
            // ESCOLA
            escolasArray: [], // é rodada em um for para exibir as escolas no DOM
            nomeEscola: "", // um valor temporario para edição e exclusão
            EditingEscola: null, // objeto temporario para edição

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

            turmaRef: Database.ref("turmas")
        };
    },
    methods: {
        // ESCOLA
        InserirEscola() {
            //Database.ref('escolas').push({nome: this.nomeEscola});

            this.escolasRef.push({ nome: this.nomeEscola });
            this.nomeEscola = "";
            this.EditingEscola = null;
        },
        ExcluirEscola(escola) {
            var EscolaTurmas = this.turmasArray.filter( function(turma){return (turma.idEscola===escola.id);} );
            EscolaTurmas.forEach(turma => {
                this.ExcluirTurma(turma);
            });
            this.escolasRef.child(escola.id).remove();
        },
        EditarEscola(escola) {
            this.EditingEscola = escola;
            this.nomeEscola = escola.nome;
        },
        UpdateEscola() {
            this.escolasRef
                .child(this.EditingEscola.id)
                .update({ nome: this.nomeEscola });
            this.nomeEscola = "";
            this.EditingEscola = null;
        },

        // TURMA
        InserirTurma() {
            this.objTurma.idEscola = this.idEscolaTurma;
            delete this.objTurma.id;
            this.turmaRef.push(this.objTurma);
            this.ResetObjTurma();
        },
        ExcluirTurma(turma) {
            Database.ref("alunos").child(turma.id).remove();
            this.turmaRef.child(turma.id).remove();
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