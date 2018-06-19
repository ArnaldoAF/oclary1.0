<template>
    <div>

        <div v-if="loading" class="progress center blue">
            <div class="indeterminate"></div>
        </div>
        <div v-else>

            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" class="validate" v-model="pesquisa">
                    <label for="icon_prefix">Conteudo</label>
                </div>

                <div class="input-field col s3">
                    <select v-model="filtroAplicado">
                        <option value="1">Todos</option>
                        <option value="2">Completados</option>
                        <option value="3">Não Completados</option>
                    </select>
                    <label>Filtragem</label>
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

            <div class="responsive-table table-status-sheet">
                <table class="highlight" id="tabelaNotas">
                    <thead>
                        <tr >
                            <th>Data</th>
                            <th>Counteudo</th>
                            <th>Aplicado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="planejamento in PlanejamentoArray" v-if="(FiltroPorAplicacao(planejamento) && FiltroPorMes(planejamento) && FiltroPorPesquisa(planejamento))">
                            <td>{{planejamento.data | formatDate}}</td>
                            <td class="" style="text-overflow:ellipsis; overflow: hidden;">{{planejamento.conteudo }}</td>
                            <td >
                                <i v-if="planejamento.aplicado" class="material-icons green-text">check</i>
                                <i v-else class="material-icons red-text">clear</i>
                                
                            </td>
                            <td class="left">
                                <a class="btn-floating  btn-small modal-trigger" :class="[color]" href="#!" @click="AlterarStatus(planejamento)">
                                    <i v-if="!planejamento.aplicado" class="material-icons ">check</i>
                                    <i v-else class="material-icons ">clear</i>
                                </a>
                                <a class="btn-floating  btn-small modal-trigger" :class="[color]" href="#modal1" @click="EditarPlanejamento(planejamento)"><i class="material-icons">edit</i></a>
                                <a class="btn-floating  btn-small modal-trigger" :class="[color]" href="#modal2" @click="EditarPlanejamento(planejamento)"><i class="material-icons">delete</i></a>
                                
                                
                            </td>

                            
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="fixed-action-btn">
                <a class="btn-floating btn-large red modal-trigger" href="#modal1"> <i class="large material-icons">add</i></a>
            </div>
        </div>

            <div id="modal1" class="modal" @keyup.enter="ValidarPlanejamento()">
                <div class="modal-content row ">

                    <div class="input-field col s6">
                        <input id="data" placeholder="DATA" type="date" v-model="objPlanejamento.data" autofocus required class="datepicker active">
                        <label class="active" for="data">DATA</label>
                    </div>
                    

                    <div class="input-field col s12">
                        <textarea id="conteudo" placeholder="CONTEUDO" @keyup.enter.stop="" v-model="objPlanejamento.conteudo" autofocus required class=" active materialize-textarea"></textarea>
                        <label class="active" for="conteudo">Conteúdo</label>
                    </div>

                    
                    
                    <label class="col s12 center ">
                        <input type="checkbox" class="filled-in valign-wrapper "  v-model="objPlanejamento.aplicado"/>
                        <span>Aplicado</span>
                    </label>
                    
                    

                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="ResetObjPlanejamento()">CANCELAR</button>
                    <button class="btn modal-action  green" @click="ValidarPlanejamento()">
                        <a class="white-text" v-if="objPlanejamento.id === ''">INCLUIR</a> 
                        <a class="white-text" v-else>EDITAR</a> 
                    </button>
                </div>
            </div>

            <div id="modal2" class="modal" @keyup.enter="ExcluirPlanejamento(objPlanejamento)">
                <div class="modal-content">
                    <h5>Deseja excluir o planejamento do dia {{objPlanejamento.data | formatDate}} ?</h5>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="ResetObjPlanejamento()">CANCELAR</button>
                    <button class="btn modal-action green" @click="ExcluirPlanejamento(objPlanejamento)">EXCLUIR</button>
                    
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
    beforeCreate() {
        this.$store.commit("Setor","planejamento");
        if (this.$store.getters.TurmaAtual==null){  
            this.$store.commit("TurmaAtual",{id: this.$route.params.id });
        }
    },
     beforeUpdate: function() {
        // Jquery para o modal
        $(document).ready(function() {
            $('select').formSelect();
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
            loading: true,
            color:'blue',
            colorText:'blue-text',

            pesquisa:'',
            filtroAplicado:1,
            filtroMes:0,

            PlanejamentoRef: Database.ref("planejamento/"+this.$store.getters.TurmaAtual.id),
            PlanejamentoArray:[],
            objPlanejamento:{
                id:'',
                data:'',
                conteudo:'',
                aplicado:false
            },

            oldData:""
        }
    },
    watch:{
        filtroAplicado: function (val){

        }
    },
    filters:{
        formatDate: function(value) {
            if (value) {
                return moment(String(value)).format('DD/MM');
            }
        },
        truncate: function(text,stop,clamp) {
            return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '');
        }
    },
    methods:{
        ResetObjPlanejamento() {
            //console.log($('#data').datepicker('toString'));
            this.objPlanejamento={
                id:'',
                data:'',
                conteudo:'',
                aplicado:false
            }
            
        },

        // CRUD
        InserirPlanejamento() {
            console.log(this.objPlanejamento.data);
            delete this.objPlanejamento.id;
            this.PlanejamentoRef.push(this.objPlanejamento);
            console.log(this.objPlanejamento.data);
            this.ResetObjPlanejamento();
            M.toast({html: 'Planejamento Inserido'});
        },
        ExcluirPlanejamento(planejamento) {
            this.PlanejamentoRef.child(planejamento.id).remove();
            $("#modal2").modal("close");
            M.toast({html: 'Planejamento Excluido'});
        },
        EditarPlanejamento(planejamento) {
            this.objPlanejamento = Object.assign({},planejamento);
            this.oldData = this.objPlanejamento.data;
        },
        UpdatePlanejamento() {
            console.log("antes update");
            var id = this.objPlanejamento.id;
            delete this.objPlanejamento.id;
            this.PlanejamentoRef.child(id)
                .update(this.objPlanejamento);
            console.log("depois update");
            this.ResetObjPlanejamento();
            M.toast({html: 'Planejamento Atualizado'});
        },
        AlterarStatus(planejamento) {
            planejamento.aplicado=!planejamento.aplicado; 
            this.EditarPlanejamento(planejamento); 
            this.UpdatePlanejamento(); 
            //M.toast({html: 'Planejamento Atualizado'})
        },
        ValidarPlanejamento() {
            var mensagem = [];

            if (this.objPlanejamento.data === "") mensagem.push("Preencha Data!");

            const Plan = this.PlanejamentoArray.find(
                plan => plan.data === this.objPlanejamento.data
            );
            console.log("Plan!=null = "+ (Plan!=null));

            if (Plan!=null) {
                if(this.objPlanejamento.id==='') mensagem.push("Data já existente!");
                else if(Plan.data !== this.oldData) mensagem.push("Data já existente!");
                
                console.log("this.objPlanejamento.id==='' = "+ (this.objPlanejamento.id===''));
                console.log("Plan.data !== this.oldData = "+ (Plan.data !== this.oldData));
            }


            if(mensagem.length>0){
                for (var i=0; i<mensagem.length; i++) {
                    M.toast({html: mensagem[i]})
                }
            }
            else{
                if (this.objPlanejamento.id==="") this.InserirPlanejamento();
                else this.UpdatePlanejamento();
                console.log("this.objPlanejamento.id==='' = "+ (this.objPlanejamento.id===''));
                
                $("#modal1").modal("close");
                this.oldData="";
            }
        },

        // SORT
        SortByDate() {
            
            this.PlanejamentoArray.sort(function(a,b) {
                if (a.data > b.data) return 1;
                if (a.data < b.data) return -1;
                return 0;
            });
            
        },

        // FILTROS 
        FiltroPorAplicacao(planejamento) {
            if (this.filtroAplicado==2 ) {
                if (planejamento.aplicado == true) return true;
                return false;
            }
            if (this.filtroAplicado==3) {
                if (planejamento.aplicado == false) return true;
                return false;
            }
            
            return true;
        },
        FiltroPorMes(planejamento) {
            
            if(this.filtroMes==0) return true;
            if(this.filtroMes==moment(String(planejamento.data)).format('MM')) return true;
            
            return false;

        },
        FiltroPorPesquisa(planejamento) {
            return planejamento.conteudo.toUpperCase().indexOf(this.pesquisa.toUpperCase())!==-1 || this.pesquisa==='';
        }
    },
    created() {
        if (this.$store.getters.TurmaAtual.nome==null){  
            var a = this.$route.params.id;
            Database.ref("turmas").child(a).once("value", snapshot => {    
                this.$store.commit("TurmaAtual",{...snapshot.val(), id: snapshot.key });
            });   
        } 
        
        this.PlanejamentoRef.on("value", snapshot => {
            this.loading = false;
            
        });

        this.PlanejamentoRef.on('child_added', snapshot => {
            this.PlanejamentoArray.push({...snapshot.val(), id: snapshot.key});
            console.log("CHILD_ADDED EVENT");
            this.SortByDate();
            
            
        });

        this.PlanejamentoRef.on('child_removed', snapshot => {
            const Planejamento = this.PlanejamentoArray.find(
                planejamento => planejamento.id === snapshot.key
            );
            console.log("CHILD_REMOVED EVENT");
            const index = this.PlanejamentoArray.indexOf(Planejamento);
            
            this.PlanejamentoArray.splice(index, 1);
        });

        this.PlanejamentoRef.on("child_changed", snapshot => {
            const Planejamento = this.PlanejamentoArray.find(
                plan => plan.id === snapshot.key 
            );
            console.log("Planejamento == null  =  "+ (Planejamento == null));
            console.log("CHILD_CHANGED EVENT");
            
            Planejamento.id = snapshot.key;
            Planejamento.data = snapshot.val().data;
            Planejamento.conteudo = snapshot.val().conteudo;
            Planejamento.aplicado = snapshot.val().aplicado;
            //AlunoEditado=Object.assign({},snapshot.val());
            this.SortByDate();
            //this.SortByCode();
            //const index = this.escolasArray.indexOf(EscolaEditada)
            //this.escolasArray.splice(index, 1,"snapshot.val().nome");
        });


       
    }
}
</script>
