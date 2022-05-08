<script lang="ts">
    import Slider from '$lib/slider.svelte';
</script>

<div class="container">
    <div class="header-area">
        <h1>
            Test
        </h1>
    </div>
    
    <div class="text-area">
        testetse
    </div>

    <div class="guess-input">
        <Slider />
    </div>
</div>

<div class="hidden">
    Test
</div>

<style>
    .container {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 1fr 2fr;
        gap: 20px;
        grid-template-columns: 1fr;
        justify-items: center;
        align-items: center;
    }

    .hidden {
        margin-top: 10em;
        width: 100%;
        align-items: center;
        justify-items: center;
        text-align: center;
    }

    /* .container:hover {
        height: 30%;
    } */

    .guess-input {
        height: 10%;
        width: 90%;
        grid-row: 2fr;
    }
</style>
