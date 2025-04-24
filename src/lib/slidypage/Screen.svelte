<script lang="ts">
  const { children } = $props();
</script>

<div class="border-box w-dvw h-dvh snap-mandatory snap-y overflow-y-scroll scroll-smooth">{@render children()}</div>

<style lang="postcss">
  div {
    scrollbar-width: none;
  }
</style>