<template>
   <section class="row controls">
            <div class="small-12 columns">
                <button id="attack" @click="at">ATTACK</button>
                <button id="special-attack" @click="sat">SPECIAL ATTACK</button>
                <button id="heal" @click="hl">HEAL</button>
                <button id="give-up" @click="gu">GIVE UP</button>
            </div>
        </section>
</template>

<script>
export default {

	methods:{
		at(){
			this.$emit('AT');
		},
		sat(){
			this.$emit('SAT');
		},
		hl(){
			this.$emit('HL');
		},
		gu(){
			this.$emit('GU');
		},
	}

}
</script>


<style scoped>
button {
    font-size: 20px;
    background-color: #eee;
    padding: 12px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
}

</style>
