<script lang="ts">
  import { onMount } from "svelte";
  import kalLogo from "$lib/images/logos/kal-logo.png";
  import dropLogo from "$lib/images/logos/drop-logo.png";

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
    <p class="text-3xl lg:text-6xl text-center" bind:this={icon}>🚀</p>
    <p class="text-3xl lg:text-6xl font-bold text-center opacity-1" bind:this={heading}>Toys</p>
  </div>
  <div class="pt-[15dvh] flex justify-center gap-10" bind:this={items}>
    <div class="w-[20dvw] border-box flex justify-center">
      <a href="https://kal-playground.rooi.dev" target="_blank">
        <div class="w-fit px-3 py-2 flex flex-col items-center hover hover:scale-[1.05] transition-[scale] duration-[0.25s]">
          <div class="w-[64px] h-[64px]"><img src={kalLogo} alt="Kal logo" /></div>
          <p class="text-md lg:text-3xl mt-3 font-medium">Kal</p>
          <p class="text-sm lg:text-md mt-1 font-light text-slate-500 text-center">Programming Language</p>
        </div>
      </a>
    </div>
    <div class="w-[20dvw] border-box flex justify-center">
      <a href="https://drop.rooi.dev" target="_blank">
        <div class="w-fit px-3 py-2 flex flex-col items-center hover hover:scale-[1.05] transition-[scale] duration-[0.25s]" style="animation-delay: 0.25s;">
          <div class="w-[64px] h-[64px]"><img src={dropLogo} alt="Drop logo" /></div>
          <p class="text-md lg:text-3xl mt-3 font-medium">Drop</p>
          <p class="text-sm lg:text-md mt-1 font-light text-slate-500 text-center">Blog</p>
        </div>
      </a>
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