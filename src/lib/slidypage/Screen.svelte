<script lang="ts">
  const { children } = $props();
</script>

<div class="screen">{@render children()}</div>

<style>
  .screen {
    box-sizing: border-box;
    border: 2px solid red;
    height: 100dvh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }
</style>