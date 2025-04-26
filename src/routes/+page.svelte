<script lang="ts">
  import Screen from "$lib/slidypage/Screen.svelte";
  import Slide from "$lib/slidypage/Slide.svelte";
  import { onMount } from "svelte";
  import Brownian from "$lib/brownian";
  import Home from "$lib/pages/Home.svelte";

  let canvas: HTMLCanvasElement;
  let dpr: number;

  onMount(() => {
    const { clientWidth, clientHeight } = document.documentElement;
    const drawer = new Brownian(canvas, dpr, clientWidth, clientHeight);
    drawer.draw();
  });

</script>

<svelte:window bind:devicePixelRatio={dpr} />

<div class="fixed w-full h-dvh bg-slate-950 pointer-events-none z-[-4]"></div>
<canvas bind:this={canvas} class="fixed w-full w-full h-dvh pointer-events-none z-[-3] opacity-0"></canvas>
<div class="bg-radial from-[transparent] from-[25%] to-[rgba(0,0,0,0.5)] fixed w-full h-dvh pointer-events-none z-[-2]"></div>
<div class="bg-linear-to-b from-[transparent] to-slate-600 fixed w-full h-dvh pointer-events-none z-[-1] opacity-25"></div>
<Screen>
  <Slide>
    <Home />
  </Slide>
  <Slide>
    <div class="text-slate-100 w-full h-full flex items-center justify-center text-shadow-[0px_0px_15px_rgba(255,255,255,0.5)]">
      <div class="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-purple-400">
        <p class="text-center text-8xl my-4">Works</p>
        <p class="text-center text-8xl my-4">hovering item 1</p>
        <p class="text-center text-8xl my-4">hovering item 2</p>
      </div>
    </div>
  </Slide>
  <div class="h-[5dvh]">
    <div class="text-slate-100 w-full h-full flex items-center justify-center text-shadow-[0px_0px_15px_rgba(255,255,255,0.5)]">
      <p>nothing here</p>
    </div>
  </div>
</Screen>