<template>
    <div>

        <ul id="slide-out" class="sidenav sidenav-fixed">
            <li> 
                <div class="user-view">
                    <div class="background blue" >   
                        <img style="" src="../img/img1.jpg"> 
                    </div>
                    <div class="valign-wrapper">
                        <h1>
                            <h5>
                            <router-link to="/">
                            <img style="width:100%" src="../img/logo.png">
                            </router-link>
                        </h5></h1>
                    </div>
                    <a href="#name"><span class="white-text name"></span></a>
                    
                </div>
            </li>
            <li><router-link to="/"                                                                         data-target="slide-out" class="sidenav-close" :class="GetColor(null)"           > <i class="material-icons" :class="GetColor(null)">home</i>Home</router-link> </li>
            <li><router-link to="/escola"                                                                   data-target="slide-out" class="sidenav-close" :class="GetColor('escola')"       > <i class="material-icons" :class="GetColor('escola')">school</i>Escola</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+''"                data-target="slide-out" class="sidenav-close" :class="GetColor('turma')"        > <i class="material-icons" :class="GetColor('turma')">group</i>{{TurmaAtual.nome}} {{TurmaAtual.disciplina}} </router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/alunos'"         data-target="slide-out" class="sidenav-close" :class="GetColor('aluno')"        > <i class="material-icons" :class="GetColor('aluno')">person</i>Alunos</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/planejamento'"   data-target="slide-out" class="sidenav-close" :class="GetColor('planejamento')" > <i class="material-icons" :class="GetColor('planejamento')">event</i>Planejamento</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/provas'"         data-target="slide-out" class="sidenav-close" :class="GetColor('prova')"        > <i class="material-icons" :class="GetColor('prova')">style</i>Provas</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/presencas'"      data-target="slide-out" class="sidenav-close" :class="GetColor('presenca')"     > <i class="material-icons" :class="GetColor('presenca')">done</i>Presença</router-link></li>
        </ul>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                "TurmaAtual",
                "Setor"
            ])
        },
         beforeCreate() {
        },
        beforeUpdate: function() {
            // Jquery para o modal
            $(document).ready(function() {
                 $('.sidenav').sidenav();
            });
        },
        mounted: function() {
            // Jquery para o modal
            $(document).ready(function() {
                $('.sidenav').sidenav();
                //console.log($(".collapsible").collapsible());
            });

        },
        watch: {
            
        },
        data () {
            return {
                Setor:this.$store.getters.Setor,
                ColorB:'blue',
                VueClasse:{

                }
            }
        },
        methods : {
            GetColor(path) {
                return {'blue-text': this.$store.getters.Setor===path};
            }
        },
        created(){
            switch(this.Setor) {
                case "escola":
                    
                    break;
                case "aluno":
                    
                    break;
                case "planejamento":
                    
                    break;
                case "prova":
                    
                    break;
                case "presenca":
                    
                    break;
                default:
                    
            }
        }
    }
    
</script>
<style>

</style>
