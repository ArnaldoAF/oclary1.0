<template>
    <div>
        
        ALUNOS 
        
        <table class="highlight">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Aluno</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="aluno in AlunosArray">
                    <td>{{aluno.codigo}}</td>
                    <td>{{aluno.nome}}</td>
                    <td class="left">
                        <a class="btn-floating  btn-small modal-trigger" href="#modal1" @click="EditarAluno(aluno)"><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" @click="ExcluirAluno(aluno)"><i class="material-icons">delete</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" ><i class="material-icons">assignment_turned_in</i></a>
                        <a class="btn-floating  btn-small modal-trigger tooltipped" data-position="bottom" data-tooltip="NOTAS" href="#modal2" ><i class="material-icons">exposure_plus_1</i></a>
                    </td>

                    
                </tr>
            </tbody>
        </table>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large red modal-trigger" href="#modal1"> <i class="large material-icons">add</i></a>
        </div>

        <div id="modal1" class="modal">
            <div class="modal-content">
                <div class="input-field ">
                    <input id="last_name" placeholder="CODIGO DO ALUNO" type="text" v-model="objAluno.codigo" autofocus required class="validate active">
                    <label class="active" for="last_name">Codigo do Aluno</label>
                </div>
                <div class="input-field ">
                    <input id="last_name" placeholder="NOME DO ALUNO" type="text" v-model="objAluno.nome" autofocus required class="validate active">
                    <label class="active" for="last_name">Nome do Aluno</label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn modal-action modal-close red" @click="objAluno.nome='';objAluno.codigo='';">CANCELAR</button>
                <button class="btn modal-action modal-close green" v-if="true" @click="InserirAluno()">INCLUIR</button>
                <button class="btn modal-action modal-close green" v-else @click="UpdateAluno()">EDITAR</button>
            </div>
        </div>
        

    </div>
</template>
<script>
import Database from "../firebase.js";
import {mapMutations, mapGetters} from 'vuex';

export default {
    firebase: {
        //escolas: Database.ref('escolas')
    },
    computed:{
        ...mapMutations([
            'TurmaAtual'
        ]),
        ...mapGetters([
            'TurmaAtual'
        ])
    },
    beforeUpdate: function() {
        // Jquery para o modal
        $(document).ready(function() {
            $(".collapsible").collapsible();
            $('.tooltipped').tooltip();
        });
    },
    mounted: function() {
        // Jquery para o modal
        $(document).ready(function() {
            $(".collapsible").collapsible();
            $(".modal").modal();
            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
            console.log($(".collapsible").collapsible());
        });
    },
    data () {
        return {
            loading:false,

            AlunosRef:Database.ref("alunos/"+this.$store.getters.TurmaAtual.id),
            AlunosArray:[],
            objAluno:{
                codigo:'',
                nome:''
            },
            EditingAluno: null

        }
    },
    methods: {
        InserirAluno() {
            console.log("Inserir Aluno");
            console.log(this.objAluno);
            
            this.AlunosRef.push(this.objAluno);
            objAluno.nome='';
            objAluno.codigo='';
        },
        ExcluirAluno(aluno) {
            this.AlunosRef.child(aluno.id).remove();
        },
        EditarAluno(aluno) {
            this.objAluno = Object.assign({},aluno);
            console.log("Editar Aluno");
            console.log(this.objAluno);
        },
        UpdateAluno(){
            console.log("Update Aluno");
            console.log(this.objAluno);
            this.AlunosRef.child(this.objAluno.id)
            .update({
                codigo: this.objAluno.codigo,
                nome: this.objAluno.nome,
            });
            
            this.objAluno={
                codigo:'',
                nome:''
            };
            
            
        }
    },
    created() {
        this.AlunosRef.on("value", snapshot => {
            this.loading = false;
            
        });

        this.AlunosRef.on('child_added', snapshot => {
            this.AlunosArray.push({...snapshot.val(), id: snapshot.key});
        });

        this.AlunosRef.on('child_removed', snapshot => {
            const AlunoRemovido = this.AlunosArray.find(
                aluno => aluno.id === snapshot.key
            );
            const index = this.AlunosArray.indexOf(AlunoRemovido);
            this.AlunosArray.splice(index, 1);
        });

        this.AlunosRef.on("child_changed", snapshot => {
            const AlunoEditado = this.AlunosArray.find(
                aluno => aluno.id === snapshot.key
            );
            AlunoEditado.nome = snapshot.val().nome;
            AlunoEditado.codigo = snapshot.val().codigo;
            //const index = this.escolasArray.indexOf(EscolaEditada)
            //this.escolasArray.splice(index, 1,"snapshot.val().nome");
        });
    }
}
</script>
