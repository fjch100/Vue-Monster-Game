new Vue({
    el: '#app',
    data: {
        youHealt: 100,
        healthMonster: 100,
        displayNewGame: true,
        minHeal: 5,
        maxHeal: 20,
        actions: [],
        lista: []
    },
    methods: {
        startNewGame: function() {
            this.youHealt = 100;
            this.healthMonster = 100;
            this.displayNewGame = false;
            this.actions = [];
            this.lista = [];
        },
        giveUp: function() {
            this.youHealt = 100;
            this.healthMonster = 100;
            this.displayNewGame = true;
            this.actions = [];
            this.lista = [];
        },
        attack: function(event, input) {
            force = input ? input : 1;
            let attackType = input ? 'special attack' : 'normal attack';
            let youAttack = force * this.healChange();
            let monsterAttack = this.healChange();
            this.youHealt -= monsterAttack;
            this.healthMonster -= youAttack;
            let action = { action: attackType, youAttack, monsterAttack };
            this.actions.unshift(action);
            this.lista.push({ playerDamage: monsterAttack, monsterDamage: youAttack })
            if (this.youHealt <= 0) {
                //you win
                this.youHealt = 0;
                if (confirm('Monster WIN, do you want to continue')) {
                    this.restart();
                }
            };
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
            this.actions.unshift(action);
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
})