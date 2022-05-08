<script lang="ts">
	import { maxYear, minYear } from './info';

	const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

	export let values: number[];
	export let input: number = values[0];
	export let disabled: boolean = false;
    let previousInput: number = input;

	function onChange(e: Event) {
		const valueStr = (e.target as HTMLInputElement).value;
		if (valueStr) {
			const value = parseInt(valueStr);
			if (isNaN(value)) {
				input = values[0];
			} else {
				values[0] = clamp(value, minYear, maxYear);
			}
		} else {
			input = values[0];
		}
	}

	function validator(node: any, value: any) {
		return {
			update(value: string) {
                const numberInput = parseInt(value);
                if (value === null || (isNaN(numberInput) && value !== '')) {
                    input = previousInput;
                } else {
                    if (value !== '') {
                        input = numberInput;
                        previousInput = input;
                    }
                }
			}
		};
	}
</script>

<input on:change={onChange} use:validator={input} {disabled} bind:value={input} />

<style lang="scss">
    input {
        height: 100%;
        font-size: 20px;
        text-align: center;
        border-radius: 2em;
        background-color: $number-input-background-color;
    }
</style>
