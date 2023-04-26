<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '../../../components/header.svelte';
	import { brands } from '../../../types/brands';
	import type { Brand, Model, Year, Engine } from '../../../types/brands';
	import ConfiguratorChooseBrand from '../../../pages/configurator-choose-brand.svelte';
	import ConfiguratorChooseProduct from '../../../pages/configurator-choose-product.svelte';
	import ConfiguratorViewProduct from '../../../pages/configurator-view-product.svelte';
	import { getTranslatedString, langStore } from '../../../tools/lang';
	import { domain, metaTitle } from '../../../tools/domain';

	let paths: string[] = $page.params['paths'].split('/');
	let brand: Brand;
	let brandId: string;
	let model: Model;
	let modelId: string;
	let year: Year;
	let yearId: string;
	let engine: Engine;
	let engineId: string;

	function getEngine() {
		if (paths.length > 3) {
			const engines = year.engines;
			engineId = paths[3].split('-').pop();
			for (let i = 0; i < engines.length; i++) {
				if (engines[i].id == engineId) {
					engine = engines[i];
					return;
				}
			}
		}
	}

	function getYear() {
		if (paths.length > 2) {
			const years = model.years;
			yearId = paths[2].split('-').pop();
			for (let i = 0; i < years.length; i++) {
				if (years[i].id == yearId) {
					year = years[i];
					getEngine();
					return;
				}
			}
		}
	}

	function getModel() {
		if (paths.length > 1) {
			const models = brand.models;
			modelId = paths[1].split('-').pop();
			for (let i = 0; i < models.length; i++) {
				if (models[i].id == modelId) {
					model = models[i];
					getYear();
					return;
				}
			}
		}
	}

	function getBrand(_params = null) {
		brand = undefined;
		brandId = undefined;
		model = undefined;
		modelId = undefined;
		year = undefined;
		yearId = undefined;
		engine = undefined;
		engineId = undefined;
		if (paths.length > 0) {
			brandId = paths[0].split('-').pop();
			for (let i = 0; i < brands.length; i++) {
				if (brands[i].id == brandId) {
					brand = brands[i];
					getModel();
					return;
				}
			}
		}
	}

	getBrand();

	$: {
		paths = $page.params['paths'].split('/');
		getBrand();
	}
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

<Nav activeIndex={1} />

{#if brand == undefined}
	<ConfiguratorChooseBrand {brands} />
{:else if engine == undefined}
	<ConfiguratorChooseProduct
		{brand}
		{brandId}
		{model}
		{modelId}
		{year}
		{yearId}
		{engine}
		{engineId}
	/>
{:else}
	<ConfiguratorViewProduct
		{brand}
		{brandId}
		{model}
		{modelId}
		{year}
		{yearId}
		{engine}
		{engineId}
	/>
{/if}
