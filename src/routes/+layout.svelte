<script lang="ts">
  import "../app.css";
  const { children } = $props();
</script>

{@render children()}

<style lang="postcss">
  @reference "tailwindcss";
  
  :global(body) {
    @apply scheme-dark;
  }
</style>