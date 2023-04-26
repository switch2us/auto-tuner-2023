<script context="module">

    import { writable } from "svelte/store"

    const scrolled = writable(false)

    const userScrolled = function() {
        scrolled.set(true)
    }

</script>

<svelte:window on:scroll|once={userScrolled} />

<script>
    import { onMount } from "svelte"

    export let imageSrc, imageAlt, imageWidth, imageHeight, title, subtitle, description
    export let imageOnLeft = false
    export let dark = false
    export let noHorizontalSpacing = false
    export let noSpacingAfter = false
    export let smallImage = false
    export let noBgColor = false

    let mounted = false

    onMount(() => mounted = true)
</script>

<div class="{noBgColor?'':(dark?'bg-gray-800 text-white':'bg-gray-200 text-black')}">
    <div class="container flex flex-col {imageOnLeft?'md:flex-row-reverse':'md:flex-row'} mx-auto {noHorizontalSpacing?'p-0 py-10':'p-10 py-20'} {noSpacingAfter?'pb-0':''} gap-10">
        <div class="flex-1">
            <slot name="before-title" />
            {#if title}
                <h2 class="text-3xl font-bold text-left">{title}</h2>
            {/if}
            <slot name="after-title" />
            <slot name="before-subtitle" />
            {#if subtitle}
                <h3 class="text-xl font-bold text-left my-5">{subtitle}</h3>
            {/if}
            <slot name="after-subtitle" />
            <slot name="before-description" />
            {#if description}
                <p class="text-justify my-5">{description}</p>
            {/if}
            <slot name="after-description" />
        </div>
        <slot name="before-image" />
        {#if imageSrc}
            <div class="flex-1 {smallImage?'md:max-w-xs':'md:max-w-2xl'} justify-center mx-auto">
                <img class="rounded shadow-xl" src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} />
            </div>
        {/if}
        <slot name="after-image" />
    </div>
</div>