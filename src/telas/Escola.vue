<template>
    <div>
    <h1>Escolas</h1>
    <div class="container">
        <div v-if="loading" class="progress center">
            <div class="indeterminate"></div>
        </div>
        
            <ul class="collapsible" >
                <li v-for="escola in escolasArray" class="collection-item">
                <div class="collapsible-header">
                    {{escola.nome}}

                    
                    <span class=" badge">
                        <span class="new badge left" data-badge-caption=""> {{turmasArray.filter( function(turma){return (turma.idEscola===escola.id);}).length }} </span>
                        <span class="badge left" data-badge-caption=""></span>
                        
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
                        <td class="right">
                            <a class="btn-floating  btn-small modal-trigger" href="#modal2" @click="EditarTurma(turma)" ><i class="material-icons">edit</i></a>
                            <a class="btn-floating  btn-small" @click="ExcluirTurma(turma)"><i class="material-icons">delete</i></a>
                            <a class="btn-floating  btn-small" ><i class="material-icons">forward</i></a>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </li>
            </ul>



            <!-- Modal Trigger -->
            <div v-if="!loading" class="fixed-action-btn">
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
                <button class="btn modal-action modal-close green" v-if="editingTurma === null" @click="InserirTurma()">INCLUIR</button>
                <button class="btn modal-action modal-close green" v-else @click="UpdateTurma()">EDITAR</button>
            </div>

            </div>
        
    </div>

</div>
</template>
<script>
import Database from "../firebase.js";

export default {
    firebase: {
        //escolas: Database.ref('escolas')
    },
    mounted: function() {
        // Jquery para o modal
        $(document).ready(function() {
            $(".modal").modal();
            //$(".modal").modal('open');
            //$("#last_name").focus();
            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
            $(".collapsible").collapsible();
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
            this.turmaRef.push({
                idEscola: this.idEscolaTurma,
                nome: this.nomeTurma,
                disciplina: this.disciplinaTurma
            });
            this.nomeTurma = "";
            this.disciplinaTurma = "";
        },
        ExcluirTurma(turma) {
            this.turmaRef.child(turma.id).remove();
        },
        EditarTurma(turma) {
            this.editingTurma=turma;
            this.nomeTurma = turma.nome;
            this.disciplinaTurma = turma.disciplina;
        },
        UpdateTurma() {
            this.turmaRef
                .child(this.editingTurma.id)
                .update({ 
                    nome: this.nomeTurma,
                    disciplina: this.disciplinaTurma
                 });
            this.nomeTurma = "";
            this.disciplinaTurma = "";
            this.editingTurma = null;
        }
    },
    created() {
        // ESCOLAS
        //Database.ref('escolas').orderByChild('nome').equalTo('Etec').
        this.escolasRef.on("child_added", snapshot => {
            this.escolasArray.push({ ...snapshot.val(), id: snapshot.key });

            this.escolasArray.sort(function(a, b) {
                if (a.nome.toUpperCase() > b.nome.toUpperCase()) return 1;
                if (a.nome.toUpperCase() < b.nome.toUpperCase()) return -1;
                return 0;
            });
            this.loading = false;
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
            TurmaEditada.nome = snapshot.val().nome;
            TurmaEditada.disciplina = snapshot.val().disciplina;
            //const index = this.escolasArray.indexOf(EscolaEditada)
            //this.escolasArray.splice(index, 1,"snapshot.val().nome");
        });
    }
};
</script>