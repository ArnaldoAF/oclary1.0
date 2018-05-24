<template>
    <div>
        Provas

        <div class="row">
            <div class="input-field col s9">
                <i class="material-icons prefix">search</i>
                <input id="icon_prefix" type="text" class="validate" v-model="pesquisa">
                <label for="icon_prefix">Prova</label>
            </div>
            <div class="input-field col s3">
                <select v-model="filtroMes">
                    <option value="0">Todos</option>
                    <option value="01">Janeiro</option>
                    <option value="02">Fevereiro</option>
                    <option value="03">Março</option>
                    <option value="04">Abril</option>
                    <option value="05">Maio</option>
                    <option value="06">Junho</option>
                    <option value="07">Julho</option>
                    <option value="08">Agosto</option>
                    <option value="09">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
                <label>Por Mês</label>
            </div>
        </div>

        <table class="highlight">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Nome</th>
                    <th>Peso</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="prova in ProvaArray" v-if="(FiltroPorMes(prova) && FiltroPorPesquisa(prova))">
                    <td>{{prova.data | formatDate}}</td>
                    <td>{{prova.nome}}</td>
                    <td>{{prova.peso}}0%</td>
                    <td class="left">
                        <a class="btn-floating  btn-small modal-trigger" href="#modal2" @click="EditarProva(prova); AtribuirNota()"><i class="material-icons">exposure_plus_1</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#modal1" @click="EditarProva(prova)"><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" @click="ExcluirProva(prova)"><i class="material-icons">delete</i></a>
                        
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large  red modal-trigger" href="#modal1"> <i class="large material-icons">add</i></a>
        </div>

        <div id="modal1" class="modal">
            <div class="modal-content row">

                <div class="input-field col s4">
                    <input id="data" placeholder="DATA" type="date"  v-model="objProva.data" autofocus required class="datepicker active">
                    <label class="active" for="data">DATA</label>
                </div>
                
                <div class="input-field col s4">
                    <textarea id="conteudo" placeholder="NOME"  v-model="objProva.nome" autofocus required class="validate active materialize-textarea"></textarea>
                    <label class="active" for="conteudo">Nome</label>
                </div>

                <div class="input-field col s4">
                    <select id="selectPeso" v-model="objProva.peso">
                    <option value="0">0%</option>
                    <option value="1">10%</option>
                    <option value="2">20%</option>
                    <option value="3">30%</option>
                    <option value="4">40%</option>
                    <option value="5">50%</option>
                    <option value="6">60%</option>
                    <option value="7">70%</option>
                    <option value="8">80%</option>
                    <option value="9">90%</option>
                    <option value="10">100%</option>
                    </select>
                    <label>Peso</label>
                </div>

                 <div class="input-field col s12 ">
                    <textarea id="conteudo" placeholder="CONTEUDO"  v-model="objProva.conteudo" autofocus required class="validate active materialize-textarea"></textarea>
                    <label class="active" for="conteudo">Conteúdo</label>
                </div>
                

            </div>
            <div class="modal-footer">
                <button class="btn modal-action modal-close red" @click="ResetObjProva()">CANCELAR</button>
                <button class="btn modal-action modal-close green" v-if="objProva.id===''" @click="InserirProva()">INCLUIR</button>
                <button class="btn modal-action modal-close green" v-else @click="UpdateProva()">EDITAR</button>
            </div>
        </div>

        <div id="modal2" class="modal">
            <div class="modal-content ">
                <h1>NOTAS</h1>
                <div class="responsive-table table-status-sheet">
                <table id="tabelaNotas">
                    <thead>
                        <tr>
                            <th @click="codeOrdem=!codeOrdem">
                                Codigo
                                <i v-if="codeOrdem" class="material-icons Tiny">arrow_drop_down</i>
                                <i v-else class="material-icons Tiny">arrow_drop_up</i>
                            </th>
                            <th @click="nomeOrdem=!nomeOrdem">
                                Aluno
                                <i v-if="nomeOrdem" class="material-icons Tiny">arrow_drop_down</i>
                                <i v-else class="material-icons Tiny">arrow_drop_up</i>
                            </th>                            
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="nota in modalNota">
                            <td>{{nota.codigo}} </td>
                            <td>{{nota.nome_aluno}} </td>                            
                            <td>
                                <div v-if="(nota !== editNota)">
                                    {{nota.nota | formatNota}} 
                                    <a class="btn-floating  btn-small"  href="#!" @click="EditarNota(nota)"><i class="material-icons">edit</i></a>
                                </div>
                                <div v-else class="row">
                                    <input id="icon_prefix" v-model="novaNota" type="text" class="validate col s2">
                                    <a class="btn-floating  btn-small" href="#!" @click="nota.nota=Number(novaNota);editNota=null;"><i class="material-icons">done</i></a>
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
        });
    },
    beforeMount: function() {
    },
    mounted: function() {
        // Jquery para o modal
        $(document).ready(function() {
            
            $(".modal").modal();
            $('select').formSelect();
            $('.datepicker').pickadate();
            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
        });
        Database.ref("alunos/"+this.$store.getters.TurmaAtual.id).on('child_added', snapshot => {
             this.AlunosArray.push({
                 id: snapshot.key,
                 codigo: snapshot.val().codigo,
                 nome: snapshot.val().nome
             })
         })

    },
    data() {
        return {
            loading: false,
            pesquisa:'',
            filtroMes:0,
            
            codeOrdem: true,
            nomeOrdem: true,
            média:0,

            

            ProvaRef: Database.ref("provas/"+this.$store.getters.TurmaAtual.id),
            ProvaArray:[],
            objProva:{
                id:'',
                data:'',
                nome:'',
                conteudo:'',
                peso: "0",
                notas:[]
            },
            AlunosRef: Database.ref("alunos").child(this.$store.getters.TurmaAtual.id),
            AlunosArray:[],

            //variaveis da nota
            modalNota:null, //esse é o objeto das notas, depois é atribuido no objeto nas notas originais
            editNota:null,
            novaNota:0

        }
    },
    watch:{
        codeOrdem: function (val) {
            this.SortByCode();
            
        },
        nomeOrdem: function (val) {
            this.SortByNome();
            
        }
    },
    filters:{
        formatDate: function(value) {
            if (value) {
                return moment(String(value)).format('DD/MM');
            }
        },
        formatNota: function(val){
            //var number = +val.replace(/[^\d.]/g, '');
            val = Number(val);
            return isNaN(val) ? 0 : parseFloat(val.toFixed(2));
        }
    },
    methods:{
        ResetObjProva() {
            this.objProva={
                id:'',  
                data:'',
                nome:'',
                conteudo:'',
                peso: "0",
                notas:[]
            }
        },
        InserirProva() {
            
            this.AlunosArray.forEach(aluno => {
                this.objProva.notas.push({
                    id_aluno: aluno.id,
                    codigo:aluno.codigo,
                    nome_aluno: aluno.nome,
                    nota: 1.566666
                });
            });

            delete this.objProva.id;
            var prova_id = this.ProvaRef.push(this.objProva).key;

            this.AlunosArray.forEach(aluno => {
                this.AlunosRef
                    .child(aluno.id)
                    .child("notas")
                    .child(prova_id)
                    .set({
                        prova:this.objProva.nome,
                        peso: this.objProva.peso,
                        nota:1.5666
                    });
             });

            this.ResetObjProva();
        },
        ExcluirProva(prova) {
            this.AlunosArray.forEach(aluno => {
                this.AlunosRef
                    .child(aluno.id)
                    .child("notas")
                    .child(prova.id).remove();
            });
            this.ProvaRef.child(prova.id).remove();
        },
        EditarProva(prova) {
            this.objProva = Object.assign({},prova);
            $('#selectPeso').val(this.objProva.peso);
            $('#selectPeso').formSelect();
        },
        UpdateProva() {
            console.log("antes update");
            var thisnota = 0;
            var prova_id = this.objProva.id;
            delete this.objProva.id;
            //this.objProva.notas=[];
            console.log(Array.isArray(this.objProva.notas));
            console.log(this.objProva.notas[0]);
            
            this.AlunosArray.forEach(aluno => {
                /*
                const Nota = this.objProva.notas.find(
                    prova => true
                );
                */
                /*
                for (var i=0; i < this.objProva.notas.length; i++) {
                    if (this.objProva.notas[i].id_aluno === aluno.id) {

                        thisnota = this.objProva.notas[i].nota
                        console.log("thisnota -> "+thisnota);
                    }
                }
                */
                for (var fornota in this.objProva.notas) {
                    console.log("fornota.id_aluno === aluno.id -> "+ (this.objProva.notas[fornota].id_aluno === aluno.id));
                    console.log("fornota.id_aluno -> "+ (fornota.id_aluno));
                    console.log("fornota -> "+ (this.objProva.notas[fornota].id_aluno));
                    console.log("aluno.id -> "+ (aluno.id));
                    
                    if (this.objProva.notas[fornota].id_aluno === aluno.id) {

                        thisnota = this.objProva.notas[fornota].nota;
                        console.log("thisnota -> "+ fornota);
                    }

                }
                //console.log("thisnota -> "+thisnota);
                console.log("this.objProva.notas.length -> "+this.objProva.notas.length);
               //console.log(Array.isArray(this.objProva.notas));
                this.AlunosRef
                    .child(aluno.id)
                    .child("notas")
                    .child(prova_id)
                    .set({
                        prova: this.objProva.nome,
                        peso:  this.objProva.peso,
                        //nota:  Object.assign({},objProva.notas)
                        //nota:  this.objProva.nota
                        nota:  thisnota
                    });
                
            });

            //this.objProva.notas.forEach(nota => {
            //    nota.nota=7.644;
            //});
            this.ProvaRef.child(prova_id)
                .update(this.objProva);
            console.log("depois update");    
            this.ResetObjProva();
        },

        AtribuirNota() {
            //this.modalNota = Object.assign({},this.objProva.notas);
            //this.modalNota = this.objProva.notas.slice(0);
            this.modalNota = JSON.parse(JSON.stringify(this.objProva.notas));
        },
        EditarNota(nota){
            this.editNota = nota;
            this.novaNota = nota.nota;
        },
        UpdateNota() {
            this.objProva.notas = Object.assign({},this.modalNota);

            this.UpdateProva();
        },


        SortByDate() {
            this.ProvaArray.sort(function(a, b) {
                if (a.data > b.data) return 1;
                if (a.data < b.data) return -1;
                return 0;
            });
        },
        SortByCode() {
            var bool = this.codeOrdem;

            this.objProva.notas.sort(function(a,b){
                if (a.codigo > b.codigo) return bool;
                if (a.codigo < b.codigo) return !bool;
                return 0;
            });
        },
        SortByNome() {
            var bool = this.nomeOrdem;

            this.objProva.notas.sort(function(a,b){
                if (a.nome_aluno.toUpperCase() > b.nome_aluno.toUpperCase()) return bool;
                if (a.nome_aluno.toUpperCase() < b.nome_aluno.toUpperCase()) return !bool;
                return 0;
            });

        },

        FiltroPorMes(prova) {
            if(this.filtroMes==0) return true;
            if(this.filtroMes==moment(String(prova.data)).format('MM')) return true;

            return false;
        },
        FiltroPorPesquisa(prova) {
            return prova.nome.toUpperCase().indexOf(this.pesquisa.toUpperCase()) !== -1 || this.pesquisa==='';
        }
    },
    created(){
        this.ProvaRef.on("value", snapshot => {
            this.loading = false;
        });

        
        this.ProvaRef.on('child_added', snapshot => {
            this.ProvaArray.push({...snapshot.val(), id:snapshot.key});
            this.SortByDate();
        });

        this.ProvaRef.on('child_removed', snapshot => {
            const Prova = this.ProvaArray.find(
                prova => prova.id === snapshot.key
            );
            const index = this.ProvaArray.indexOf(Prova);

            this.ProvaArray.splice(index, 1);
        });

        this.ProvaRef.on("child_changed", snapshot => {
            const Prova = this.ProvaArray.find(
                prova => prova.id === snapshot.key
            );

            Prova.id = snapshot.key;
            Prova.data = snapshot.val().data;
            Prova.nome = snapshot.val().nome;
            Prova.peso = snapshot.val().peso;
            Prova.notas = snapshot.val().notas;

            this.SortByDate(); 
            
        });

         
        
    }
}
</script>
<style>
.modal { width: 75% !important ; max-height: 100% !important }
.modal tbody {
    display:block;
    height:320px;
    overflow:auto;
}
.modal thead, .modal tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}
.modal thead {
    width: calc( 100% - 1em )
}
.modal table {
    width:100%;
}
</style>

