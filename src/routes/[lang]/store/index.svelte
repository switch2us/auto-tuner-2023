<script>
	import { getTranslatedString, langStore } from '../../../tools/lang';
	import Nav from '../../../components/header.svelte';
	import { products } from '../../../types/products';
	import { domain, metaTitle } from '../../../tools/domain';
</script>

<head>
	<link rel="canonical" href="https://{domain}" />

	<!-- Standard Meta Tags -->
	<title>{getTranslatedString(metaTitle, $langStore)}</title>
	<meta name="title" content={getTranslatedString(metaTitle, $langStore)} />
	<meta
		name="description"
		content={getTranslatedString(
			"We offer auto tuning services at very good prices. Select your car's brand & model to check our prices or request one of our services.",
			$langStore
		)}
	/>

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={getTranslatedString(metaTitle, $langStore)} />
	<meta
		property="og:description"
		content={getTranslatedString(
			"We offer auto tuning services at very good prices. Select your car's brand & model to check our prices or request one of our services.",
			$langStore
		)}
	/>
	<meta property="og:url" content="https://{domain}" />
	<meta property="og:image" content="https://{domain}/logo-large.png" />
	<meta property="og:locale" content="ro_RO" />
	<meta property="fb:app_id" content="" />
	<meta property="og:site_name" content="Tuning Solutions Online" />

	<!-- Twitter Meta Tags -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={getTranslatedString(metaTitle, $langStore)} />
	<meta
		property="twitter:description"
		content={getTranslatedString(
			"We offer auto tuning services at very good prices. Select your car's brand & model to check our prices or request one of our services.",
			$langStore
		)}
	/>
	<meta property="twitter:url" content="https://{domain}" />
	<meta property="twitter:image" content="https://{domain}/logo-large.png" />
</head>

<Nav activeIndex={2} />
<div class="bg-gray-800">
	<div class="container mx-auto p-10">
		<div class="block -m-2">
			{#each products as product}
				<a
					href="/{$langStore}/store/{product.url_label}"
					class="inline-flex flex-none w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] xl:w-[calc(100%/3-1rem)] pt-24 m-2 rounded-sm ring-1 ring-gray-200 bg-no-repeat bg-center bg-cover cursor-pointer hover:opacity-90 overflow-hidden {product?.out_of_stock ??
					false
						? 'opacity-50'
						: ''}"
					style="background-image: url('{product?.images?.[0] ?? '/media/white-audi.jpeg'}');"
				>
					<div
						class="flex w-full p-4 pt-24 bg-gradient-to-b from-transparent to-black/80 text-white"
					>
						<div class="flex w-full -my-1 text-lg leading-none flex-col justify-end items-start">
							<div class="flex my-1">
								<div class="flex -m-0.5">
									{#if product?.reduced_from_cost}
										<div
											class="m-0.5 p-0.5 px-1 rounded-sm bg-theme_primary-text text-theme_primary/50 font-bold line-through decoration-black"
										>
											{product.reduced_from_cost} €
										</div>
									{/if}
									{#if product?.reduced_percentage}
										<div
											class="m-0.5 p-0.5 px-1 rounded-sm bg-theme_primary-text text-theme_primary font-bold"
										>
											-{product.reduced_percentage}%
										</div>
									{/if}
									<div
										class="m-0.5 p-0.5 px-1 rounded-sm bg-theme_primary-text text-theme_primary font-bold"
									>
										{product.cost} €
									</div>
									{#if product?.out_of_stock ?? false}
										<div
											class="m-0.5 p-0.5 px-1 rounded-sm bg-theme_primary-text text-theme_primary font-bold"
										>
											{getTranslatedString('Out of stock', $langStore)}
										</div>
									{:else if !product?.reduced_from_cost && Date.now() - (product.added_ts ?? 0) < 1000 * 60 * 60 * 24 * 30}
										<div
											class="m-0.5 p-0.5 px-1 rounded-sm bg-theme_primary text-theme_primary-text border border-theme_primary-text font-bold"
										>
											NEW
										</div>
									{/if}
								</div>
							</div>
							<div class="my-1">{product.label}</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
