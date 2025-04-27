<script lang="ts">
  import { onMount } from "svelte";

  let icon: HTMLElement;
  let heading: HTMLElement;
  let items: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!(target instanceof HTMLElement)) {
          throw new Error(`Expected a 'HTMLElement', but received '${target.className}'`);
        }

        if (target === icon && isIntersecting) {
          target.style.transitionProperty = "opacity, transform";
          target.style.transitionDuration = "1s";
          target.style.transitionDelay = "0s";
          target.style.opacity = "1";
          target.style.transform = "translateY(0em)";
          return;
        }
        if (target === icon && !isIntersecting) {
          target.style.transitionDuration = "0s";
          target.style.opacity = "0";
          target.style.transform = "translateY(30px)";
          return;
        }
        if (target === heading && isIntersecting) {
          target.style.transitionProperty = "opacity, transform";
          target.style.transitionDuration = "1s";
          target.style.transitionDelay = "0.125s";
          target.style.opacity = "1";
          target.style.transform = "translateY(0em)";
          return;
        }
        if (target === heading && !isIntersecting) {
          target.style.transitionDuration = "0s";
          target.style.transitionDelay = "0s";
          target.style.opacity = "0";
          target.style.transform = "translateY(30px)";
          return;
        }
        if (target === items && isIntersecting) {
          target.style.transitionProperty = "opacity, transform";
          target.style.transitionDuration = "1s";
          target.style.transitionDelay = "0.4375s";
          target.style.opacity = "1";
          target.style.transform = "translateY(0em)";
          return;
        }
        if (target === items && !isIntersecting) {
          target.style.transitionDuration = "0s";
          target.style.transitionDelay = "0s";
          target.style.opacity = "0";
          target.style.transform = "translateY(30px)";
          return;
        }
      });
    });

    observer.observe(icon);
    observer.observe(heading);
    observer.observe(items);
  });
</script>

<div class="text-slate-100 w-full h-full font-mono">
  <div class="pt-[25dvh]">
    <p class="text-lg lg:text-6xl text-center" bind:this={icon}>🚀</p>
    <p class="text-lg lg:text-6xl font-bold text-center opacity-1" bind:this={heading}>Works</p>
  </div>
  <div class="pt-[15dvh] flex justify-center gap-20" bind:this={items}>
    <div class="px-3 py-2 flex flex-col items-center hover">
      <div class="w-[64px] h-[64px] border-1 rounded-sm"></div>
      <p class="text-md lg:text-4xl">Foo</p>
    </div>
    <div class="px-3 py-2 flex flex-col items-center hover" style="animation-delay: 0.125s;">
      <div class="w-[64px] h-[64px] border-1 rounded-sm"></div>
      <p class="text-md lg:text-4xl">Bar</p>
    </div>
    <div class="px-3 py-2 flex flex-col items-center hover" style="animation-delay: 0.25s;">
      <div class="w-[64px] h-[64px] border-1 rounded-sm"></div>
      <p class="text-md lg:text-4xl">Baz</p>
    </div>
    <div class="px-3 py-2 flex flex-col items-center hover" style="animation-delay: 0.375s;">
      <div class="w-[64px] h-[64px] border-1 rounded-sm"></div>
      <p class="text-md lg:text-4xl">Qux</p>
    </div>
  </div>
</div>

<style lang="postcss">
  .hover {
    animation: hover 2s ease-in-out infinite;
  }

  @keyframes hover {
    0% {
      transform: translateY(-2px);
    }
    50% {
      transform: translateY(2px);
    }
    100% {
      transform: translateY(-2px);
    }
  }
</style>