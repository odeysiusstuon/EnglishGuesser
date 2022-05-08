<script lang="ts">
	import { RangeSlider } from 'svelte-range-slider-pips';

    export const minYear = 450;
    export const maxYear = 2022;

	export let value = 2022;
</script>

<div style="container">
	<!-- <div on:mousedown|preventDefault={console.log} id="year-slider" class="slider">
		<div class="slider-dragger" on:mousedown={draggerMouseDown} on:mousemove={draggerMouseMove} on:mouseup={draggerMouseUp} style="left: calc({currentPercent}% - 2%)"></div>
	</div> -->

	<!-- <input type="range" name="Year" id="year-slider" min={minYear} max={maxYear} bind:value /> -->
	<div>
		<RangeSlider />
	</div>
	<button id="guess-button" class="centered">Guess</button>
</div>

<style>
	/* .slider {
		position: relative;
		background: rgb(84,76,0);
		background: linear-gradient(90deg, rgba(84,76,0,1) 0%, rgba(241,255,0,1) 39%, rgba(255,96,10,1) 62%, rgba(243,65,255,1) 78%);
		width: 100%;
		height: 50px;
		border-radius: 30px;
		text-align: center;
		line-height: 250px;
		color: white;
		margin: 0 auto;
	}

	.slider-dragger {
		position: absolute;
		width: 4%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(20, 231, 105, 0.4);
	} */

	.centered {
		margin: auto;
		display: block;
	}
</style>
