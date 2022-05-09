<script lang="ts">
    import { getWinType, winConditions, WinType } from "$lib/info";

    import type { GuessFeedback } from "$lib/types";

    export let feedback: GuessFeedback;
    let winType: WinType;
    $: winType = getWinType(feedback.distance);
</script>

<br />
{#if winType === WinType.Correct }
    <p>Correct!</p>
{:else if winType === WinType.PartiallyCorrect }
    <p>Close enough! You were {feedback.distance} year{feedback.distance === 1 ? '' : 's'} off!</p>
{:else}
    <p>Incorrect! You were {feedback.distance} year{feedback.distance === 1 ? '' : 's'} off!</p>
{/if}
<p>
    The original text was approximately from {#if feedback.answer.end - feedback.answer.start === 0}
        {feedback.answer.start}.
    {:else}
        {feedback.answer.start} to {feedback.answer.end}.
    {/if}
</p>
<p>You have been awarded <strong>{feedback.points}</strong> point{feedback.points === 1 ? '' : 's'}!</p>
<p>Click the next button to get then next text.</p>

<style lang="scss">
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>
