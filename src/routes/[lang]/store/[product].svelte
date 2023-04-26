<script lang="ts">
	import { page } from '$app/stores';
	import { getTranslatedString, langStore } from '../../../tools/lang';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import Nav from '../../../components/header.svelte';
	import PayPal from '../../../tools/paypal';
	import type { Product } from '../../../types/products';
	import { products } from '../../../types/products';
	import { domain, metaTitle } from '../../../tools/domain';

	let product: Product;

	function getProduct() {
		try {
			product = undefined;
			const id = $page.params['product'].split('-id-')[1];
			for (let i = 0; i < products.length; i++) {
				if (products[i].id == id) {
					product = products[i];
					break;
				}
			}
		} catch (error) {}
	}
	getProduct();

	onMount(getProduct);

	let buttonsSet = false;
	let paymentSuccess = false;
	let paymentId = '';

	function setPayPalButtons() {
		if (buttonsSet) return;
		if (product?.out_of_stock ?? false) return;
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
									value: product.cost.toString(),
									currency_code: 'EUR',
									breakdown: {
										item_total: {
											value: product.cost.toString(),
											currency_code: 'EUR'
										}
									}
								},

								items: [
									{
										name: `${product.label}`.slice(
											0,
											125
										) /* Shows within upper-right dropdown during payment approval */,
										description: `Store: ${product.label}`.slice(
											0,
											125
										) /* Item details will also be in the completed paypal.com transaction view */,
										unit_amount: {
											currency_code: 'EUR',
											value: product.cost.toString()
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
						// Successful capture! For dev/demo purposes:
						var transaction = orderData.purchase_units[0].payments.captures[0];
						paymentId = transaction.id as string;
						paymentSuccess = true;

						// console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

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

<div class="bg-white text-black">
	<div class="container mx-auto p-10">
		<div
			class="flex flex-col md:flex-row justify-start md:justify-center items-center md:items-start -m-5"
		>
			<div
				class="flex flex-col justify-start items-center w-[calc(100%-2.5rem)] md:w-[calc(500px-2.5rem)] md:max-w-[calc(100%-2.5rem)] m-5"
			>
				<div class="flex justify-center w-full">
					<img class="flex w-full rounded-sm" src={product?.images?.[0]} alt={product.label} />
				</div>
				<div class="flex justify-start w-full text-xl font-bold my-10">{product.label}</div>
				<div class="flex justify-start w-full mb-10 whitespace-pre-line">{product.description}</div>
				{#if product?.images?.length > 1}
					<div class="flex flex-col items-center w-full -my-1">
						{#each product?.images as image, i}
							{#if i > 0}
								<img class="flex w-full rounded-sm my-1" src={image} alt="{product.label} #{i}" />
							{/if}
						{/each}
					</div>
				{/if}
			</div>
			<div
				class="relative flex flex-col justify-start items-center w-[calc(100%-2.5rem)] md:w-96 m-5 z-1 overflow-hidden"
			>
				{#if product?.reduced_from_cost}
					<div
						class="mb-2 p-0.5 px-1 rounded-sm text-theme_primary/50 font-bold line-through decoration-black"
					>
						{product.reduced_from_cost} €
					</div>
				{/if}
				{#if product?.reduced_percentage}
					<div
						class="mb-2 p-0.5 px-1 rounded-sm bg-theme_primary text-theme_primary-text font-bold"
					>
						-{product.reduced_percentage}%
					</div>
				{/if}
				<div class="flex w-full justify-center text-2xl text-theme_primary font-bold mb-5">
					{product.cost} €
				</div>
				{#if product?.out_of_stock ?? false}
					<div
						class="flex w-full justify-center text-2xl bg-theme_primary text-theme_primary-text py-2 rounded-sm font-bold mb-5"
					>
						{getTranslatedString('Out of stock', $langStore)}
					</div>
				{:else if !product?.reduced_from_cost && Date.now() - (product.added_ts ?? 0) < 1000 * 60 * 60 * 24 * 30}
					<div
						class="flex w-full justify-center text-2xl bg-theme_primary text-theme_primary-text py-2 rounded-sm font-bold mb-5"
					>
						NEW
					</div>
				{/if}
				<div
					class="flex w-full relative z-10 before:block before:-z-10 before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-red-200 before:animate-pulse justify-center text-center text-xl border-2 border-theme_primary text-theme_primary p-2 rounded-sm font-bold mb-5"
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
					class="flex max-w-xs mx-auto justify-center items-center text-justify mb-5 text-gray-700"
				>
					<div>
						By pressing the following buttons to purchase our products you automatically agree with
						our <a href="/en/terms-and-conditions" class="inline-flex text-theme_primary font-bold"
							>Terms and Conditions</a
						>
					</div>
				</div>
				{#if !(product?.out_of_stock ?? false)}
					<div id="paypal-button-container" />
				{/if}
			</div>
		</div>
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
				{product.cost} €
			</div>
			<div class="flex mt-2 text-lg font-semibold text-gray-500">
				Store: {product.label}
			</div>
			<div class="flex mt-10">
				If you have any questions, please email us at&nbsp;<b>Tuningsolutionsonline@gmail.com</b>
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
	:global(#paypal-button-container iframe) {
		z-index: 1 !important;
	}
</style>
