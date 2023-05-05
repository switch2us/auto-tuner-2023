<script lang="ts">
	import Nav from '../components/header.svelte';
	import MediaSection from '../components/media-section.svelte';
	import TextSection from '../components/text-section.svelte';
	import BulletsSection from '../components/bullets-section.svelte';
	import { getTranslatedString, langStore } from '../tools/lang';
	import { domain, metaTitle } from '../tools/domain';
	import PayPal from '../tools/paypal';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	let buttonsSet = false;
	let paymentSuccess = false;
	let paymentId = '';
	let unitPrice = 30;
	let units = 1;
	$: units = units > 100 ? 100 : units < 1 ? 1 : units;

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
									value: String(unitPrice * units),
									currency_code: 'EUR',
									breakdown: {
										item_total: {
											value: String(unitPrice * units),
											currency_code: 'EUR'
										}
									}
								},

								items: [
									{
										name: 'Special function & solution package'.slice(
											0,
											125
										) /* Shows within upper-right dropdown during payment approval */,
										description: `Special function & solution package`.slice(
											0,
											125
										) /* Item details will also be in the completed paypal.com transaction view */,
										unit_amount: {
											currency_code: 'EUR',
											value: String(unitPrice * units)
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
					});
				}
			})
			.render('#paypal-button-container');
	}

	onMount(setPayPalButtons);
	onMount(() => PayPal.subscribe(setPayPalButtons));
</script>

<svelte:head>
	<link rel="canonical" href="https://{domain}/{$langStore}/services/dsg-and-zf-gearbox-remapping" />

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
</svelte:head>

<Nav activeIndex={3} />

<MediaSection imageUrl="/media/engine-special-function.jpeg" marginBottom fixedBackground dark>
	<div slot="title" class="text-white">
		<ol class="w-full text-justify list-decimal text-lg">
			<strong><li class="text-2xl my-20 mb-5">DSG and ZF Gearbox Remapping</li></strong>
			<div>
				<strong class="flex mt-5 mb-1">VAG DSG & BMW ZF Gearbox Tuning / Remapping</strong>
				<p>
					Arguably one of the finest automatic gearboxes to be made. Split second gear changes,
					silky smooth gear changes, predicting the drivers next move are just some of the
					advantages. As with all OEM system, they are restricted. Our custom tuning allows us to
					unlock the DSG’s full potential, below are some of the modifications we make. A DSG remap
					is recommended when carrying out a stage 2 remap on VAG vehicles
				</p>
				<strong class="flex mt-5 mb-1">Increase torque limiters</strong>
				<p>
					We can increase the torque limiters of the gearbox to match that of the engine, meaning
					you are getting the full potential from both engine & gearbox.
				</p>
				<strong class="flex mt-5 mb-1">Launch control</strong>
				<p>
					We can calibrate the TCU to activate launch control, get the perfect take off every launch
					and lower your 1⁄4 Mile times or just add to the fun factor – (If applicable).
				</p>
				<strong class="flex mt-5 mb-1">Faster shift speeds</strong>
				<p>
					We can improve shift time by up to 20%, improved acceleration and less lag, smother gear
					changes from both the paddle flaps and auto mode.
				</p>
				<strong class="flex mt-5 mb-1">Shift set points & Raised RPM limits</strong>
				<p>
					RPM limits and shift set points can be adjusted in drive and sports mode. Adjusting the
					rpm limiter as part of the engine ECU remap is not enough on a DSG equipped vehicle.
				</p>
				<strong class="flex mt-5 mb-1">Full manual mode</strong>
				<p>
					This allows us to calibrate the TCU to allow you to have full control on when the DSG
					changes gear, no unwanted up/downshifts.
				</p>
			</div>
		</ol>
		<div class="flex w-full mt-48">
			<div
				class="relative flex flex-col justify-start items-center w-[calc(100%-2.5rem)] md:w-96 bg-white/75 text-black rounded p-8 mx-auto z-1 overflow-hidden"
			>
				<h2>Choose units of packages</h2>
				<input type="number" class="my-2 text-center p-2" bind:value={units} min="1" max="100" />
				<div class="flex w-full justify-center text-2xl text-theme_primary font-bold mb-5">
					{(unitPrice * units).toLocaleString('ro-RO')} €
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
				<div id="paypal-button-container" />
			</div>
		</div>
	</div>
</MediaSection>

{#if paymentSuccess}
	<div class="flex flex-col fixed z-[1000000] top-0 bottom-0 left-0 right-0 bg-white/95 overflow-y-scroll">
		<div class="flex flex-col justify-start items-center m-10 mt-[10vh]">
			<div class="flex justify-center text-2xl text-blue-500 font-bold">
				Payment successfully made!
			</div>
			<div><i class="fas fa-check-circle text-5xl mt-5 text-blue-500" /></div>
			<div class="flex mt-10 text-sm font-semibold text-gray-500">
				Payment ID: {paymentId}
			</div>
			<div class="flex mt-2 text-xl font-semibold text-gray-700">
				{unitPrice * units} €
			</div>
			<div class="flex mt-2 text-lg font-semibold text-gray-500">Special function & solution</div>
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
