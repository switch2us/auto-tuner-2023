<script lang="ts">
	import { getTranslatedString, langStore } from '../tools/lang';

	import type { Brand, Engine, Model, Year } from '../types/brands';

	export let brand: Brand;
	export let brandId: string;
	export let model: Model;
	export let modelId: string;
	export let year: Year;
	export let yearId: string;
	export let engine: Engine;
	export let engineId: string;

	let electricEngines = [];
	let hybridEngines = [];
	let dieselEngines = [];
	let benzinEngines = [];

	const energyTypes = ['electrisch', 'hybrid', 'benzin', 'diesel'];

	function setEngines() {
		electricEngines = [];
		hybridEngines = [];
		dieselEngines = [];
		benzinEngines = [];
		(year?.engines ?? []).map((engine) => {
			if (engine.energy_type == 'elektrisch') electricEngines.push(engine);
			else if (engine.energy_type == 'hybrid') hybridEngines.push(engine);
			else if (engine.energy_type == 'diesel') dieselEngines.push(engine);
			else benzinEngines.push(engine);
		});
	}

	$: year, setEngines();
</script>

<div class="bg-gray-800 text-white">
	<div class="flex flex-col justify-center items-center p-10 border-b border-gray-500">
		<div class="flex p-4 bg-white rounded-full">
			<div
				class="flex w-12 h-12 rounded bg-no-repeat bg-center bg-contain"
				style="background-image: url('/brands/{brand.id}.png');"
			/>
		</div>
		<div class="flex flex-col justify-center items-center text-center text-xs font-bold mt-4">
			{brand.label}
			<div class="text-base font-light mt-5">
				{#if model == undefined}
					{getTranslatedString('Select the model', $langStore)}
				{:else if year == undefined}
					{getTranslatedString('Select the generation', $langStore)}
				{:else}
					{getTranslatedString('Select the engine', $langStore)}
				{/if}
			</div>
		</div>
	</div>
	<div class="flex flex-col container mx-auto p-10">
		<div class="pb-10">
			<a class="breadcrumbs-item" href="/{$langStore}/configurator"
				>{getTranslatedString('All brands', $langStore)}</a
			>
			<i class="fas fa-chevron-right text-sm text-gray-500" /><a
				class="breadcrumbs-item"
				href="/{$langStore}/configurator/{brand.url_label}">{brand.label}</a
			>
			{#if model != undefined}
				<i class="fas fa-chevron-right text-sm text-gray-500" /><a
					class="breadcrumbs-item"
					href="/{$langStore}/configurator/{brand.url_label}/{model.url_label}">{model.label}</a
				>
				{#if year != undefined}
					<i class="fas fa-chevron-right text-sm text-gray-500" /><a
						class="breadcrumbs-item"
						href="/{$langStore}/configurator/{brand.url_label}/{model.url_label}/{year.url_label}"
						>{year.label}</a
					>
				{/if}
			{/if}
		</div>
		<div
			class:selecting-model={brand != undefined && model == undefined}
			class:selecting-year={model != undefined && year == undefined}
			class:selecting-engine={year != undefined && engine == undefined}
			class="flex w-full"
		>
			<div class="model-selection-group selection-group">
				<div class="select-item-title">{brand.label}</div>
				{#each brand.models as model}
					<a
						href="/{$langStore}/configurator/{brand.url_label}/{model.url_label}"
						class:selected={modelId == model.id}
						class="select-item">{model.label ?? 'Inavlid model'}</a
					>
				{/each}
			</div>
			{#if model != undefined}
				<div class="year-selection-group selection-group">
					<div class="select-item-title">{model.label}</div>
					{#each model.years as year}
						<a
							href="/{$langStore}/configurator/{brand.url_label}/{model.url_label}/{year.url_label}"
							class:selected={yearId == year.id}
							class="select-item">{year.label ?? 'Invalid year'}</a
						>
					{/each}
				</div>
			{/if}
			{#if year != undefined}
				<div class="engine-selection-group selection-group">
					<div class="select-item-title">{year.label}</div>
					{#each [0, 1, 2, 3] as i}
						{#if (i == 3 ? electricEngines : i == 2 ? hybridEngines : i == 1 ? dieselEngines : benzinEngines).length > 0}
							<div class="select-item-title border-t-[0.5px]">
								{i == 3
									? getTranslatedString('Electric', $langStore)
									: i == 2
									? getTranslatedString('Hybrid', $langStore)
									: i == 1
									? getTranslatedString('Diesel', $langStore)
									: getTranslatedString('Gasoline', $langStore)}
							</div>
							{#each i == 3 ? electricEngines : i == 2 ? hybridEngines : i == 1 ? dieselEngines : benzinEngines as engine}
								<a
									href="/{$langStore}/configurator/{brand.url_label}/{model.url_label}/{year.url_label}/{engine.url_label}"
									class:selected={engineId == engine.id}
									class="select-item"
									>{engine.label ?? 'Invalid engine'}
									<div class="ml-auto pl-1">
										{engine.power_ps}
										{getTranslatedString('hp', $langStore)}
									</div></a
								>
							{/each}
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.select-item-title {
		@apply flex mx-1 p-2 px-4 text-lg font-semibold bg-gray-700 border border-b-[0.5px];
	}
	.select-item {
		@apply flex p-2 px-4 mx-1 bg-gray-800 hover:bg-gray-100 text-gray-200 hover:text-gray-800 text-base font-light border-[0.5px] border-x first-of-type:border-t last-of-type:border-b cursor-pointer;
	}
	.select-item.selected {
		@apply bg-orange-500 text-theme_primary-text;
	}
	.breadcrumbs-item {
		@apply inline-flex flex-none p-1 px-2 m-1 hover:bg-orange-500 text-orange-500 hover:text-white text-sm font-bold rounded cursor-pointer;
	}
	.selection-group {
		@apply hidden md:flex w-full md:w-1/3 flex-grow-0 flex-col;
	}
	.selecting-model .model-selection-group {
		@apply flex;
	}
	.selecting-year .year-selection-group {
		@apply flex;
	}
	.selecting-engine .engine-selection-group {
		@apply flex;
	}
</style>
