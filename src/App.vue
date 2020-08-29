<template>
  <div id="app">
      <!-- *****  START HEALT BARS ***** --->
        <section class="row">
            <div class="small-6 columns">
                <h1 class="text-center">YOU</h1>
                <div class="healthbar">
                    <div class="healthbar text-center healthYou" :style="{width : youHealt + '%'}">
                        {{youHealt}}
                    </div>
                </div>
            </div>
            <div class="small-6 columns">
                <h1 class="text-center">MONSTER</h1>
                <div class="healthbar">
                    <div class="healthbar text-center healthMonster" :style="{width : healthMonster + '%'}">
                        {{healthMonster}}
                    </div>
                </div>
            </div>
        </section>
        <!-- ***** END HEALT BARS ***** -->
        <!-- *****  START CONTROLS ***** -->
      <transition name="flip" mode="out-in">
          <component :is="ctl" 
          @SNG="startNewGame" 
          @AT="attack" 
          @SAT="specialAttack" 
          @HL="heal"
          @GU="giveUp"></component>
      </transition>

       <!--  <div v-if="displayNewGame">            
        </div>
        <div v-else>       
        </div>
       -->
        <!-- ***** END CONTROLS ***** -->
        <!-- ***** START LOG ACTIONS ***** -->
        <section class="row log" v-if="lista.length>0">
            <div class="small-12 columns">
               
                <ul>
                     <transition-group name="list">
                    <section v-for="(item,index) in lista" :key="index" >
                        <li class="monster-turn">monster hit player for {{item.playerDamage}} damage</li><br>
                        <li class="player-turn">player hit monster for {{item.monsterDamage}} damage </li>
                    </section>
                    </transition-group>
                </ul>
                
            </div>
        </section>
        <!-- ***** END LOG ACTIONS ***** -->
  
  </div>
</template>

<script>
import DisplayNewGame from "./components/DisplayNewGame";
import Controls from "./components/Controls";
export default {
  name: 'app',

  components:{
      appDisplaynewgame:DisplayNewGame,
      appControls:Controls,
  },
 
    data() {
       return {
          youHealt: 100,
          healthMonster: 100,
          displayNewGame: true,
          ctl:'app-displaynewgame',
          minHeal: 5,
          maxHeal: 20,
          actions: [],
          lista: []
       }
    },
    methods: {
        startNewGame: function() {
            this.youHealt = 100;
            this.healthMonster = 100;
            this.displayNewGame = false;
            this.actions = [];
            this.lista = [];
            this.ctl='app-controls';
        },
        giveUp: function() {
            this.youHealt = 100;
            this.healthMonster = 100;
            this.displayNewGame = true;
            this.actions = [];
            this.lista = [];
            this.ctl='app-displaynewgame';
        },
        attack: function(event, input) {
            let force = input ? input : 1;
            let attackType = input ? 'special attack' : 'normal attack';
            let youAttack = force * this.healChange();
            let monsterAttack = this.healChange();
            this.youHealt -= monsterAttack;
            this.healthMonster -= youAttack;
            let action = { action: attackType, youAttack, monsterAttack };
            this.actions.push(action);
            this.lista.push({ playerDamage: monsterAttack, monsterDamage: youAttack })
            if (this.youHealt <= 0) {
                //you win
                this.youHealt = 0;
                if (confirm('Monster WIN, do you want to continue')) {
                    this.restart();
                }
            }
            if (this.healthMonster <= 0) {
                //monster win
                this.healthMonster = 0;
                if (confirm('You WIN, do you want to continue')) {
                    this.restart();
                }
            }
        },
        specialAttack: function() {
            this.attack(null, 2); //especial attack is doble force
        },
        heal: function() {
            this.youHealt += this.healChange();
            if (this.youHealt > 100) {
                this.youHealt = 100;
            }
            let action = { action: 'heal', youHealt: this.youHealt, healthMonster: this.healthMonster };
            this.actions.push(action);
        },
        healChange: function() {
            return (this.minHeal + Math.floor(Math.random() * this.maxHeal));
        },
        restart: function() {
            this.youHealt = 100;
            this.healthMonster = 100;
            this.displayNewGame = false;
            this.actions = [];
            this.lista = [];
        }
    },
}
</script>

<style>

.flip-enter{

}
.flip-enter-active{
    animation: flip-in 0.5s ease-out forwards;
}
.flip-leave{

}

.flip-leave-active{
    animation: flip-out 0.5s ease-out forwards;
}

@keyframes flip-out {
    from{
    transform: rotateY(0deg) ;
    }
    to{
    transform: rotateY(90deg) ;
    }
}

@keyframes flip-in {
    from{
        transform: rotateY(90deg) ;
    }
    to{
        transform: rotateY(0deg) ;
    }
}

li {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.text-center {
    text-align: center;
}

.healthbar {
    width: 80%;
    height: 40px;
    background-color: #eee;
    margin: auto;
    transition: width 500ms;
}

.healthYou {
    background-color: green;
    margin: 0;
    color: white;
}

.healthMonster {
    background-color: green;
    margin: 0;
    color: white;
}

.controls,
.log {
    margin-top: 30px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 3px 6px #ccc;
}

.turn {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 22px;
}

.log ul {
    list-style: none;
    font-weight: bold;
    text-transform: uppercase;
}

.log ul li {
    margin: 5px;
}

.log ul .player-turn {
    color: blue;
    background-color: #e4e8ff;
}

.log ul .monster-turn {
    color: red;
    background-color: #ffc0c1;
}

button {
    font-size: 20px;
    background-color: #eee;
    padding: 12px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
}

#start-game {
    background-color: #aaffb0;
}

#start-game:hover {
    background-color: #76ff7e;
}

#attack {
    background-color: #ff7367;
}

#attack:hover {
    background-color: #ff3f43;
}

#special-attack {
    background-color: #ffaf4f;
}

#special-attack:hover {
    background-color: #ff9a2b;
}

#heal {
    background-color: #aaffb0;
}

#heal:hover {
    background-color: #76ff7e;
}

#give-up {
    background-color: #ffffff;
}

#give-up:hover {
    background-color: #c7c7c7;
}

</style>
