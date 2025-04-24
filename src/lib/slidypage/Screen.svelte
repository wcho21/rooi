<script lang="ts">
  const { children } = $props();
</script>

<div class="border-box w-dvw h-dvh snap-mandatory snap-y overflow-y-scroll">{@render children()}</div>