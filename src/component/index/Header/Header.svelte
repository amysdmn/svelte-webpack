<script>
import { createEventDispatcher, afterUpdate } from 'svelte';
import "./Header.less";
export let opacity;
export let name;
let headerHeight;

function goback(){
	window.back()
}

const dispatch = createEventDispatcher();

afterUpdate(()=>{
	dispatch('message',{
		height: headerHeight
	})
})

</script>

{#if opacity == 0}
	<header bind:clientHeight={headerHeight}>
		<div class="left" on:click={goback}>
			<img alt="back" src="static/index/dest_ic_back_white@3x.png" />
		</div>
	</header>
	{:else}
	<header class="model" style="opacity: {opacity}">
		<div class="left">
			<img alt="back" src="static/index/dest_ic_back_black@3x.png" />
		</div>
		<div class="center">{name}</div>
	</header>
{/if}