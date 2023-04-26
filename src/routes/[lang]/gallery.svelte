<script>
	import { getTranslatedString, langStore } from '../../tools/lang';

	import { onMount } from 'svelte';
	import Nav from '../../components/header.svelte';
	import { domain, metaTitle } from '../../tools/domain';

	function runPlugin() {
		(function (d, s, id) {
			const existingScript = document.getElementById(id);
			if (existingScript != null) existingScript.remove();
			var js;
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			// @ts-ignore
			js.src = 'https://embedsocial.com/cdn/ht.js';
			d.getElementsByTagName('head')[0].appendChild(js);
		})(document, 'script', 'EmbedSocialHashtagScript');
	}

	onMount(runPlugin);
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

<Nav activeIndex={5} />

<div class="container mx-auto p-4 md:p-10">
	<div class="embedsocial-hashtag" data-ref="502f287dc308f9fba132526c2532f303c3e4151b" />
</div>
