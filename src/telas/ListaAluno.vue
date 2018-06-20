<template>
    <div>

        
        <div v-if="loading" class="progress center blue">
            <div class="indeterminate"></div>
        </div>
        <div v-else>

            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text"  v-model="pesquisa">
                    <label for="icon_prefix">Aluno ou Codigo</label>
                    
                </div>
                <a v-if=false class=" btn-flat blue-text valign-wrapper " @click="pesquisa=''"><i class="material-icons ">clear</i></a>
            </div>

            <div class="responsive-table table-status-sheet">
                <table id="tabelaNotas" class="highlight">
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
                                <a class="btn-floating  btn-small modal-trigger " :class="[color]" href="#modal3" data-position="bottom" data-tooltip="PRESENÇA"  @click="EditarAluno(aluno); AtribuirPresenca(); " ><i class="material-icons">assignment_turned_in</i></a>
                                <a class="btn-floating  btn-small modal-trigger " :class="[color]" href="#modal2" data-position="bottom" data-tooltip="NOTAS"     @click="EditarAluno(aluno); AtribuirNota()"   ><i class="material-icons">exposure_plus_1</i></a>
                                <a class="btn-floating  btn-small modal-trigger " :class="[color]" href="#modal1" data-position="bottom" data-tooltip="EDITAR"    @click="EditarAluno(aluno)"><i class="material-icons">edit</i></a>
                                <a class="btn-floating  btn-small modal-trigger " :class="[color]" href="#modal4" data-position="bottom" data-tooltip="EXCLUIR"   @click="EditarAluno(aluno)"><i class="material-icons">delete</i></a>
                                
                            </td>

                            
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="fixed-action-btn">
                <a class="btn-floating btn-large red modal-trigger" href="#modal1" @click="ResetObjAluno()"> <i class="large material-icons">add</i></a>
            </div>
        </div>

            <div id="modal1" class="modal" @keyup.enter="ValidarAluno()">
                <div class="modal-content row">
                    <div class="input-field col s3">
                        <input id="last_name" placeholder="CODIGO DO ALUNO" type="text" v-model="objAluno.codigo" autofocus required class=" active">
                        <label class="active" for="last_name">Codigo do Aluno *</label>
                    </div>
                    <div class="input-field col s9">
                        <input id="last_name" placeholder="NOME DO ALUNO" type="text" v-model="objAluno.nome" autofocus required class=" active">
                        <label class="active" for="last_name">Nome do Aluno *</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="ResetObjAluno()">CANCELAR</button>
                    <button class="btn modal-action  green" @click="ValidarAluno()">
                        <a class="white-text" v-if="objAluno.id === ''">INCLUIR</a> 
                        <a class="white-text" v-else>EDITAR</a> 
                    </button>
                </div>
            </div>

            <div id="modal2" class="modal modal-fixed-footer" @keyup.enter="UpdateNota()">
                <div>
                    <div class="modal-content">
                        <h4>{{objAluno.nome}} - Notas </h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Prova</th>
                                    <th>Peso</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(prova,key, index) in modalNota">
                                    <td>{{prova.prova}}</td>
                                    <td>{{prova.peso}}0%</td>
                                    <td>
                                        
                                        <div v-if="(prova !== editNota)">
                                            {{prova.nota | formatNota}} 
                                            <a class="btn-floating  btn-small"  href="#!" @click="EditarNota(prova, index)"><i class="material-icons">edit</i></a>
                                        </div>
                                        <div v-else class="row">
                                            <input :id="'input_nota'+index" :ref="'input_nota'+index" :autofocus=true @keyup.enter.stop="ValidarNota(index)" v-model="novaNota" type="text" class=" col s2">
                                            <a class="btn-floating  btn-small" href="#!" @click="prova.nota=Number(novaNota);editNota=null;CalcularMedia();"><i class="material-icons">done</i></a>
                                            <a class="btn-floating  btn-small" href="#!" @click="editNota=null"><i class="material-icons">clear</i></a>
                                        </div>
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer ">
                    <div class="left"> <h4 >Média: {{media | formatNota}} </h4> </div>
                    <button class="btn modal-action modal-close red" @click="modalNota=null;">CANCELAR</button>
                    <button class="btn modal-action modal-close green" @click="UpdateNota()">EDITAR</button>
                </div>
            </div>

            <div id="modal3" class="modal modal-fixed-footer" @keyup.enter="UpdatePresenca();">
                <div>
                    <div class="modal-content">
                        <h4>{{objAluno.nome}} - Presença</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Dia </th>
                                    <th>Presença</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="presenca in modalPresenca">
                                    <td>{{presenca.data | formatDate}}</td>
                                    <td>
                                        <label>
                                            <input type="checkbox" v-model="presenca.presenca"  class="filled-in"/>
                                            <span></span>
                                        </label>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer ">
                    <h4 class="left">Porcentagem: {{porcetagemPre | formatNota}}% </h4>
                    <button class="btn modal-action modal-close red" @click="modalPresenca=null">CANCELAR</button>
                    <button class="btn modal-action modal-close green" @click="UpdatePresenca()">EDITAR</button>
                </div>
            </div>

            <div id="modal4" class="modal" @keyup.enter="ExcluirAluno(objAluno); ">
                <div class="modal-content">
                    <h5>Deseja excluir o aluno <strong style="font-weight:bold">{{objAluno.nome}}</strong> ?  </br> Essa ação irá excluir notas e presenças!</h5>
                </div>
                <div class="modal-footer">
                    <button class="btn modal-action modal-close red" @click="ResetObjAluno()">CANCELAR</button>
                    <button class="btn modal-action green " @click="ExcluirAluno(objAluno)">EXCLUIR</button>
                    
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
            'TurmaAtual',
            'Setor'
        ]),
        ...mapGetters([
            'TurmaAtual'
        ])
    },

    beforeCreate() {
        this.$store.commit("Setor","aluno");
        if (this.$store.getters.TurmaAtual==null){  
            this.$store.commit("TurmaAtual",{id: this.$route.params.id });
            

        }
    },
    
    updated: function() {
        // Jquery para o modal
        $(document).ready(function() {
            console.log("update");
            //$(".collapsible").collapsible();
            //$('.tooltipped').tooltip();
            //$('select').formSelect();
            //$(".modal").modal();
        });
    },
    mounted: function() {
        // Jquery para o modal
        $(document).ready(function() {
            console.log("mounted");
            $(".collapsible").collapsible();
            $(".modal").modal();
            $(document).on("shown.bs.modal", function(e) {
                $("[autofocus]", e.target).focus();
            });
            //console.log($(".collapsible").collapsible());
        });

        
    },
    data () {
        return {
            loading: true,
            pesquisa:'',
            color:'blue',
            colorText:'blue-text',
            codeOrdem: true,
            nomeOrdem: true,

            media:0,
            porcetagemPre:0,

            AlunosRef:Database.ref("alunos/"+this.$store.getters.TurmaAtual.id),
            AlunosArray:[],
            objAluno:{
                id:'',
                codigo:'',
                nome:'',
                notas: [],
                presencas: []
            },
            EditingAluno: null,

            // Carregando Provas
            ProvasRef: Database.ref("provas").child(this.$store.getters.TurmaAtual.id),
            ProvasArray:[],

            modalNota: null,
            editNota: null,
            novaNota:0,

            PresencaRef: Database.ref("presenca").child(this.$store.getters.TurmaAtual.id),
            PresencaArray:[],
            
            
            modalPresenca: null,

            alunosCountLocal:this.$store.getters.TurmaAtual.alunosCount,

            oldCodigo:"0"
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
            return isNaN(val) ? 0 : parseFloat(val.toFixed(2));
        }
    },
    watch:{
        codeOrdem: function (val) {
            this.SortByCode();
            
        },
        nomeOrdem: function (val) {
            this.SortByName();
            
        },
        loading: function (val) {
            console.log("watch ALUNO - "+val);
            //$(".modal").modal();
            M.AutoInit( );
            
        }
    },
    methods: {
        ResetObjAluno() {
            this.objAluno={
                id:'',
                codigo:'',
                nome:'',
                notas:[],
                presencas:[]
            };
            this.media=0
        },

        // ALUNO
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

            this.PresencaArray.forEach(presenca => {
                this.objAluno.presencas[presenca.id] = {
                    data: presenca.data,
                    presenca: false
                }
            })

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

            this.PresencaArray.forEach(presenca => {
                this.PresencaRef
                    .child(presenca.id)
                    .child("presencas")
                    .child(aluno_id)
                    .set({
                        codigo: this.objAluno.codigo,
                        nome_aluno:  this.objAluno.nome,
                        presenca: false
                    })
            });


            this.ResetObjAluno();
            console.log("inserido com sucesso");

            Database.ref("turmas/"+ this.$store.getters.TurmaAtual.id).child("alunosCount").set(
                this.alunosCountLocal + 1
            );
            this.alunosCountLocal++;
            M.toast({html: 'Aluno Criado'})
        },
        ExcluirAluno(aluno) {

            this.ProvasArray.forEach(prova => {
                this.ProvasRef
                    .child(prova.id)
                    .child("notas")
                    .child(aluno.id).remove()
            });

            this.PresencaArray.forEach(presenca => {
                this.PresencaRef
                    .child(presenca.id)
                    .child("notas")
                    .child(aluno.id).remove()
            });


            Database.ref("turmas/"+ this.$store.getters.TurmaAtual.id).child("alunosCount").set(
                this.alunosCountLocal - 1
            );
            this.alunosCountLocal--;
            this.AlunosRef.child(aluno.id).remove();
            $("#modal4").modal("close");
            M.toast({html: 'Aluno Excluido'})
            
        },
        EditarAluno(aluno) {
            //this.media=0;
            this.objAluno = Object.assign({},aluno);
            this.oldCodigo=this.objAluno.codigo;
            console.log(this.objAluno.nome);
            //console.log(this.media);
            
            this.CalcularMedia();
            this.CalcularPresenca();
            console.log(this.media);

            //this.objAluno.notas.forEach(nota => {
            //    this.media=10//nota.nota*(nota.peso/10);
            //});
            
            console.log("Editar Aluno");
            //console.log(this.objAluno);
        },
        UpdateAluno(){
            console.log("Update Aluno");

            var thisNota = 0;
            var id = this.objAluno.id;
            delete this.objAluno.id;

            var thisPresenca = 0;

            this.ProvasArray.forEach(prova => {
                for (var fornota in this.objAluno.notas) {
                    if(fornota === prova.id) {
                        thisNota = this.objAluno.notas[fornota].nota;
                        break;
                    }
                }

                this.ProvasRef
                    .child(prova.id)
                    .child("notas")
                    .child(id)
                    .set({
                        codigo: this.objAluno.codigo,
                        nome_aluno:  this.objAluno.nome,
                        nota: thisNota
                    });
            });

            this.PresencaArray.forEach(presenca => {
                for(var forpresenca in this.objAluno.presencas) {
                    if(forpresenca === presenca.id){
                        thisPresenca = this.objAluno.presencas[forpresenca].presenca;
                        break;
                    }
                }


                this.PresencaRef
                    .child(presenca.id)
                    .child("presencas")
                    .child(id)
                    .set({
                        codigo: this.objAluno.codigo,
                        nome_aluno:  this.objAluno.nome,
                        presenca: thisPresenca
                    })
            });


            //console.log(this.objAluno);
            this.AlunosRef.child(id)
                .update(this.objAluno);
            
            this.ResetObjAluno();
             M.toast({html: 'Aluno Editado'});
        },
        ValidarAluno() {
            var mensagem=[];
            var valido=false;
            if (this.objAluno.codigo=="") mensagem.push("Codigo Vazio");
            if (this.objAluno.nome=="") mensagem.push("Nome Vazio");

            const Aluno = this.AlunosArray.find(
                aluno => aluno.codigo===this.objAluno.codigo
            );

            if ((Aluno!=null && this.objAluno.id==='')) mensagem.push("Codigo já usado");
            if (Aluno!=null) {
                if (Aluno.codigo!==this.oldCodigo) mensagem.push("Codigo já usado");
                 console.log((Aluno.codigo==this.oldCodigo));
                console.log("Aluno.codigo "+(Aluno.codigo));
                console.log("this.oldCodigo "+(this.oldCodigo));
            }
           
            

            if(mensagem.length>0){
                for (var i=0; i<mensagem.length; i++) {
                    M.toast({html: mensagem[i]})
                }
            }
            else {
                if (this.objAluno.id==='') this.InserirAluno();
                else this.UpdateAluno();
                $("#modal1").modal("close");
                this.oldCodigo="";
            }

           
            
        },  

        // NOTA
        AtribuirNota() {
            this.modalNota = JSON.parse(JSON.stringify(this.objAluno.notas));
            this.CalcularMedia();
        },
        EditarNota(nota,index) {
            this.editNota = nota;
            this.novaNota = nota.nota;
            this.CalcularMedia();
            $("#input_nota"+index).focus();
            document.getElementById("input_nota"+(index)).focus();
        },
        UpdateNota() {
            M.toast({html: 'Update Nota'});
            this.objAluno.notas = Object.assign({},this.modalNota);
            this.UpdateAluno();
             $("#modal2").modal("close");
        },
        ValidarNota(index) {
            var mensagem=[];
            M.toast({html: 'TESTE'});
            if (this.novaNota=="") this.novaNota=0;
            if (isNaN(this.novaNota)) mensagem.push("Não é numero!");

            if (mensagem.length>0){
                for (var i=0; i<mensagem.length; i++) {
                    M.toast({html: mensagem[i]})
                }
            }
            else{
                this.modalNota[Object.keys(this.modalNota)[index]].nota = Number(this.novaNota);
                this.editNota=null;
                this.CalcularMedia();
                //this.EditarNota(this.modalNota[Object.keys(this.modalNota)[index+1]] ? this.modalNota[Object.keys(this.modalNota)[index+1]] : null);
                if (this.modalNota[Object.keys(this.modalNota)[index+1]]) {
                    this.EditarNota(this.modalNota[Object.keys(this.modalNota)[index+1]]);
                    $("#input_nota"+(index)).focus();
                    document.getElementById("input_nota"+(index)).focus();
                }
                else $("#modal2").focus();
               
            }

            //prova.nota=Number(novaNota);editNota=null;CalcularMedia();
        },

        // PRESENÇA
        AtribuirPresenca() {
            this.modalPresenca = JSON.parse(JSON.stringify(this.objAluno.presencas));
            this.CalcularPresenca();
        },
        UpdatePresenca(){
            this.objAluno.presencas = Object.assign({},this.modalPresenca);
            this.UpdateAluno();
            $("#modal3").modal("close");
            M.toast({html: "Presença Atualizada"});
        },


        // CALCULOS
        CalcularMedia(){
            this.media=0;
            for (var nota in this.modalNota) {
                this.media += this.modalNota[nota].nota * (this.modalNota[nota].peso / 10);
            }
            console.log("Calcular Media -> "+ this.media);
        },
        CalcularPresenca() {
            this.porcetagemPre=0;
            var numPre=0;
            var total=0;
            for (var presenca in this.modalPresenca) {
                if (this.modalPresenca[presenca].presenca==true) numPre++;
                total++;
            }
            this.porcetagemPre=((numPre*100)/total);
            
        },

        // SORT
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
        if (this.$store.getters.TurmaAtual.nome==null){  
            var a = this.$route.params.id;
            Database.ref("turmas").child(a).once("value", snapshot => {    
                this.$store.commit("TurmaAtual",{...snapshot.val(), id: snapshot.key });
            });   
        }
        

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
            AlunoEditado.notas = snapshot.val().notas;
            AlunoEditado.presencas = snapshot.val().presencas
            //AlunoEditado=Object.assign({},snapshot.val());
            this.codeOrdem=true;
            //this.SortByCode();
            //const index = this.escolasArray.indexOf(EscolaEditada)
            //this.escolasArray.splice(index, 1,"snapshot.val().nome");
        });

        // PopularAray de provas com a referencia
         Database.ref("provas/"+this.$store.getters.TurmaAtual.id).on('child_added', snapshot => {
             this.ProvasArray.push({
                 id: snapshot.key,
                 prova: snapshot.val().nome,
                 peso: snapshot.val().peso
                 //nota: snapshot.val().nota
             })
         });

         Database.ref("presenca").child(this.$store.getters.TurmaAtual.id).on('child_added', snapshot => {
            this.PresencaArray.push({...snapshot.val(), id:snapshot.key});
            this.PresencaArray.sort(function(a, b) {
                if (a.data > b.data) return 1;
                if (a.data < b.data) return -1;
                return 0;
            });
            
        });
    }
}
</script>
<style>

.modal { width: 55% !important ; max-height: 100% !important;}
#modal1 { width: 55% !important ; max-height: 100% !important }
#modal4 { width: 50% !important ; max-height: 100% !important }
#modal2 { width: 55% !important ; max-height: 100% !important; }
#modal3 { width: 55% !important ; max-height: 100% !important;}



.modal-content {
    overflow-y: hidden !important;

}
.modal tbody {
    display:block ;
    max-height:40vh;
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

#modal1 {
     overflow:visible !important;
}
</style>