<template>
    <div>

        <ul id="slide-out" class="sidenav sidenav-fixed">
            <li> 
                <div class="user-view">
                    <div class="background blue">
                        
                    </div>
                    <h1> OClaRy</h1>
                </div>
            </li>
            <li><router-link to="/" data-target="slide-out" class="sidenav-close" :class="{ 'blue': this.$store.getters.Setor === null }"><i class="material-icons">home</i>Home</router-link> </li>
            <li><router-link to="/escola" data-target="slide-out" class="sidenav-close" :class="{ 'blue': this.$store.getters.Setor === 'escola' }"><i class="material-icons">school</i>Escola</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+''"  data-target="slide-out" class="sidenav-close " :class="{ blue: this.$store.getters.Setor === 'turma' }"> <i class="material-icons">group</i>{{TurmaAtual.nome}} {{TurmaAtual.disciplina}} </router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/alunos'"  data-target="slide-out" class="sidenav-close " :class="{ 'blue': this.$store.getters.Setor === 'aluno' }"> <i class="material-icons">person</i>Alunos</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/planejamento'"  data-target="slide-out" class="sidenav-close" :class="{ 'blue': this.$store.getters.Setor === 'planejamento' }"> <i class="material-icons">event</i>Planejamento</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/provas'"  data-target="slide-out" class="sidenav-close" :class="{ 'blue': this.$store.getters.Setor === 'prova' }"> <i class="material-icons">style</i>Provas</router-link></li>
            <li><router-link v-if="TurmaAtual!=null" :to="'/escola/turma/'+TurmaAtual.id+'/presencas'"  data-target="slide-out" class="sidenav-close " :class="{ 'blue': this.$store.getters.Setor === 'presenca' }"> <i class="material-icons ">done</i>Presença</router-link></li>
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
        created(){
            switch(this.Setor) {
                case "escola":
                    text = "Banana is good!";
                    break;
                case "aluno":
                    text = "Banana is good!";
                    break;
                case "planejamento":
                    text = "I am not a fan of orange.";
                    break;
                case "prova":
                    text = "How you like them apples?";
                    break;
                case "presenca":
                    text = "How you like them apples?";
                    break;
                default:
                    text = "I have never heard of that fruit...";
            }
        }
    }
    
</script>
<style>

</style>
