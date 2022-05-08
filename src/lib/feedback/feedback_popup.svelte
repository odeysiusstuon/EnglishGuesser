<script lang="ts">
    import type { GuessFeedback } from "$lib/types";

    export let feedback: GuessFeedback;
</script>

<br />
{#if feedback.distance === 0}
    <p>Correct!</p>
{:else}
    <p>Incorrect! You were {feedback.distance} year{feedback.distance === 1 ? '' : 's'} off!</p>
{/if}
<p>
    The original text was approximately from {#if feedback.answer.end - feedback.answer.start === 0}
        {feedback.answer.start}
    {:else}
        {feedback.answer.start} to {feedback.answer.end}
    {/if}.
</p>
<p>You have been awarded <strong>{feedback.points}</strong> point{feedback.points === 1 ? '' : 's'}!</p>

<style lang="scss">
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>
