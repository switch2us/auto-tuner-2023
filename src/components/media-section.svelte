<script context="module">
	import { writable } from 'svelte/store';

	const scrolled = writable(false);

	const userScrolled = function () {
		scrolled.set(true);
	};
</script>

<script>
	import { onMount } from 'svelte';

	export let sectionId = '';
	export let imageUrl,
		videoUrl,
		subtitle,
		title,
		useH1TagOnTitle = false,
		description,
		note,
		linkHref,
		linkText,
		linkIsExternal = false;
	export let fixedBackground = false;
	export let fixedBackgroundColors = false;
	export let useSecondaryColor = false;
	export let useTertiaryColor = false;
	export let useTertiarySecondaryColor = false;
	export let reducedSpacing = false;
	export let extraSpacing = false;
	export let dark = true;
	export let marginTop = false;
	export let marginBottom = false;
	export let squareButton = false;
	export let notchedButton = false;
	export let notchSize = 8;
	export let fullRoundedButton = true;
	export let smallButton = false;
	export let noBackground = false;
	export let backgroundColors = [];
	export let backgroundColorsDirection = 'to bottom right';
	export let backgroundColorsUseAnimation = false;
	export let backgroundColorsAnimationDuration = 2000;
	export let preloadVideo = false;
	export let titleBeforeSubtitle = false;

	let mounted = false;

	onMount(() => (mounted = true));
</script>

<svelte:window on:scroll|once={userScrolled} />

<div
	id={sectionId}
	class="image-section flex relative z-0 overflow-hidden {noBackground
		? ''
		: dark
		? 'bg-black'
		: 'bg-white'} {marginTop ? 'mt-1' : ''} {marginBottom ? 'mb-1' : ''}"
	class:has-bg={imageUrl}
	class:fixed-bg={fixedBackground}
	class:fixed-bg-colors={fixedBackgroundColors}
	style="--url: url('{imageUrl}'); --bg-color: {dark
		? 'black'
		: 'white'}; --bg-color-1: {backgroundColors[0] ??
		'var(--bg-color)'}; --bg-color-2: {backgroundColors[1] ??
		'var(--bg-color)'}; --bg-color-3: {backgroundColors[2] ??
		'var(--bg-color)'}; --bg-color-4: {backgroundColors[3] ??
		'var(--bg-color)'}; --bg-color-5: {backgroundColors[4] ??
		'var(--bg-color)'}; --bg-animated-colors-duration: {backgroundColorsAnimationDuration ??
		5000}; --bg-colors-direction: {backgroundColorsDirection};"
>
	{#if videoUrl && (preloadVideo || (mounted && $scrolled))}
		<video id="bg-video" class="z-5" autoplay muted loop playsinline preload={String(preloadVideo)}>
			<source src={videoUrl} type="video/mp4" />
		</video>
	{/if}
	<div
		class="flex w-full z-10 {noBackground ? '' : dark ? 'bg-black' : 'bg-white'} {imageUrl ||
		videoUrl
			? 'bg-opacity-50'
			: 'bg-opacity-100'}"
		class:bg-colors={backgroundColors?.length > 1}
		class:bg-colors-3={backgroundColors?.length > 2}
		class:bg-colors-4={backgroundColors?.length > 3}
		class:bg-colors-5={backgroundColors?.length > 4}
		class:bg-colors-animation={backgroundColorsUseAnimation && backgroundColors?.length > 1}
	>
		<div
			class="flex flex-col m-auto container px-10 md:px-20 {extraSpacing
				? 'py-48 md:py-64'
				: reducedSpacing
				? 'py-16 md:py-24'
				: 'py-32 md:py-48'}"
		>
			{#if !titleBeforeSubtitle}
				{#if subtitle}
					<p
						class="flex-1 {dark ? 'text-white' : 'text-black'} text-center font-light text-xl my-2"
					>
						{subtitle}
					</p>
				{/if}
				<slot name="subtitle" />
			{/if}
			{#if title}
				{#if useH1TagOnTitle}
					<h1
						class="flex-1 {dark ? 'text-white' : 'text-black'} text-center font-bold text-4xl my-2"
					>
						{title}
					</h1>
				{:else}
					<h2
						class="flex-1 {dark ? 'text-white' : 'text-black'} text-center font-bold text-4xl my-2"
					>
						{title}
					</h2>
				{/if}
			{/if}
			<slot name="title" />
			{#if titleBeforeSubtitle}
				{#if subtitle}
					<p
						class="flex-1 {dark ? 'text-white' : 'text-black'} text-center font-light text-xl my-2"
					>
						{subtitle}
					</p>
				{/if}
				<slot name="subtitle" />
			{/if}
			{#if description}
				<p class="flex-1 {dark ? 'text-white' : 'text-black'} text-center my-2">{description}</p>
			{/if}
			<slot name="description" />
			{#if note}
				<p class="flex-1 {dark ? 'text-white' : 'text-black'} text-center my-1 text-xs font-bold">
					<sup>*</sup>
					{note}
				</p>
			{/if}
			<slot name="note" />
			{#if linkHref && linkText}
				<div class="flex-1 {dark ? 'text-white' : 'text-black'} text-center my-4">
					<a
						href={linkHref}
						target={linkIsExternal ? '_blank' : ''}
						rel={linkIsExternal ? 'external nofollow noopener' : ''}
						style="--notch-size: {notchSize
							? notchSize
							: 20}px; --padding: 4px; padding: var(--padding);"
						class:notched={notchedButton}
						class="inline-block bg-opacity-50
                    {notchedButton
							? useTertiarySecondaryColor
								? 'bg-theme_tertiary_secondary'
								: useTertiaryColor
								? 'bg-theme_tertiary'
								: useSecondaryColor
								? 'bg-theme_secondary'
								: 'bg-theme_primary'
							: ''}
                    "
					>
						<button
							style="--notch-size: calc({notchSize ? notchSize : 20}px - var(--padding)/2)"
							class="inline-block {useTertiarySecondaryColor
								? 'bg-theme_tertiary_secondary hover:bg-theme_tertiary_secondary-dark ring-theme_tertiary_secondary text-theme_tertiary_secondary-text'
								: useTertiaryColor
								? 'bg-theme_tertiary hover:bg-theme_tertiary-dark ring-theme_tertiary text-theme_tertiary-text'
								: useSecondaryColor
								? 'bg-theme_secondary hover:bg-theme_secondary-dark ring-theme_secondary text-theme_secondary-text'
								: 'bg-theme_primary hover:bg-theme_primary-dark ring-theme_primary text-theme_primary-text'}
                        {notchedButton ? 'ring-0' : 'ring-4'}
                        ring-opacity-50 border-0 font-semibold
                        {smallButton ? 'p-1 px-2 text-sm' : 'p-2 px-4'}
                        {squareButton || notchedButton
								? 'rounded-none'
								: fullRoundedButton
								? 'rounded-full'
								: 'rounded'} font-light">{linkText}</button
						>
					</a>
				</div>
			{/if}
			<slot name="button" />
		</div>
	</div>
</div>

<style>
	.image-section.has-bg {
		background-image: var(--url);
		background-size: cover;
		background-position: center;
	}
	.image-section.fixed-bg {
		background-attachment: fixed;
	}
	.image-section.fixed-bg-colors > .bg-colors {
		background-attachment: fixed;
	}
	.image-section > .bg-colors {
		background-image: linear-gradient(
			var(--bg-colors-direction, to bottom right),
			var(--bg-color-1),
			var(--bg-color-2)
		);
	}
	.image-section > .bg-colors.bg-colors-3 {
		background-image: linear-gradient(
			var(--bg-colors-direction, to bottom right),
			var(--bg-color-1),
			var(--bg-color-2),
			var(--bg-color-3)
		);
	}
	.image-section > .bg-colors.bg-colors-4 {
		background-image: linear-gradient(
			var(--bg-colors-direction, to bottom right),
			var(--bg-color-1),
			var(--bg-color-2),
			var(--bg-color-3),
			var(--bg-color-4)
		);
	}
	.image-section > .bg-colors.bg-colors-5 {
		background-image: linear-gradient(
			var(--bg-colors-direction, to bottom right),
			var(--bg-color-1),
			var(--bg-color-2),
			var(--bg-color-3),
			var(--bg-color-4),
			var(--bg-color-5)
		);
	}
	.image-section > .bg-colors-animation {
		-webkit-animation: animate-bg-colors calc(var(--bg-animated-colors-duration, 8000) * 1ms) linear
			normal forwards infinite;
		animation: animate-bg-colors calc(var(--bg-animated-colors-duration, 8000) * 1ms) linear normal
			forwards infinite;
		--screens-count: 12;
		background-size: calc(100% * var(--screens-count, 1));
		background-image: linear-gradient(
			to right,
			var(--bg-color-1),
			var(--bg-color-2),
			var(--bg-color-2),
			var(--bg-color-1)
		);
	}
	.image-section > .bg-colors-3.bg-colors-animation {
		--screens-count: 18;
		background-size: calc(100% * var(--screens-count, 1));
		background-image: linear-gradient(
			to right,
			var(--bg-color-1),
			var(--bg-color-2),
			var(--bg-color-2),
			var(--bg-color-3),
			var(--bg-color-3),
			var(--bg-color-1)
		);
	}
	.image-section > .bg-colors-4.bg-colors-animation {
		--screens-count: 24;
		background-size: calc(100% * var(--screens-count, 1));
		background-image: linear-gradient(
			to right,
			var(--bg-color-1),
			var(--bg-color-2),
			var(--bg-color-2),
			var(--bg-color-3),
			var(--bg-color-3),
			var(--bg-color-4),
			var(--bg-color-4),
			var(--bg-color-1)
		);
	}
	.image-section > .bg-colors-5.bg-colors-animation {
		--screens-count: 30;
		background-size: calc(100% * var(--screens-count, 1));
		background-image: linear-gradient(
			to right,
			var(--bg-color-1),
			var(--bg-color-2),
			var(--bg-color-2),
			var(--bg-color-3),
			var(--bg-color-3),
			var(--bg-color-4),
			var(--bg-color-4),
			var(--bg-color-5),
			var(--bg-color-5),
			var(--bg-color-1)
		);
	}
	@-webkit-keyframes animate-bg-colors {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: calc(100% + (100% / (var(--screens-count, 1) - 1))) 0%;
		}
	}
	@keyframes animate-bg-colors {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: calc(100% + (100% / (var(--screens-count, 1) - 1))) 0%;
		}
	}
	#bg-video {
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		min-width: 100%;
		min-height: 100%;
		width: auto;
		height: auto;
		overflow: hidden;
		object-fit: cover;
	}
	.notched,
	.notched > button {
		--notchSize: var(--notch-size, 20px);
		clip-path: polygon(
			0% var(--notchSize),
			var(--notchSize) 0%,
			calc(100% - var(--notchSize)) 0%,
			100% var(--notchSize),
			100% calc(100% - var(--notchSize)),
			calc(100% - var(--notchSize)) 100%,
			var(--notchSize) 100%,
			0% calc(100% - var(--notchSize))
		);
	}
</style>
