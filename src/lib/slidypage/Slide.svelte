<script lang="ts">
  const { children } = $props();
</script>

<div class="slide">{@render children()}</div>

<style>
  .slide {
    box-sizing: border-box;
    border: 2px solid blue;
    height: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
</style>