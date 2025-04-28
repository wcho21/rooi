# README

## How to use

In `/src/routes/+layout.svelte`, import global style sheet:
```
<script lang="ts">
  import "$lib/slidypage/global-style.css";
  const { children } = $props();
</script>

// ...
```