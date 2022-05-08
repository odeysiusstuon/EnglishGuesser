<script lang="ts">
    import QuoteContent from "$lib/quote_content.svelte";
</script>

<br />
<p>
    Given a random block of text from any period of the English language, guess
    the year the text originated from.
</p>
<p>For instance:</p>
<QuoteContent
    padding="2%"
    maxWidth="35%"
>
    <p style="margin: auto;">
        To be or not to be, that
        <br />
        is the Question: Whether 'tis...
    </p>
</QuoteContent>
<p>
    This is from Shakespeare's Hamlet, which was written approximately between 1599
    to 1601. Thus, any of the years in that range will be accepted as correct
    and result in full points.
</p>
<p>
    If the guess made is incorrect, points will be rewarded based on how
    far from the range the guess is.
</p>

<style lang="scss">
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>
