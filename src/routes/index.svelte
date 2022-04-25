<script lang="ts">
    import Slider from '$lib/slider.svelte';
</script>

<div style="grid grid-cols-6 gap-4" id="main">
    <div class="col-start-2 col-span-4">
        <h1 class="text-3xl font-bold underline">
            History of English Guesser
        </h1>
    </div>
    
    <div class="col-span-1">
        <Slider />
    </div>
</div>

<style>
    #main {
        height: 100%;
    }
</style>
