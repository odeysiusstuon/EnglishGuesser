<script lang="ts">
    import Icon from '@iconify/svelte';

    export let tooltip: string = "";
</script>

<button on:click data-tooltip={tooltip}>
    <Icon icon="ci:help-questionmark" />
</button>

<style lang="scss">
    button {
        border: none;
        outline: 0 !important;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        text-decoration: none;
        border-radius: 50%;
        text-align: center;
        width: 30px;
        height: 30px;
        transition: 0.2s;
    }

    button:hover, button:focus {
        background-color: rgba(0, 0, 0, 1);
        color: white;
    }
</style>
