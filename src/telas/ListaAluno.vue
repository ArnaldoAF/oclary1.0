<template>
    <div>
        
        ALUNOS 
        <div class="row">
            <div class="input-field col s6">
                <i class="material-icons prefix">search</i>
                <input id="icon_prefix" type="text" class="validate" v-model="pesquisa">
                <label for="icon_prefix">Aluno ou Codigo</label>
            </div>
        </div>

        <table class="highlight">
            <thead>
                <tr>
                    <th class="" @click="codeOrdem=!codeOrdem">
                        Codigo 
                        <i v-if="codeOrdem" class="material-icons Tiny">arrow_drop_down</i>
                        <i v-else class="material-icons Tiny">arrow_drop_up</i>
                    </th>
                    <th @click="nomeOrdem=!nomeOrdem">
                        Aluno
                        <i v-if="nomeOrdem" class="material-icons Tiny">arrow_drop_down</i>
                        <i v-else class="material-icons Tiny">arrow_drop_up</i>
                    </th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="aluno in AlunosArray" v-if="(aluno.nome.toUpperCase().indexOf(pesquisa.toUpperCase())!==-1 || aluno.codigo.toUpperCase().indexOf(pesquisa.toUpperCase())!==-1) || pesquisa===''">
                    <td>{{aluno.codigo}}</td>
                    <td>{{aluno.nome}}</td>
                    <td class="left">
                        <a class="btn-floating  btn-small modal-trigger disabled" href="#!" @click=""><i class="material-icons">assignment_turned_in</i></a>
                        <a class="btn-floating  btn-small modal-trigger tooltipped" data-position="bottom"  @click="EditarAluno(aluno); AtribuirNota()" data-tooltip="NOTAS" href="#modal2" ><i class="material-icons">exposure_plus_1</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#modal1" @click="EditarAluno(aluno)"><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" @click="ExcluirAluno(aluno)"><i class="material-icons">delete</i></a>
                        
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
                <button class="btn modal-action modal-close red" @click="ResetObjAluno()">CANCELAR</button>
                <button class="btn modal-action modal-close green" v-if="objAluno.id===''" @click="InserirAluno()">INCLUIR</button>
                <button class="btn modal-action modal-close green" v-else @click="UpdateAluno()">EDITAR</button>
            </div>
        </div>

        <div id="modal2" class="modal">
            <div>
                <div class="modal-content">
                    <h3>Média: {{media | formatNota}} </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Prova</th>
                                <th>Peso</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="prova in modalNota">
                                <td>{{prova.prova}}</td>
                                <td>{{prova.peso}}0%</td>
                                <td>
                                    
                                    <div v-if="(prova !== editNota)">
                                        {{prova.nota | formatNota}} 
                                        <a class="btn-floating  btn-small"  href="#!" @click="EditarNota(prova)"><i class="material-icons">edit</i></a>
                                    </div>
                                    <div v-else class="row">
                                        <input id="icon_prefix" v-model="novaNota" type="text" class="validate col s2">
                                        <a class="btn-floating  btn-small" href="#!" @click="prova.nota=Number(novaNota);editNota=null;"><i class="material-icons">done</i></a>
                                        <a class="btn-floating  btn-small" href="#!" @click="editNota=null"><i class="material-icons">clear</i></a>
                                    </div>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn modal-action modal-close red" @click="modalNota=null;">CANCELAR</button>
                <button class="btn modal-action modal-close green" @click="UpdateNota()">EDITAR</button>
            </div>
        </div>
        

    </div>
</template>
<script>
import Database from "../firebase.js";
import {mapMutations, mapGetters} from 'vuex';

export default {
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
            //console.log($(".collapsible").collapsible());
        });

        // PopularAray de provas com a referencia
         Database.ref("provas/"+this.$store.getters.TurmaAtual.id).on('child_added', snapshot => {
             this.ProvasArray.push({
                 id: snapshot.key,
                 prova: snapshot.val().nome,
                 peso: snapshot.val().peso
                 //nota: snapshot.val().nota
             })
         })
    },
    data () {
        return {
            loading:false,
            pesquisa:'',
            codeOrdem: true,
            nomeOrdem: true,

            media:0,

            AlunosRef:Database.ref("alunos/"+this.$store.getters.TurmaAtual.id),
            AlunosArray:[],
            objAluno:{
                id:'',
                codigo:'',
                nome:'',
                notas: []
            },
            EditingAluno: null,

            // Carregando Provas
            ProvasRef: Database.ref("provas").child(this.$store.getters.TurmaAtual.id),
            ProvasArray:[],

            modalNota: null,
            editNota: null,
            novaNota:0,

            alunosCountLocal:this.$store.getters.TurmaAtual.alunosCount
        }
    },
    filters:{
        formatNota: function(val){
            //var number = +val.replace(/[^\d.]/g, '');
            return isNaN(val) ? 0 : parseFloat(val.toFixed(2));
        }
    },
    watch:{
        codeOrdem: function (val) {
            this.SortByCode();
            
        },
        nomeOrdem: function (val) {
            this.SortByName();
            
        }
    },
    methods: {
        ResetObjAluno() {
            this.objAluno={
                id:'',
                codigo:'',
                nome:'',
                notas:[]
            };
            this.media=0
        },
        InserirAluno() {
            console.log("Inserir Aluno");
            //console.log(this.objAluno);
            
            // Inserir Provas com notas 0 no Objeto Aluno
            this.ProvasArray.forEach(prova => {
                this.objAluno.notas[prova.id] = {
                    prova: prova.prova,
                    peso: prova.peso,
                    nota: 0
                }
            });

            delete this.objAluno.id;
            var aluno_id = this.AlunosRef.push(this.objAluno).key;
            
            this.ProvasArray.forEach(prova => {
                this.ProvasRef
                    .child(prova.id)
                    .child("notas")
                    .child(aluno_id)
                    .set({
                        codigo: this.objAluno.codigo,
                        nome_aluno:  this.objAluno.nome,
                        nota: 0
                    });
            });


            this.ResetObjAluno();
            console.log("inserido com sucesso");

            Database.ref("turmas/"+ this.$store.getters.TurmaAtual.id).child("alunosCount").set(
                this.alunosCountLocal + 1
            );
            this.alunosCountLocal++;
        },
        ExcluirAluno(aluno) {

            this.ProvasArray.forEach(prova => {
                this.ProvasRef
                    .child(prova.id)
                    .child("notas")
                    .child(aluno.id).remove()
            });

            Database.ref("turmas/"+ this.$store.getters.TurmaAtual.id).child("alunosCount").set(
                this.alunosCountLocal - 1
            );
            this.alunosCountLocal--;
            this.AlunosRef.child(aluno.id).remove();
            
        },
        EditarAluno(aluno) {
            this.media=0;
            this.objAluno = Object.assign({},aluno);
            console.log(this.objAluno.nome);
            //console.log(this.media);
            
            for(var prova in this.objAluno.notas) {
                this.media+=this.objAluno.notas[prova].nota*(this.objAluno.notas[prova].peso/10);
                
            }
            console.log(this.media);

            //this.objAluno.notas.forEach(nota => {
            //    this.media=10//nota.nota*(nota.peso/10);
            //});
            
            console.log("Editar Aluno");
            //console.log(this.objAluno);
        },
        UpdateAluno(){
            console.log("Update Aluno");


            var id = this.objAluno.id;
            delete this.objAluno.id;

            this.ProvasArray.forEach({
                
            });


            //console.log(this.objAluno);
            this.AlunosRef.child(id)
                .update(this.objAluno);
            
            this.ResetObjAluno();
        },

        AtribuirNota() {
            this.modalNota = JSON.parse(JSON.stringify(this.objAluno.notas));
        },
        EditarNota(nota) {
            this.editNota = nota;
            this.novaNota = nota.nota;
        },
        UpdateNota() {
            this.objAluno.notas = Object.assign({},this.modalNota);

            this.UpdateAluno();
        },

        //metodos para sortear a tabela
        SortByCode() {
            var bool = this.codeOrdem;
            console.log("SORT BY CODE");
            
            this.AlunosArray.sort(function(a,b){
                //var bool = this.codeOrdem;
                
                if (a.codigo > b.codigo) return bool;
                if (a.codigo < b.codigo) return !bool;
                return 0;
            });
        },
        SortByName() {
            var bool = this.nomeOrdem;
            
            this.AlunosArray.sort(function(a,b){
                //var bool = this.codeOrdem;
                console.log(bool);
                if (a.nome.toUpperCase() > b.nome.toUpperCase()) return bool;
                if (a.nome.toUpperCase() < b.nome.toUpperCase()) return !bool;
                return 0;
            });
        }
    },
    created() {
        this.AlunosRef.on("value", snapshot => {
            this.loading = false;
            
        });

        this.AlunosRef.on('child_added', snapshot => {
            this.AlunosArray.push({...snapshot.val(), id: snapshot.key});
            console.log("CHILD_ADDED EVENT");
            this.codeOrdem=true;
            
            
        });

        this.AlunosRef.on('child_removed', snapshot => {
            const AlunoRemovido = this.AlunosArray.find(
                aluno => aluno.id === snapshot.key
            );
            console.log("CHILD_REMOVED EVENT");
            const index = this.AlunosArray.indexOf(AlunoRemovido);
            
            this.AlunosArray.splice(index, 1);
        });

        this.AlunosRef.on("child_changed", snapshot => {
            const AlunoEditado = this.AlunosArray.find(
                aluno => aluno.id === snapshot.key
            );
            console.log("CHILD_CHANGED EVENT");
            AlunoEditado.id = snapshot.key;
            AlunoEditado.nome = snapshot.val().nome;
            AlunoEditado.codigo = snapshot.val().codigo;
            //AlunoEditado=Object.assign({},snapshot.val());
            this.codeOrdem=true;
            //this.SortByCode();
            //const index = this.escolasArray.indexOf(EscolaEditada)
            //this.escolasArray.splice(index, 1,"snapshot.val().nome");
        });
    }
}
</script>
