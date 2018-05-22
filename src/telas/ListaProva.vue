<template>
    <div>

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
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>data</td>
                    <td>prova1</td>
                    <td>
                        <a class="btn-floating  btn-small modal-trigger" href="#modal2" @click=""><i class="material-icons">exposure_plus_1</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" @click=""><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" @click=""><i class="material-icons">delete</i></a>
                        
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large  red modal-trigger" href="#modal1"> <i class="large material-icons">add</i></a>
        </div>

        <div id="modal1" class="modal">
            <div class="modal-content">

                <div class="input-field ">
                    <input id="data" placeholder="DATA" type="date"  v-model="objProva.data" autofocus required class="datepicker active">
                    <label class="active" for="data">DATA</label>
                </div>
                
                <div class="input-field ">
                    <textarea id="conteudo" placeholder="NOME"  v-model="objProva.nome" autofocus required class="validate active materialize-textarea"></textarea>
                    <label class="active" for="conteudo">Nome</label>
                </div>
                

                <div class="input-field col s3">
                    <select v-model="objProva.peso">
                    <option value="0">0</option>
                    <option value="01">10%</option>
                    <option value="02">20%</option>
                    <option value="03">30%</option>
                    <option value="04">40%</option>
                    <option value="05">50%</option>
                    <option value="06">60%</option>
                    <option value="07">70%</option>
                    <option value="08">80%</option>
                    <option value="09">90%</option>
                    <option value="10">100%</option>
                    </select>
                    <label>Por Mês</label>
                </div>
                

            </div>
            <div class="modal-footer">
                <button class="btn modal-action modal-close red" @click="">CANCELAR</button>
                <button class="btn modal-action modal-close green" v-if="true" @click="">INCLUIR</button>
                <button class="btn modal-action modal-close green" v-else @click="UpdatePlanejamento()">EDITAR</button>
            </div>
        </div>

        <div id="modal2" class="modal">
            <div class="modal-content">
                <h1>NOTAS</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th>Codigo</th>
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr><tr>
                            <td>Aluno1</td>
                            <td>001</td>
                            <td>10.0</td>
                        </tr>
                    </tbody>
                </table>
                
                

            </div>
            <div class="modal-footer">
                <button class="btn modal-action modal-close red" @click="">CANCELAR</button>
                <button class="btn modal-action modal-close green" @click="UpdatePlanejamento()">EDITAR</button>
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
            //$('.datepicker').datepicker();
            $('.datepicker').pickadate();
            
            
            // console.log($('.datepicker').datepicker('ToString'));

            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
        });
    },
    data() {
        return {
            loading: false,
            pesquisa:'',
            filtroMes:0,

            ProvaRef: Database.ref("provas/"+this.$store.getters.TurmaAtual.id),
            ProvaArray:[],
            objProva:{
                id:'',
                data:'',
                nome:'',
                peso:'',
                notas:[]
            }
        }
    },
    methods:{
        ResetObjProva() {
            this.objProva={
                id:'',
                data:'',
                nome:'',
                peso:'',
                notas:[]
            }
        },
        InserirProva() {

        },
        ExcluirProva() {

        },
        EditarProva() {

        },
        UpdateProva() {

        },


        SortByDate() {

        },

        FiltroPorMes(prova) {

        },
        FiltroPorPesquisa(prova) {

        }
    },
    created(){
        this.ProvaRef.on("value", snapshot => {
            this.loading = false;
        });

        
        this.ProvaRef.on('child_added', snapshot => {
            
        });

        this.ProvaRef.on('child_removed', snapshot => {

        });

        this.ProvaRef.on("child_changed", snapshot => {

        });

    }
}
</script>
<style>
.modal { width: 75% !important ; max-height: 100% !important }
</style>

