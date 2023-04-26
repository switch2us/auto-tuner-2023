<script lang="ts">
	import type { Brand, Engine, Model, Year } from '../types/brands';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import PayPal from '../tools/paypal';
	import { getTranslatedString, langStore } from '../tools/lang';

	export let brand: Brand;
	export let brandId: string;
	export let model: Model;
	export let modelId: string;
	export let year: Year;
	export let yearId: string;
	export let engine: Engine;
	export let engineId: string;

	let buttonsSet = false;
	let paymentSuccess = false;
	let paymentId = '';

	let stageTwoPage = false;

	function setPayPalButtons() {
		if (buttonsSet) return;
		if (get(PayPal) == undefined) return;
		buttonsSet = true;
		get(PayPal)
			.Buttons({
				// Sets up the transaction when a payment button is clicked
				createOrder: function (data, actions) {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: engine.cost.toString(),
									currency_code: 'EUR',
									breakdown: {
										item_total: {
											value: engine.cost.toString(),
											currency_code: 'EUR'
										}
									}
								},

								items: [
									{
										name: `${brand.label} Stage I`.slice(
											0,
											125
										) /* Shows within upper-right dropdown during payment approval */,
										description:
											`${brand.label} ${model.label} ${year.label} ${engine.label}`.slice(
												0,
												125
											) /* Item details will also be in the completed paypal.com transaction view */,
										unit_amount: {
											currency_code: 'EUR',
											value: engine.cost.toString()
										},
										quantity: '1'
									}
								]
							}
						]
					});
				},

				// Finalize the transaction after payer approval
				onApprove: function (data, actions) {
					return actions.order.capture().then(function (orderData) {
						var transaction = orderData.purchase_units[0].payments.captures[0];
						paymentId = transaction.id as string;
						paymentSuccess = true;

						// alert(
						// 	'Transaction ' +
						// 		transaction.status +
						// 		': ' +
						// 		transaction.id +
						// 		'\n\nSee console for all available details'
						// );

						// When ready to go live, remove the alert and show a success message within this page. For example:
						// var element = document.getElementById('paypal-button-container');
						// element.innerHTML = '';
						// element.innerHTML = '<h3>Thank you for your payment!</h3>';
						// Or go to another URL:  actions.redirect('thank_you.html');
					});
				}
			})
			.render('#paypal-button-container');
	}

	onMount(setPayPalButtons);
	onMount(() => PayPal.subscribe(setPayPalButtons));
</script>

<div class="flex flex-col justify-center items-center p-10 border-b">
	<div
		class="flex w-12 h-12 rounded bg-no-repeat bg-center bg-contain"
		style="background-image: url('/brands/{brand.id}.png');"
	/>
	<div class="flex justify-center items-center text-center text-xs font-bold mt-2">
		{brand.label}
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
				{#if engine != undefined}
					<i class="fas fa-chevron-right text-sm text-gray-500" /><a
						class="breadcrumbs-item"
						href="/{$langStore}/configurator/{brand.url_label}/{model.url_label}/{year.url_label}/{engine.url_label}"
						>{engine.label}</a
					>
				{/if}
			{/if}
		{/if}
	</div>
	<div class="flex mb-4 -mx-1">
		<div
			on:click={() => {
				stageTwoPage = false;
			}}
			class="flex p-3 mx-1 text-sm leading-none font-semibold {stageTwoPage
				? 'bg-white text-red-500 border-red-500'
				: 'bg-red-500 text-white border-red-500'} border rounded cursor-pointer"
		>
			Stage 1
		</div>
		{#if engine.hasStage2}
			<div
				on:click={() => {
					stageTwoPage = true;
				}}
				class="flex p-3 mx-1 text-sm leading-none font-semibold {stageTwoPage
					? 'bg-red-500 text-white border-red-500'
					: 'bg-white text-red-500 border-red-500'} border rounded cursor-pointer"
			>
				Stage 2
			</div>
		{/if}
	</div>
	<table class="border" data-table="1">
		<tbody>
			<tr>
				<td class="border text-right p-2 md:p-4 lg:px-10" />
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-500 uppercase text-xs font-bold"
					>{getTranslatedString('Original', $langStore)}</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-500 uppercase text-xs font-bold"
					>{getTranslatedString('Tuning', $langStore)}</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-500 uppercase text-xs font-bold"
					>{getTranslatedString('Difference', $langStore)}</td
				>
			</tr>
			<tr>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-500 uppercase text-xs font-bold"
					>{getTranslatedString('Power', $langStore)}</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-700 text-sm font-bold"
					>{engine.power_ps} {getTranslatedString('hp', $langStore)}</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-700 text-sm font-bold"
					>{stageTwoPage ? engine.tuned_ower_ps_2 : engine.tuned_ower_ps}
					{getTranslatedString('hp', $langStore)}</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-700 text-sm font-bold"
					>+{(stageTwoPage ? engine.tuned_ower_ps_2 : engine.tuned_ower_ps) - engine.power_ps}
					{getTranslatedString('hp', $langStore)}</td
				>
			</tr>
			<tr>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-500 uppercase text-xs font-bold"
					>{getTranslatedString('Torque', $langStore)}</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-700 text-sm font-bold"
					>{engine.power_nm} Nm</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-700 text-sm font-bold"
					>{stageTwoPage ? engine.tuned_power_nm_2 : engine.tuned_power_nm} Nm</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-gray-700 text-sm font-bold"
					>+{(stageTwoPage ? engine.tuned_power_nm_2 : engine.tuned_power_nm) - engine.power_nm} Nm</td
				>
			</tr>
			<tr>
				<td
					class="border text-right p-2 md:p-4 lg:px-10 text-gray-500 uppercase text-xs font-bold"
					colspan="3">{getTranslatedString('Price', $langStore)}</td
				>
				<td class="border text-right p-2 md:p-4 lg:px-10 text-xl font-bold text-red-500">
					{#if stageTwoPage}
						Contact us
					{:else}
						€ {engine.cost}
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div
		class="flex w-full relative z-10 before:block before:-z-10 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-red-200 before:animate-pulse justify-center text-center text-xl border-2 border-theme_primary text-theme_primary p-2 rounded-sm font-bold my-5"
	>
		70€ each file for our partners

		<a
			class="mx-1 p-1 bg-white hover:bg-green-600 text-black hover:text-white rounded-full scale-1 hover:scale-125 transition-transform opacity-75 hover:opacity-100"
			href="https://wa.me/+393296826699/"
			target="_blank"
			rel="external nofollow noopener"
			aria-label="Contact us on Whatsapp"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="currentColor"
				enable-background="new 0 0 24 24"
				viewBox="0 0 24 24"
				><path
					d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1
			c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5
			c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3
			c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7
			c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14
			 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9
			C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3
			C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9"
				/></svg
			>
		</a>
	</div>
	<div
		class="flex max-w-xs mx-auto justify-center items-center text-justify mt-10 text-gray-700 {stageTwoPage
			? 'hidden'
			: ''}"
	>
		<div>
			By pressing the following buttons to purchase our products you automatically agree with our <a
				href="/en/terms-and-conditions"
				class="inline-flex text-theme_primary font-bold">Terms and Conditions</a
			>
		</div>
	</div>
	<div
		class="relative flex justify-center items-center pt-10 z-1 overflow-hidden {stageTwoPage
			? 'hidden'
			: ''}"
	>
		<div id="paypal-button-container" />
	</div>
	<div
		class="flex flex-col justify-center items-center my-10 text-gray-700 {!stageTwoPage
			? 'hidden'
			: ''}"
	>
		<div>For Stage 2 or more information, please contact us at</div>
		<a
			href="mailto:Tuningsolutionsonline@gmail.com"
			class="flex m-2 p-3 bg-theme_primary text-theme_primary-text rounded-sm leading-none"
			>tuningsolutionsonline@gmail.com</a
		>
	</div>
</div>
{#if paymentSuccess}
	<div
		class="flex flex-col fixed z-[1000000] top-0 bottom-0 left-0 right-0 bg-white/95 overflow-y-scroll"
	>
		<div class="flex flex-col justify-start items-center m-10 mt-[10vh]">
			<div class="flex justify-center text-2xl text-blue-500 font-bold">
				Payment successfully made!
			</div>
			<div><i class="fas fa-check-circle text-5xl mt-5 text-blue-500" /></div>
			<div class="flex mt-10 text-sm font-semibold text-gray-500">
				Payment ID: {paymentId}
			</div>
			<div class="flex mt-2 text-xl font-semibold text-gray-700">
				{engine.cost} €
			</div>
			<div class="flex mt-2 text-lg font-semibold text-gray-500">
				{brand.label}
				{model.label}
				{year.label}
				{engine.label}
			</div>
			<div class="flex mt-10">
				Please send your file at&nbsp;<b>Tuningsolutionsonline@gmail.com</b>
			</div>
			<a
				href="mailto:Tuningsolutionsonline@gmail.com"
				class="flex mt-5 bg-blue-500 text-white text-lg font-bold leading-none p-4 px-8 rounded-full"
				>Open email app</a
			>
			<div
				on:click={() => {
					paymentSuccess = false;
				}}
				class="flex mt-20 p-4 px-8 border rounded-full text-sm font-bold cursor-pointer text-gray-500 hover:text-gray-800"
			>
				OK. I'm done
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.select-item-title {
		@apply flex mx-1 p-1 px-2 text-lg font-semibold;
	}
	.select-item {
		@apply flex p-2 mx-1 hover:bg-gray-100 text-gray-700 text-base border-[0.5px] border-x first-of-type:border-t last-of-type:border-b cursor-pointer;
	}
	.select-item.selected {
		@apply bg-theme_primary text-theme_primary-text;
	}
	.breadcrumbs-item {
		@apply inline-flex flex-none p-1 px-2 m-1 hover:bg-orange-600 text-orange-600 hover:text-white text-sm font-bold rounded cursor-pointer;
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
	:global(#paypal-button-container iframe) {
		z-index: 1 !important;
	}
</style>
