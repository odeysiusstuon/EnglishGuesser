<script lang="ts">
    export let borderRadius: string = '10px';
    export let borderWidth: string = '5px';
    export let padding: string = '30px';
    export let maxWidth: string = '50%';
</script>

<div class="text" style="--max-width: {maxWidth}; --padding: {padding}; --border-radius: {borderRadius}; --border-width: {borderWidth};">
    <slot></slot>
</div>

<style lang="scss">
    .text {
        font-family: Arial, Helvetica, sans-serif;
        max-width: var(--max-width);
        padding: var(--padding);
        border-left: var(--border-width) solid $primary-button-color;
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        border-right: var(--border-width) solid $primary-button-color;
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
    }
</style>
