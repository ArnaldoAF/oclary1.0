<template>
    <div>
        
        <div v-if="loading" class="progress center blue">
            <div class="indeterminate"></div>
        </div>
        <div v-else>

            <div class="row">
                
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
                <table id="tabelaNotas" class="highlight">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Presença</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="presenca in PresencaArray" v-if="(FiltroPorMes(presenca))">
                            <td>{{presenca.data | formatDate}}</td>
                            <td><a class="btn-small modal-trigger" href="#modal1" @click="EditarPresenca(presenca)">PRESENÇAS</a></td>
                            <td class="left">
                                <a class="btn-floating  btn-small modal-trigger" href="#" @click="ExcluirPresenca(presenca)"><i class="material-icons">delete</i></a>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="fixed-action-btn">
                <a class="btn-floating btn-large  red modal-trigger" href="#modal1" @click="ResetObjPresenca()"> <i class="large material-icons">add</i></a>
            </div>

            <div id="modal1" class="modal">
                <div class="modal-content row">

                    <div class="input-field col s4">
                        <input id="data" placeholder="DATA" type="date" v-model="objPresenca.data"  autofocus required class="datepicker active">
                        <label class="active" for="data">DATA</label>
                    </div>

                    <div class="responsive-table table-status-sheet"> 
                        <table id="tabelaPresenca">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Aluno</th>
                                    <th>Presença</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="presenca in objPresenca.presencas">
                                    <td>{{presenca.codigo}}</td>
                                    <td>{{presenca.nome_aluno}}</td>
                                    <td>
                                        <label>
                                            <input type="checkbox" v-model="presenca.presenca" class="filled-in"/>
                                            <span></span>
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="ResetObjPresenca()">CANCELAR</button>
                    <button class="btn modal-action modal-close green" v-if="objPresenca.id===''" @click="InserirPresenca()">INCLUIR</button>
                    <button class="btn modal-action modal-close green"  v-else @click="UpdatePresenca()">EDITAR</button>
                </div>
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
        this.$store.commit("Setor","presenca");
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
            loading: true,
            pesquisa:'',
            filtroMes:0,

            PresencaRef: Database.ref("presenca").child(this.$store.getters.TurmaAtual.id),
            PresencaArray:[],
            objPresenca:{
                id:'',
                data:'',
                presencas:{}
            },

            // Carregando Alunos
            AlunosRef: Database.ref("alunos").child(this.$store.getters.TurmaAtual.id),
            AlunosArray:[],
        }
    },
    filters: {
        formatDate: function(value) {
            if (value) {
                return moment(String(value)).format('DD/MM');
            }
        }
    },
    methods: {
        ResetObjPresenca() {
            this.objPresenca = {
                id: '',
                data: '',
                presencas:{}
            };
            this.AlunosArray.forEach(aluno => {
                this.objPresenca.presencas[aluno.id] = {
                    codigo: aluno.codigo,
                    nome_aluno: aluno.nome,
                    presenca: false
                }
            }); 
        },
        InserirPresenca() {

            this.AlunosArray.forEach(aluno => {
                this.objPresenca.presencas[aluno.id] = {
                    codigo: aluno.codigo,
                    nome_aluno: aluno.nome,
                    presenca: this.objPresenca.presencas[aluno.id].presenca
                }
            });

            delete this.objPresenca.id;
            var presenca_id = this.PresencaRef.push(this.objPresenca).key;

            this.AlunosArray.forEach(aluno => {
                this.AlunosRef
                    .child(aluno.id)
                    .child("presencas")
                    .child(presenca_id)
                    .set({
                        data:this.objPresenca.data,
                        presenca: this.objPresenca.presencas[aluno.id].presenca
                    });
             });

            this.ResetObjPresenca();
        },
        ExcluirPresenca(presenca) {
            this.AlunosArray.forEach(aluno => {
                this.AlunosRef
                    .child(aluno.id)
                    .child("presencas")
                    .child(presenca.id).remove();
            });
            
            this.PresencaRef.child(presenca.id).remove();
        },
        EditarPresenca(presenca) {
            this.objPresenca = Object.assign({}, presenca);

        },
        UpdatePresenca() {
            
            var presenca_id = this.objPresenca.id;
            delete this.objPresenca.id;

            this.AlunosArray.forEach(aluno => {
                this.AlunosRef
                    .child(aluno.id)
                    .child("presencas")
                    .child(presenca_id)
                    .set({
                        data:this.objPresenca.data,
                        presenca: this.objPresenca.presencas[aluno.id].presenca
                    });
            });


            this.PresencaRef.child(presenca_id)
                .update(this.objPresenca);
            
            this.ResetObjPresenca();
        },

        SortByDate() {
            this.PresencaArray.sort(function(a, b) {
                if (a.data > b.data) return 1;
                if (a.data < b.data) return -1;
                return 0;
            });
        },

        FiltroPorMes(presenca) {
            if(this.filtroMes==0) return true;
            if(this.filtroMes==moment(String(presenca.data)).format('MM')) return true;

            return false;
        },
        FiltroPorPesquisa(presenca) {
            return presenca.data.toUpperCase().indexOf(this.pesquisa.toUpperCase()) !== -1 || this.pesquisa==='';
        }
    },
    created() {
        if (this.$store.getters.TurmaAtual.nome==null){  
            var a = this.$route.params.id;
            Database.ref("turmas").child(a).once("value", snapshot => {    
                this.$store.commit("TurmaAtual",{...snapshot.val(), id: snapshot.key });
            });   
        }
        this.PresencaRef.on("value", snapshot => {
            this.loading = false;
        });

        
        this.PresencaRef.on('child_added', snapshot => {
            this.PresencaArray.push({...snapshot.val(), id:snapshot.key});
            this.SortByDate();
        });

        this.PresencaRef.on('child_removed', snapshot => {
            const Presenca = this.PresencaArray.find(
                presenca => presenca.id === snapshot.key
            );
            const index = this.PresencaArray.indexOf(Presenca);

            this.PresencaArray.splice(index, 1);
        });

        this.PresencaRef.on("child_changed", snapshot => {
            const Presenca = this.PresencaArray.find(
                presenca => presenca.id === snapshot.key
            );

            Presenca.id = snapshot.key;
            Presenca.data = snapshot.val().data;
            Presenca.presencas = snapshot.val().presencas;

            this.SortByDate(); 
            
        });
    }
}
</script>
