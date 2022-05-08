<script lang="ts">
    import RangeSlider from 'svelte-range-slider-pips/src';
    import { maxYear, minYear, periods, sliderColors } from './info';
    
    export let values: number[] = [2022];
    let currentYear = values[0];

    let sliderColorsStyle: string;

    let currentSliderColor: string;
    $: {
        
    }
    
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
        let positionsStyles = "";
        acceptable.forEach((e) => {
            positionsStyles += `#slider .pip:nth-child(${e+1}) { display: block; }`;
        });
        positions = `<${''}style>:root { ${positionsStyles} }</${''}style>`;
    }

    // https://github.com/simeydotme/svelte-range-slider-pips/issues/45
    // https://svelte.dev/repl/d777b85ba4c9493a8169676adbab1fa6?version=3.44.1
    function reAlign(e: any) {
        const v = e.detail.value;
        if ( !acceptable.includes(v) ) {
            let closest = acceptable.reduce((prev, curr) => Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev);
            // https://stackoverflow.com/a/35000557/1121532
            values[0] = closest;
        }
    }
</script>

<div style="container">
    <div class="slider-container" style="--slider-background-color: {sliderColorsStyle}">
        <div class="slider">
            <RangeSlider
                id=slider
                min={minYear}
                max={maxYear}
                all="label"
                float
                pips
                pipstep={100}
                bind:values
            />
            {@html positions}
        </div>
    </div>
</div>

<style lang="scss">
    :global(.pip) {
        display: none;
    }

    :global(#slider) {
        font-size: 40px;
    }

    .slider-container {
        font-family: monospace;
        background: var(--slider-background-color);
        --range-slider: rgba(0, 0, 0, 0);
        align-items: center;
        justify-items: center;
    }

    // .rangeSlider {
    //     --handle-border:   var(--handle);
    //     --range-inactive:  var(--handle-focus);
    //     --range:           var(--handle-focus);
    //     --float-inactive:  var(--handle-focus);
    //     --float:           var(--handle-focus);
    //     --pip-active:        white;
    //     --pip-active-text:   var(--pip-active);

    //     .rangeNub {
    //         opacity: 0.5;
    //     }
    //     &.focus,
    //     &:hover { 
    //         .rangeNub {
    //             opacity: 0.75;
    //         }
    //     }

    //     .rangeHandle {
    //         --handle-focus: var(--handle);
    //         --handle-inactive: var(--handle);
    //         --handle-border: var(--handle);
    //     }

    //     .rangeHandle.active {
    //         .rangeNub {
    //             opacity: 1;
    //         }
    //     }
    // }
</style>
