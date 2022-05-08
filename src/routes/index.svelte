<script lang="ts" context="module">
    import type { LoadInput } from '@sveltejs/kit';

    /** @type {import('./index').Load} */
    export async function load({ fetch }: LoadInput) {
        const url = `/randomtext/oe.json`;
        const response = await fetch(url);
        const text = (await response.json()).text as Text;
        
        return {
            status: response.status,
            props: {
                text,
            },
        };
    }
</script>

<script lang="ts">
    import Modal, { bind } from 'svelte-simple-modal';

    import type { GuessFeedback, Text } from '$lib/types';
    import { getPeriodPercentage, maxYear, numPeriods, periods } from '$lib/info';
    import SliderInput from '$lib/slider_input.svelte';
    import NumberInput from '$lib/number_input.svelte';
    import QuoteContent from '$lib/quote_content.svelte';
    import HelpContent from '$lib/help/help_content.svelte';

    import { writable } from 'svelte/store';
    import FeedbackPopup from '$lib/feedback/feedback_popup.svelte';
    const feedbackModal = writable(null);
    const showFeedbackModal = () => feedbackModal.set(bind(FeedbackPopup, { feedback: guessFeedback }));

    let points: number = 0;
    let values: number[] = [2022];
    let guess: number;

    $: guess = values[0];

    let guessFeedback: GuessFeedback;
    
    export let text: Text;

    let periodLabelsTemplateColumns: string = '';
    const percentages = [];
    for (const periodId in periods) {
        const percentage = getPeriodPercentage(periodId);
        percentages.push(`${Math.round(percentage * 100)}%`);
        periodLabelsTemplateColumns = percentages.join(' ');
    }

    async function onSubmitGuess() {
        const response = await fetch(`/feedback/${text.id}.json?guess=${guess}`);
        if (response.ok) {
            const responseJson = await response.json();
            guessFeedback = responseJson.feedback as GuessFeedback;
            showFeedbackModal();
        }
    }

    async function onSkip() {
        const url = `/randomtext/oe.json`;
        const response = await fetch(url);
        text = (await response.json()).text as Text;
        values[0] = maxYear;
    }

    $: points += (guessFeedback?.points || 0);
</script>

<Modal show={$feedbackModal}>
    <div class="container">
        <div class="header-area">
            <h1>
                History of English Guessing Game
            </h1>
            <hr class="divider"/>
        </div>
        
        <div class="text-area">
            <Modal
                styleWindow={{ 'background-color': '#ffe9c6' }}
            >
                <HelpContent />
            </Modal>
            <QuoteContent>{text.id}: {text.content}</QuoteContent>
            <div class="points-area">Your Total Points: {points}</div>
        </div>
    
        <div class="guess-input-area"> 
            <div id="slider-area" style={`--periods-template-columns: ${periodLabelsTemplateColumns}; --num-periods: ${numPeriods}`}>
                <div class="period-label" id="oe-period-label">Old English</div>
                <div class="period-label" id="me-period-label">Middle English</div>
                <div class="period-label" id="eme-period-label">Early Modern English</div>
                <div class="period-label" id="ce-period-label">Contemporary English</div>
                <div id="slider">
                    <SliderInput bind:values />
                </div>
            </div>
            <div class="button-container" id="guess-button-container">
                <button class="button" id="guess-button" on:click={onSubmitGuess}>Guess</button>
            </div>
            <div id="number-input">
                <NumberInput bind:values input={values[0]} />
            </div>
            <div class="button-container" id="skip-button-container">
                <button class="button" id="skip-button" on:click={onSkip}>Skip</button>
            </div>
        </div>
    </div>
</Modal>

<div class="hidden">
    Test
</div>

<style lang="scss">
    .container {
        height: 100%;
        display: grid;
        grid-template-rows: 20% 30% 50%;
        justify-items: center;
        align-items: center;
    }

    h1 {
        font-size: $header-size;
    }

    // .divider:before {
    //     display: block;
    //     content: "";
    //     height: 30px;
    //     margin-top: -31px;
    //     border-style: solid;
    //     border-color: $text-color;
    //     border-width: 0 0 1px 0;
    //     border-radius: 10px;
    // }

    // .divider {
    //     overflow: visible;
    //     height: 30px;
    //     border-style: solid;
    //     border-color: $text-color;
    //     border-width: 1px 0 0 0;
    //     border-radius: 10px;
    // }

    .divider {
        border: none;
        border-top: 5px double rgba($text-color, 0.2);
        color: $text-color;
        overflow: visible;
        text-align: center;
        height: 5px;
        width: 60vw;
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

    .header-area {
        text-align: center;
    }

    .text-area {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        justify-items: center;
        align-items: center;
    }

    .guess-input-area {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 1fr 30%;
        height: 50%;
        width: 90%;
        text-align: center;
    }

    #slider-area {
        display: grid;
        grid-template-columns: var(--periods-template-columns);
        grid-template-rows: 10px 50px;
        grid-area: 1 / 1 / 2 / 8;
    }

    #slider {
        grid-area: 1 / 1 / 2 / calc(var(--num-periods) + 1);
    }

    .period-label {
        text-align: center;
        font-size: 20px;
    }

    #guess-button-container {
        grid-area: 2 / 2 / 3 / 3;
    }

    #number-input {
        grid-area: 2 / 4 / 3 / 5;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #skip-button-container {
        grid-area: 2 / 6 / 3 / 7;
    }

    .button-container {
        text-align: center;
    }

    .button {
        display: flex;
        align-items: center;
        padding: 0.35em 1.2em;
        border: 0.1em solid rgba(255,255,255,0);
        margin: 0 0.3em 0.3em 0;
        border-radius: 2em;
        box-sizing: border-box;
        text-decoration: none;
        font-family: $font-family;
        transition: all 0.3s;
        font-size: 24px;
    }

    .button:hover {
        border: 0.1em solid rgba(0, 0, 0, 0);
    }

    #guess-button {
        background-color: $primary-button-color;
        color: $primary-button-text-color;
    }

    #guess-button:hover {
        color: $primary-button-text-color-hover;
        background-color: $primary-button-color-hover;
    }

    #skip-button {
        background-color: $secondary-button-color;
        color: $secondary-button-text-color;
    }

    #skip-button:hover {
        color: $secondary-button-text-color-hover;
        background-color: $secondary-button-color-hover;
    }
</style>
