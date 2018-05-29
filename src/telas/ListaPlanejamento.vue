<template>
    <div>
        Planejamento

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
                    <td class="" style="text-overflow:ellipsis; overflow: hidden;">{{planejamento.conteudo | truncate 5 }}</td>
                    <td >
                        <i v-if="planejamento.aplicado" class="material-icons green-text">check</i>
                        <i v-else class="material-icons red-text">clear</i>
                        
                    </td>
                    <td class="left">
                        <a class="btn-floating  btn-small modal-trigger" href="#modal1" @click="EditarPlanejamento(planejamento)"><i class="material-icons">edit</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" @click="ExcluirPlanejamento(planejamento)"><i class="material-icons">delete</i></a>
                        <a class="btn-floating  btn-small modal-trigger" href="#!" @click="planejamento.aplicado=!planejamento.aplicado; EditarPlanejamento(planejamento); UpdatePlanejamento(); ">
                            <i v-if="!planejamento.aplicado" class="material-icons ">check</i>
                            <i v-else class="material-icons ">clear</i>
                        </a>
                        
                    </td>

                    
                </tr>
            </tbody>
        </table>
        </div>

        <div class="fixed-action-btn">
            <a class="btn-floating btn-large red modal-trigger" href="#modal1"> <i class="large material-icons">add</i></a>
        </div>

        <div id="modal1" class="modal">
            <div class="modal-content">

                <div class="input-field ">
                    <input id="data" placeholder="DATA" type="date" v-model="objPlanejamento.data" autofocus required class="datepicker active">
                    <label class="active" for="data">DATA</label>
                </div>
                
                <div class="input-field ">
                    <textarea id="conteudo" placeholder="CONTEUDO"  v-model="objPlanejamento.conteudo" autofocus required class="validate active materialize-textarea"></textarea>
                    <label class="active" for="conteudo">Conteúdo</label>
                </div>

                <label>
                    <input type="checkbox" class="filled-in"  v-model="objPlanejamento.aplicado"/>
                    <span>Aplicado</span>
                </label>

            </div>
            <div class="modal-footer">
                <button class="btn modal-action modal-close red" @click="ResetObjPlanejamento()">CANCELAR</button>
                <button class="btn modal-action modal-close green" v-if="objPlanejamento.id===''" @click="InserirPlanejamento()">INCLUIR</button>
                <button class="btn modal-action modal-close green" v-else @click="UpdatePlanejamento()">EDITAR</button>
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
        if (this.$store.getters.TurmaAtual==null){  
            this.$store.commit("TurmaAtual",{id: this.$route.params.id });
        }
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
            filtroAplicado:1,
            filtroMes:0,

            PlanejamentoRef: Database.ref("planejamento/"+this.$store.getters.TurmaAtual.id),
            PlanejamentoArray:[],
            objPlanejamento:{
                id:'',
                data:'',
                conteudo:'',
                aplicado:false
            }
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
        InserirPlanejamento() {
            console.log(this.objPlanejamento.data);
            delete this.objPlanejamento.id;
            this.PlanejamentoRef.push(this.objPlanejamento);
            console.log(this.objPlanejamento.data);
            this.ResetObjPlanejamento();
        },
        ExcluirPlanejamento(planejamento) {
            this.PlanejamentoRef.child(planejamento.id).remove();
        },
        EditarPlanejamento(planejamento) {
            this.objPlanejamento = Object.assign({},planejamento);
        },
        UpdatePlanejamento() {
            console.log("antes update");
            var id = this.objPlanejamento.id;
            delete this.objPlanejamento.id;
            this.PlanejamentoRef.child(id)
                .update(this.objPlanejamento);
            console.log("antes update");
            this.ResetObjPlanejamento();
        },

        SortByDate() {
            
            this.PlanejamentoArray.sort(function(a,b) {
                if (a.data > b.data) return 1;
                if (a.data < b.data) return -1;
                return 0;
            });
            
        },

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
                planejamento => planejamento.id === snapshot.key
            );
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
