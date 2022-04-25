<script lang="ts">
	import { NumberInput } from 'carbon-components-svelte';

    export const minYear = 450;
    export const maxYear = 2022;

	export let value = 2022;
</script>

<div style="container">
	<input type="range" name="Year" id="year" min={minYear} max={maxYear} bind:value />
	<div class="number-input">
		<NumberInput
			min={minYear}
			max={maxYear}
			bind:value
			label="Year"
			invalidText={`Year must be between ${minYear} and ${maxYear}.`}
		/>
	</div>
</div>

<style>

</style>
