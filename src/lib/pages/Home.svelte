<script lang="ts">
  import ArrowCoolDown from "$lib/icons/ArrowCoolDown.svelte";
  import AnimationTyping from "$lib/animation/typing";
  import { onMount } from "svelte";

  let arrowCoolDown: HTMLElement;
  let heading: HTMLElement;
  let headingCursor: HTMLElement;
  let subheading: HTMLElement;
  let subheadingCursor: HTMLElement;
  let links: HTMLElement;

  onMount(() => {
    headingCursor.style.visibility = "visible";
    const headingTyping = new AnimationTyping(heading, "Developer", 500, 50);
    const subheadingTyping = new AnimationTyping(subheading, "to create my own things", 1250, 50);
    subheadingTyping.onBegin(() => {
      headingCursor.style.visibility = "hidden";
      subheadingCursor.style.visibility = "visible";
    });
    subheadingTyping.onClear(() => {
      headingCursor.style.visibility = "visible";
      subheadingCursor.style.visibility = "hidden";
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!(target instanceof HTMLElement)) {
          throw new Error(`Expected a 'HTMLElement', but received '${target.className}'`);
        }

        if (target === arrowCoolDown && isIntersecting) {
          target.style.transitionDuration = "1s";
          target.style.transitionDelay = "1s";
          target.style.opacity = "1";
          return;
        }
        if (target === arrowCoolDown && !isIntersecting) {
          target.style.transitionDuration = "0s";
          target.style.transitionDelay = "0s";
          target.style.opacity = "0";
          return;
        }
        if (target === heading && isIntersecting) {
          headingTyping.animate();
        }
        if (target === heading && !isIntersecting) {
          headingTyping.clear();
        }
        if (target === subheading && isIntersecting) {
          subheadingTyping.animate();
        }
        if (target === subheading && !isIntersecting) {
          subheadingTyping.clear();
        }
        if (target === links && isIntersecting) {
          target.style.transitionProperty = "opacity";
          target.style.transitionDuration = "1s";
          target.style.transitionDelay = "0.75s";
          target.style.opacity = "1";
        }
        if (target === links && !isIntersecting) {
          target.style.transitionDuration = "0s";
          target.style.transitionDelay = "0s";
          target.style.opacity = "0";
        }
      });
    });

    observer.observe(arrowCoolDown);
    observer.observe(heading);
    observer.observe(subheading);
    observer.observe(links);
  });
</script>

<div class="text-slate-100 w-full h-full font-mono">
  <div class="w-[50dvw] mx-auto pt-[30dvh]">
    <div class="text-6xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-rose-400 to-lime-400">
      <div class="py-2 mb-2">
        <div class="font-bold inline-block height-[1em] align-top" bind:this={heading}></div><div class="cursor inline-block text-6xl" bind:this={headingCursor}></div>
      </div>
      <div class="py-2">
        <div class="font-bold inline-block height-[1em] align-top" bind:this={subheading}></div><div class="cursor inline-block text-6xl" bind:this={subheadingCursor}></div>
      </div>
    </div>
    <div class="text-2xl text-slate-100 flex gap-8 mt-[15dvh] font-regular" bind:this={links}>
      <div class="opacity-[0.25] hover:opacity-[0.875] hover:scale-[1.05] hover:font-bold transition-[opacity,scale,font-weight] duration-[0.25s]"><a href="https://github.com/wcho21" target="_blank">GitHub</a></div>
      <div class="opacity-[0.25] hover:opacity-[0.875] hover:scale-[1.05] hover:font-bold transition-[opacity,scale,font-weight] duration-[0.25s]"><a href="mailto:contact@rooi.dev">Email</a></div>
    </div>
  </div>
</div>
<div class="absolute bottom-8 left-[50%] translate-x-[-50%] opacity-0 transition-[opacity]" bind:this={arrowCoolDown}>
  <div class="animate-bounce text-slate-100 opacity-[0.875]"><ArrowCoolDown size={36} /></div>
</div>

<style lang="postcss">
  @reference "tailwindcss";

  .cursor {
    @apply inline-block w-[3px] h-[1.0em] ml-[8px] bg-slate-50 align-top content-[""] invisible;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>