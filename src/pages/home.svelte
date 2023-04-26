<script>
	import Nav from '../components/header.svelte';
	import MediaSection from '../components/media-section.svelte';
	import TextSection from '../components/text-section.svelte';
	import BulletsSection from '../components/bullets-section.svelte';
	import { getTranslatedString, langStore } from '../tools/lang';
	import { domain, metaTitle } from '../tools/domain';
	import Slideshow from '../components/slideshow.svelte';

	let currentSlide = 0;
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

<Nav />

<Slideshow
	bind:index={currentSlide}
	minHeight={720}
	slides={[
		{ src: '/media/chip-tuning.jpeg' },
		{ src: '/media/tractor.jpeg' },
		{ src: '/media/ecu-chip-tuning.jpeg' }
	]}
>
	<div
		class="flex justify-center items-center w-full h-full bg-black/25 drop-shadow pointer-events-auto"
	>
		<div class="w-3/4 max-w-5xl">
			{#if currentSlide == 0}
				<MediaSection
					title="Custom made chiptuning and remap files"
					description="Chiptuning Flash is a specialist in optimising diesel and petrol engines. Our chip tuning
					files provide the difference in performance and consumption, by enhancing driving pleasure
					at the market most competitive prices."
					linkHref="/{$langStore}/contact"
					linkText="Trade Developers"
					useTertiarySecondaryColor
					notchedButton
					noBackground
				>
					<div slot="button" class="flex justify-center w-full">
						<a
							href="/{$langStore}/contact"
							class="flex bg-black text-white text-sm font-semibold leading-none p-2 px-3 rounded-full"
							>Public Customers</a
						>
					</div>
				</MediaSection>
			{:else if currentSlide == 1}
				<MediaSection
					title="ECM Remapping/Tuning for Tractors, Trucks and Plant machinery"
					description="With the ever-evolving world of the Agricultural, Construction and
				transportation machinery, Chiptuning Flash takes advantage of these
				modern systems to enhance performance / aid with fuel savings.
				Button: Special Services."
					linkHref="/{$langStore}/services"
					linkText="Special Services"
					noBackground
				/>
			{:else if currentSlide == 2}
				<MediaSection
					title="Become a Chiptuning Flash Partner!"
					description="Are you into tuning? We can help you pursue your passion by offering and helping you choose the correct Kit to get started. Furthermore, you will be part of an international network, with exclusive benefits."
					linkHref="/{$langStore}/contact"
					linkText="Find out more"
					useTertiaryColor
					noBackground
				/>
			{/if}
		</div>
	</div>
</Slideshow>

<MediaSection
	imageUrl="/media/white-audi.jpeg"
	title={getTranslatedString('Welcome to Chiptuning Flash', $langStore)}
	subtitle={metaTitle}
	marginBottom={true}
	linkHref="/{$langStore}/configurator"
	linkText="TUNNING FILE SERVICE"
	fullRoundedButton
>
	<div slot="description" class="flex w-full text-white text-justify py-2">
		{getTranslatedString(
			'We are class leading ECU Remapping specialist for Cars, Vans, Trucks, Agricultural & Plant Machinery, providing tuning files for Autotuner, Alientech and every other tunning tool. We are based in London, United Kingdom and we operate, through our network of partners, in all Europe and West Asia. We have the most advance genuine tooling that allows us to tune your vehicle safely and at the most competitive prices.',
			$langStore
		)}
		{getTranslatedString(
			'We offer complete tunning solutions such as Tunning Files, Tuning/Remapping Tools and Accessories, along with constant professional support.',
			$langStore
		)}
	</div>
</MediaSection>

<MediaSection
	imageUrl="/media/engine-special-function.jpeg"
	marginBottom
	fixedBackground
	dark
	title={getTranslatedString('Special function & solution', $langStore)}
	subtitle={getTranslatedString(
		'Autotunerflash  offer a wide range of services to both the Trade and Public.',
		$langStore
	)}
	titleBeforeSubtitle
	useSecondaryColor
	linkHref="/{$langStore}/services"
	linkText="Special function & solution"
	notchedButton
/>

<MediaSection
	imageUrl="/media/tools-wide.jpeg"
	subtitle={getTranslatedString('The perfect solution for a solid business.', $langStore)}
	title={getTranslatedString('Professional tools.', $langStore)}
	description="We offer the best solutions and professional tools to garages and dealers, aiming at a long-lasting partnership. Click the link below to find out the exclusive benefits and deals we offer."
	linkHref="/{$langStore}/store"
	linkText={getTranslatedString('Online store', $langStore)}
	useTertiarySecondaryColor={true}
	notchedButton={true}
	notchSize={12}
	marginBottom={true}
>
	<div slot="button" class="flex w-full justify-center items-center">
		<a href="/{$langStore}/contact" class="flex p-2 px-4 rounded-full bg-red-700 text-white"
			>Become a partner</a
		>
	</div>
</MediaSection>

<BulletsSection
	bullets={[
		{
			icon: true,
			title: getTranslatedString('Price', $langStore),
			description: getTranslatedString(
				'We offer our services at a cost-effective competitive pricing that provides more bang for your buck!',
				$langStore
			)
		},
		{
			icon: true,
			title: getTranslatedString('Trust', $langStore),
			description: getTranslatedString(
				'We use PayPay to ensure all our customers are eligible for PayPal Buyer Protection.',
				$langStore
			)
		},
		{
			icon: true,
			title: getTranslatedString('Fast', $langStore),
			description: getTranslatedString(
				'We pledge to do everything within our power to deliver modified files within 45 minutes.',
				$langStore
			)
		},
		{
			icon: true,
			title: getTranslatedString('Full support', $langStore),
			description: getTranslatedString(
				'We offer real-time support with a member of our team, to offer you peace of mind.',
				$langStore
			)
		},
		{
			icon: true,
			title: getTranslatedString('Experienced and trained tuners', $langStore),
			description: getTranslatedString('with 15+ years of tuning experience.', $langStore)
		},
		{
			icon: true,
			title: getTranslatedString('The best solutions guarantee', $langStore),
			description: getTranslatedString('we pledge to deliver consistent high', $langStore)
		},
		{
			icon: true,
			title: getTranslatedString('Global specialist', $langStore),
			description: getTranslatedString(
				'We are the result of a worldwide network of chip tuning specialists.',
				$langStore
			)
		}
	]}
	marginBottom={true}
	dark
	useThemeColors
>
	<i slot="icon-1" class="fa-solid fa-money-bills" />
	<i slot="icon-2" class="fa-solid fa-shield-halved" />
	<i slot="icon-3" class="fa-solid fa-stopwatch" />
	<i slot="icon-4" class="fa-solid fa-headset" />
	<i slot="icon-5" class="fa-solid fa-graduation-cap" />
	<i slot="icon-6" class="fa-solid fa-flag" />
	<i slot="icon-7" class="fa-solid fa-earth-americas" />
</BulletsSection>

<MediaSection
	imageUrl="/media/chip-tuning-auto.jpg"
	subtitle={getTranslatedString('Feedback', $langStore)}
	title={getTranslatedString('What our clients say?', $langStore)}
	dark={false}
	marginBottom={true}
	fixedBackground
>
	<div slot="description" class="flex flex-row flex-wrap my-4 md:my-8">
		{#each [{ name: 'Leo Martinov', description: '"Fitted a tuning kit to the van and it has transformed its performance, and has removed the flat spot on throttle response that the dealer couldn\'t fix. Great."' }, { name: 'John Bristol ', description: "\"I received the chip within a couple of days this was in the Christmas period as well. It was really easy to attach to my car Audi A4 only took about 5-10 minutes. The chip I bought was brilliant noticed the difference in acceleration straight away brought a massive smile to my face it's hard to say if I'm getting more mpg at the moment as I'm still enjoying the extra acceleration. Love it ❤️ 🦾👍\"" }, { name: 'Stevenhill', description: '"Been looking for a tuning  for a while now and came across these guys. Contacted their technical team and they were able to answer my questions immediately and were so helpful. So I ordered one file. Amazing. Great investment. Another car. Thank you"' }, { name: 'Jeremy', description: '"Very professional Silvio helped me understand my car more and what the parts do before installing it. Car runs better then ever! Will definitely be coming back if I need more mods. No problems at all."' }] as feedback}
			<div
				class="flex-auto w-full lg:w-2/5 xl:flex-1 p-4 mx-0 lg:mx-4 my-4 xl:my-0 bg-theme_primary text-theme_primary-text shadow-xl ring-2 ring-yellow-500 ring-opacity-75 ring-opacity-10 text-center"
			>
				<div class="flex flex-row justify-between items-start">
					<div class="text-theme_primary-text font-semibold text-left mr-1">{feedback.name}</div>
					<div class="flex flex-nowrap h-6 whitespace-nowrap justify-start items-center">
						{#each Array(5) as star}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="inline h-5 w-5 text-yellow-300"
								fill="currentColor"
								enable-background="new 0 0 24 24"
								viewBox="0 0 24 24"
								><path
									d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9
						C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7
						c0.1,0.1,0.3,0.1,0.5,0.1l0,0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"
								/></svg
							>
						{/each}
					</div>
				</div>
				<div class="text-left text-gray-200 text-sm my-4">
					{feedback.description}
				</div>
			</div>
		{/each}
	</div>
</MediaSection>
