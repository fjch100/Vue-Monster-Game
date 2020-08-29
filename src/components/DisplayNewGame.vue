<template>
  <section class="row controls">
		<div class="small-12 columns">
			<button id="start-game" @click="sng">START NEW GAME</button>
		</div>
   </section>
</template>

<script>
export default {
	methods:{
		sng(){
			this.$emit("SNG");
		}
	}

}
</script>

<style>

</style>