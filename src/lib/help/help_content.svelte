<script lang="ts">
    import { getContext } from 'svelte';

    import HelpPopup from '$lib/help/help_popup.svelte';
    import InfoButton from '$lib/help/help_button.svelte';
    const { open } = getContext('simple-modal');
</script>

<InfoButton on:click={() => open(HelpPopup, { message: 'test' })} tooltip="Help" />
