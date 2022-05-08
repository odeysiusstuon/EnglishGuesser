<script lang="ts">
    import RangeSlider from 'svelte-range-slider-pips/src';
    import { maxYear, minYear, periods, sliderColors } from './info';
    
    export let values: number[] = [2022];
    let currentYear = values[0];

    let sliderColorsStyle: string;
    
    $: {
        const styleArray: string[] = [];
        Object.entries(sliderColors).forEach(entry => {
            const [key, colorTuple] = entry;
            const percentage = parseFloat(key);
            styleArray.push(`rgba(${colorTuple.join(", ")}) ${percentage * 100}%`);
        });
        sliderColorsStyle = `linear-gradient(90deg, ${styleArray.join(", ")});`;
    }

    const acceptable = Object.values(periods).map(p => p.years.start);

    let positions: string = "";
    $: {
        const selectors: string[] = [];
        acceptable.forEach((e) => {
            const selector = `.pip:nth-child(${e + 1 - periods['oe'].years.start})`;
            selectors.push(selector);
        });
        positions = `<${''}style>\n${selectors.join(', ')} { display: block; font-size: 1.5vw }</${''}style>`;
    }

    export let disabled: boolean = false;
</script>

<div style="container">
    <div class="slider-container" style="--slider-background-color: {sliderColorsStyle}">
        <RangeSlider
            id="slider"
            min={minYear}
            max={maxYear}
            float
            pips
            step={1}
            pipstep={1}
            all="label"
            {disabled}
            bind:values
        />
        {@html positions}
    </div>
</div>

<style lang="scss">
    :global(.pip) {
        display: none;
    }

    :global(#slider) {
        font-size: 2.5vw;
    }

    .slider-container {
        font-family: monospace;
        background: var(--slider-background-color);
        --range-slider: rgba(0, 0, 0, 0);
        align-items: center;
        justify-items: center;
    }

    :global(.rangeSlider) {
        --range-inactive:  var(--handle-focus);
        --range:           var(--handle-focus);
        --float-inactive:  var(--handle-focus);
        --float:           var(--handle-focus);
    }

    :global(.rangeSlider .rangeFloat) {
        opacity: 1;
        background-color: $primary-button-color;
    }

    :global(.rangeSlider.focus .rangeFloat) {
        opacity: 1;
    }

    :global(.rangeHandle) {
        width: 100px;
        height: 13px;
        top: 50px;
    }
</style>
