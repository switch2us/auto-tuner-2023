<script>
	import { getTranslatedString, langStore } from '../../tools/lang';

	import Nav from '../../components/header.svelte';
	import { domain, metaTitle } from '../../tools/domain';
</script>

<Nav activeIndex={4} />

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

<div class="flex p-4">
	<div class="container mx-auto">
		<div class="flex flex-col md:flex-row justify-center items-center w-[calc(100%+0.5rem)] -m-1">
			<div class="contact-card">
				<div class="flex">
					<div
						class="w-16 h-16 m-2 rounded-full border border-theme_primary-text bg-no-repeat bg-center bg-cover"
						style="background-image: url('/media/uk-flag.png');"
					/>
					<div
						class="w-16 h-16 m-2 rounded-full border border-theme_primary-text bg-no-repeat bg-center bg-cover"
						style="background-image: url('/media/italy-flag.png');"
					/>
				</div>
				<div class="flex my-2 text-xl font-light">WhatsApp English / Italian</div>
				<a
					class="my-10 mx-1 p-2 px-3 bg-green-600 bg-gradient-to-br from-green-500 to-green-700 text-white font-light rounded-full scale-1 hover:scale-125 ring-0 ring-theme_primary-text hover:ring-1 transition-transform"
					href="https://wa.me/+393296826699/"
					target="_blank"
					rel="external nofollow noopener"
					aria-label="Contact us on Whatsapp">+39-329-682-6699</a
				>
				<div class="my-2 mx-1 text-white text-opacity-50 font-bold">
					{getTranslatedString('Location in Italy', $langStore)}
				</div>
				<div class="my-2 mx-1 text-gray-100 font-semibold">
					Via Goffredo Mameli, 58, 30016 Lido di Jesolo VE, Italy
				</div>
				<a
					href="mailto:Tuningsolutionsonline@gmail.com"
					class="flex m-2 p-3 bg-theme_primary-text text-theme_primary rounded-sm leading-none"
					>tuningsolutionsonline@gmail.com</a
				>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.contact-card {
		@apply flex flex-col flex-1 justify-center items-center w-[calc(100%-0.5rem)] p-5 m-2 bg-theme_primary bg-gradient-to-br from-theme_primary to-theme_primary-dark text-theme_primary-text rounded-sm;
	}
</style>
