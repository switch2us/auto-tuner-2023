<script lang="ts">
	import Nav from '../components/header.svelte';
	import MediaSection from '../components/media-section.svelte';
	import TextSection from '../components/text-section.svelte';
	import BulletsSection from '../components/bullets-section.svelte';
	import { getTranslatedString, langStore, defaultLang } from '../tools/lang';
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
</svelte:head>

<Nav activeIndex={3} />

<MediaSection imageUrl="/media/engine-special-function.jpeg" marginBottom fixedBackground dark>
	<div slot="title" class="text-white">
		<ol class="w-full text-justify list-decimal text-lg">
			<strong><li class="text-2xl my-20 mb-5">ECU Remapping</li></strong>
			<div>
				<strong class="flex mt-5 mb-1">ECU Remapping & Tuning</strong>
				<p>
					All modern Cars and Vans are fitted with an ECU or ECM (Electronic control unit/module).
					This is essentially the engines brain, a built-in processor which receives signals and
					readings from various sensors on the engine. By taking a read of the software installed on
					the ECU known as the “map”, we can then modify the map and customise it to suit your need.
					We then write the modified map back on to the ECU. We have Remapping / Tuning solutions
					for Cars and Vans of almost every make on the road.
				</p>
				<a href="/{$langStore}/services/ecu-remapping" class="mt-4 inline-block bg-theme_primary hover:bg-theme_primary-dark ring-theme_primary text-theme_primary-text ring-4 ring-opacity-50 border-0 font-semibold p-2 px-4 rounded-full font-light">Read More</a>
				
			</div>
			<strong><li class="text-2xl my-20 mb-5">DPF Delete</li></strong>
			<div>
				<strong class="flex mt-5 mb-1">What is a DPF Filter? (Diesel Particulate Filter)</strong>
				<p>
					A DPF Filter is made up of precious metals in a honeycomb shaped element. It’s fitted to
					the vehicles exhaust system and is designed to catch soot particles from the exhaust
					gases. It is a self-cleaning filter which is carried out by a process called regeneration
					(regen for short), which is controlled by the engines ECU. There are many factors that
					need to be reached in order for the filter to be successfully regen’d, No faults stored in
					the ECU, Exhaust gas temperature to be within the correct parameters, Exhaust back
					pressure to be within the correct parameters and much much more...
				</p>
				<a href="/{$langStore}/services/dpf-delete" class="mt-4 inline-block bg-theme_primary hover:bg-theme_primary-dark ring-theme_primary text-theme_primary-text ring-4 ring-opacity-50 border-0 font-semibold p-2 px-4 rounded-full font-light">Read More</a>
				
			</div>

			<strong><li class="text-2xl my-20 mb-5">EGR Delete</li></strong>
			<div>
				<strong class="flex mt-5 mb-1"
					>What is an EGR Valve (Exhaust Gas Recirculation Valve)?</strong
				>
				<p>
					An EGR valve recirculates exhaust gases back through the engine’s inlet manifold at
					various engine RPMs controlled by the ECU. Some are vacuum controlled and some
					electronically. Why recirculate dirty exhaust fumes back through the inlet manifold?
					Believe it or not this lowers the combustion temperature which in turn lowers the amount
					of NOx (nitrogen oxide) produced by the engine. Due to the dirty fumes passing through the
					EGR valve and inlet manifold this can cause a carbon build up. In turn this can block the
					EGR valve, causing it to stick open....
				</p>
				<a href="/{$langStore}/services/egr-delete" class="mt-4 inline-block bg-theme_primary hover:bg-theme_primary-dark ring-theme_primary text-theme_primary-text ring-4 ring-opacity-50 border-0 font-semibold p-2 px-4 rounded-full font-light">Read More</a>
			</div>

			<strong><li class="text-2xl my-20 mb-5">AdBlue Delete</li></strong>
			<div>
				<strong class="flex mt-5 mb-1">What is AdBlue / SCR (Selective Catalytic Reduction)?</strong
				>
				<p>
					AdBlue / SCR is an emission-based exhaust after-treatment system, designed to lower NOx
					emissions. What is done when doing an AdBlue delete? We disable the AdBlue function from
					the ECU, in some cases we also need to get a read from the DCU (dosing control module).
					With this function disabled there will be no more warning lights, limp mode or even worse,
					no start condition...
				</p>
				<a href="/{$langStore}/services/adblue-delete" class="mt-4 inline-block bg-theme_primary hover:bg-theme_primary-dark ring-theme_primary text-theme_primary-text ring-4 ring-opacity-50 border-0 font-semibold p-2 px-4 rounded-full font-light">Read More</a>
				
			</div>

			<strong><li class="text-2xl my-20 mb-5">Speed Limiter Removal</li></strong>
			<div>
				<strong class="flex mt-5 mb-1"
					>What is a Speed limiter and why does my vehicle have one?</strong
				>
				<p>
					We mainly remove speed limiters from commercial vehicles. Speed limiters are generally set
					for insurance purposes and fleet vehicles are also common to be limited...
				</p>
				<a href="/{$langStore}/services/speed-limiter-removal" class="mt-4 inline-block bg-theme_primary hover:bg-theme_primary-dark ring-theme_primary text-theme_primary-text ring-4 ring-opacity-50 border-0 font-semibold p-2 px-4 rounded-full font-light">Read More</a>
			</div>

			<strong><li class="text-2xl my-20 mb-5">DSG and ZF Gearbox Remapping</li></strong>
			<div>
				<strong class="flex mt-5 mb-1">VAG DSG & BMW ZF Gearbox Tuning / Remapping</strong>
				<p>
					Arguably one of the finest automatic gearboxes to be made. Split second gear changes,
					silky smooth gear changes, predicting the drivers next move are just some of the
					advantages. As with all OEM system, they are restricted. Our custom tuning allows us to
					unlock the DSG’s full potential, below are some of the modifications we make. A DSG remap
					is recommended when carrying out a stage 2 remap on VAG vehicles...
				</p>
				<a href="/{$langStore}/services/dsg-and-zf-gearbox-remapping" class="mt-4 inline-block bg-theme_primary hover:bg-theme_primary-dark ring-theme_primary text-theme_primary-text ring-4 ring-opacity-50 border-0 font-semibold p-2 px-4 rounded-full font-light">Read More</a>
			</div>
		</ol>

		<strong><li class="text-2xl my-20 mb-5 list-outside">Special Functions</li></strong>
		<div>
			<p>
				The available modules allow costumers to perform many unique modifications such as AGS
				removal, DPF removal, DTC removal, AdBlue removal, Burbles Activation, Popcorn Activation,
				IMMO removal, Cold Start Noise Reduction, Hot Start Fix, Boost Sensor Calibration, Kickdown
				Deactivation, Sport Displays Calibration, Flaps removal, MAF removal, EGR removal, Lambda/O2
				removal, Speed Limiter removal, torq monitor, DTC, glow plugs, Hardcut, readiness, Special
				repairs, Start Stop, Trot remove, tuning protection, TVA, water pump removing vag pcr 2.1
				edc17, y75 removing mercedes benz, Ford gate problem, mercedes benz edc16c31 / c36 m55
				error, immo flash, immo eeprom / eprom, fiat immo 29f400 edc15c7, Marella 8f3 Revirgin
				eprom, psa edc15 / edc17, vag immo me7, mercedes Start error fixed, Evap, emmision monitor
				off, opf, recovery, original files provide, and much more.
			</p>
		</div>

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
