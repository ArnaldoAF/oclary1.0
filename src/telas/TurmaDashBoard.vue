<template>
    <div >
        <router-link v-if="false" class="btn-floating blue" to="/escola" ><i class="material-icons">arrow_back</i></router-link>

        <div v-if="loading" class="progress center">
            <div class="indeterminate"></div>
        </div>
        <div v-else class="">
        <div class="card-panel blue lighten-5">
            <div class="card-panel">
            <h5> Turma : {{objTurma.nome}} </h5> 
            <h5> Disciplina : {{objTurma.disciplina}} </h5>
            </div>

            <div class="row">
                <div class="col s12 m6">
                    <div class="card-panel">
                        <i class="material-icons ">person</i> Numero de Alunos: <span class="new badge blue"  data-badge-caption=""> {{objTurma.alunosCount}} </span> <br>
                        <i class="material-icons">style</i> Provas: <span class="new badge blue"  data-badge-caption=""> {{ProvaArray.length}} </span>
                        
                    </div>
                </div>
                <div class="col s12 m6">
                    <div class="row card-panel">
                        <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue" :to="'/escola/turma/'+objTurma.id+'/alunos'"><i class="material-icons">person</i></router-link> </div>
                        <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue " :to="'/escola/turma/'+objTurma.id+'/planejamento'"><i class="material-icons">event</i></router-link></div>
                        <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue " :to="'/escola/turma/'+objTurma.id+'/provas'"><i class="material-icons">style</i></router-link></div>
                        <div class="col s3 center-align"> <router-link class="btn-floating s3 btn-large blue " :to="'/escola/turma/'+objTurma.id+'/presencas'"><i class="material-icons">done</i></router-link></div>
                    </div>
                </div>
            </div>

            <div class=" row">
                <div class="row " v-if="false">
                <div class="col s6">
                    <ul class="collection">
                        <li class="collection-header"> <h5>Próximos Plajamentos</h5>  </li>
                        <li class="collection-item" v-for="planejamento in PlanejamentoArray" v-if="!planejamento.aplicado">
                            <div>
                            {{planejamento.data}}
                            {{planejamento.conteudo}}
                            <a class="btn-floating  blue btn-small right secondary-content valign-wrapper" href="#!" @click="planejamento.aplicado=!planejamento.aplicado; Marcar(planejamento)">
                                <i class="material-icons ">check</i>
                            </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col s6">
                    <ul class="collection">
                        <li class="collection-header"> <h5>Próximos Provas</h5>  </li>
                        <li class="collection-item" v-for="prova in ProvaArray">
                            <div>
                            <strong> {{prova.data |formatDate}} </strong>
                            {{prova.nome}}
                            
                            </div>
                        </li>
                    </ul>
                </div>
                </div>

                <div class="row " v-else>
                <div class="col s12 m6">
                    <div class="card-panel">
                    <table class="striped">
                        <h5>Próximos Plajamentos</h5> 
                        <tbody>
                            <tr v-for="planejamento in PlanejamentoArray" v-if="!planejamento.aplicado">
                                <td>
                                    <span class="new badge blue" data-badge-caption=""> 
                                        {{planejamento.data | formatDate}} 
                                    </span>
                                    {{planejamento.conteudo}}
                                </td>
                                <td>
                                <a class="btn-floating  blue btn-small secondary-content" href="#!" @click="planejamento.aplicado=!planejamento.aplicado; Marcar(planejamento)">
                                    <i class="material-icons ">check</i>
                                </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>

                

                <div class="col s12 m6 ">
                    <div class="card-panel">
                    <table class="striped">
                        <h5>Próximos provas</h5> 
                        <tbody>
                            <tr v-for="prova in ProvaArray" >
                                <td>
                                    <span class="new badge blue" data-badge-caption=""> 
                                        {{prova.data | formatDate}} 
                                    </span>
                                    {{prova.nome}}</td>
                                
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                </div>
        </div>
        </div>
        </div>
    </div>
</template>
<script>

    import Database from "../firebase.js";
    import {mapMutations, mapGetters} from 'vuex';

export default{
    firebase:{},
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
    data () {
        return {
            loading: true,
            idTurma: this.$route.params.id,
            turmaRef: Database.ref("turmas"),
            AlunosRef:Database.ref("alunos/"+this.$store.getters.TurmaAtual.id),
            objTurma: null,

            PlanejamentoRef: Database.ref("planejamento").child(this.$store.getters.TurmaAtual.id),
            PlanejamentoArray:[],

            ProvaRef: Database.ref("provas/"+this.$store.getters.TurmaAtual.id),
            ProvaArray:[]       
                        
        }
    },
    methods: {
        Marcar(planejamento) {
            this.PlanejamentoRef
                .child(planejamento.id)
                .update({aplicado : true});
        }
    },
     filters:{
        formatDate: function(value) {
            if (value) {
                return moment(String(value)).format('DD/MM');
            }
        },
        
    },
    created() {
        if (this.$store.getters.TurmaAtual.nome==null){  
            var a = this.$route.params.id;
            Database.ref("turmas").child(a).once("value", snapshot => {    
                this.$store.commit("TurmaAtual",{...snapshot.val(), id: snapshot.key });
            });   
        }
        //console.log("Turma atual is null = " + (this.$store.getters.TurmaAtual==null));

        this.turmaRef.on("value", snapshot => {
            this.loading = false;
        });
        
        this.turmaRef.orderByKey().equalTo(this.idTurma).on("child_added", snapshot => {
            this.objTurma = {...snapshot.val(), id: snapshot.key };
            this.$store.commit("TurmaAtual",this.objTurma);
        });
        
       
        this.PlanejamentoRef
            .orderByChild("data")
            .startAt(moment().format('YYYY-MM-DD'))
            .endAt(moment().add(7,'days').format('YYYY-MM-DD'))
            .on('child_added', snapshot => {
                this.PlanejamentoArray.push({...snapshot.val(), id: snapshot.key});
                console.log("CHILD_ADDED EVENT");
                console.log(snapshot.val().data);
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
        });

        this.ProvaRef
            .orderByChild("data")
            .startAt(moment().format('YYYY-MM-DD'))
            .endAt(moment().add(7,'days').format('YYYY-MM-DD'))
            .on('child_added', snapshot => {
                this.ProvaArray.push({...snapshot.val(), id:snapshot.key});
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

            
        });


        
        
    }

}

</script>
