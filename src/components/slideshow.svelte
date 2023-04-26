<script lang="ts">
	import { onMount } from 'svelte';

	export let slides = [];
	export let index = 0;
	export let minHeight = 0;

	const _slides = slides;
	let currentSlide = 0;
	$: index = currentSlide;
	let interval;
	let scrollableElement;
	let isAnimatedScrolling = false;

	function setSlide(_index = 0, _restartInterval = true) {
		if (_restartInterval) restartInterval();
		currentSlide = _index;
		if (scrollableElement != undefined)
			scrollableElement.scrollTo({
				left: (scrollableElement.scrollWidth / _slides.length) * currentSlide,
				behavior: 'smooth'
			});
		isAnimatedScrolling = true;
		setTimeout(() => {
			isAnimatedScrolling = false;
		}, 500);
	}

	function previousSlide() {
		if (currentSlide == 0) setSlide(_slides.length - 1);
		else setSlide(currentSlide - 1);
	}

	function nextSlide() {
		if (currentSlide == _slides.length - 1) setSlide(0);
		else setSlide(currentSlide + 1);
	}

	function restartInterval() {
		clearInterval(interval);
		interval = setInterval(nextSlide, 5000);
	}

	onMount(() => {
		restartInterval();
		return () => clearInterval(interval);
	});

	function setSlideBasedOnScrolledContent() {
		if (
			scrollableElement.scrollLeft >
			(scrollableElement.scrollWidth / _slides.length) * currentSlide
		)
			nextSlide();
		else if (
			scrollableElement.scrollLeft <
			(scrollableElement.scrollWidth / _slides.length) * currentSlide
		)
			previousSlide();
	}

	function _setIndexBasedOnScrollLeft() {
		if (isAnimatedScrolling) return;
		currentSlide = Math.round(
			(scrollableElement.scrollLeft / scrollableElement.scrollWidth) * _slides.length
		);
		restartInterval();
	}

	function setIndexBasedOnScrollLeft() {
		requestAnimationFrame(_setIndexBasedOnScrollLeft);
	}
</script>

<div
	style="--min-height: {minHeight ?? 0};"
	class="relative overflow-hidden w-full h-auto bg-black"
>
	<div
		bind:this={scrollableElement}
		on:touchend={setSlideBasedOnScrolledContent}
		on:scroll={setIndexBasedOnScrollLeft}
		class="flex flex-none relative overflow-x-scroll overflow-y-hidden snap-mandatory snap-always snap-x"
	>
		{#each _slides as slide, slideIndex}
			<div
				class="relative flex flex-none justify-center items-center w-full h-auto min-h-[calc(var(--min-height,0)*1px)] overflow-hidden snap-center"
			>
				<img
					src={slide.src}
					alt=""
					class="block relative w-auto h-auto max-w-full max-h-[calc(100vh-68px)] opacity-0"
				/>
				<div
					class:hiddens={currentSlide != slideIndex}
					style="background-image: url('{slide.src}');"
					class="absolute w-full h-full bg-no-repeat bg-center bg-cover opacity-25"
				/>
				<div
					class:hiddens={currentSlide != slideIndex}
					class="absolute w-full h-full flex flex-none justify-center items-center"
				>
					<img
						class:hiddens={currentSlide != slideIndex}
						src={slide.src}
						alt=""
						class="block object-contain object-center relative m-auto w-auto h-auto max-w-full max-h-full"
					/>
				</div>
			</div>
		{/each}
	</div>
	<div
		class="absolute top-0 bottom-0 left-0 right-0 overflow-hidden flex justify-center items-center"
	>
		<slot />
	</div>
	<div class="flex justify-center absolute bottom-0 left-0 right-0">
		<div class="flex p-5">
			{#each _slides as slide, slideIndex}
				<div
					on:click={() => setSlide(slideIndex)}
					class:active={currentSlide == slideIndex}
					class="dot flex w-4 h-4 m-1 rounded-full cursor-pointer hover:ring-2 ring-black bg-white shadow opacity-75"
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.dot.active {
		@apply opacity-100;
	}
</style>
