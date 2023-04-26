<script>
	import { getTranslatedString, langStore } from '../../tools/lang';

	import Nav from '../../components/header.svelte';
	import { domain, metaTitle } from '../../tools/domain';
	import MediaSection from '../../components/media-section.svelte';
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

<MediaSection
	titleBeforeSubtitle
	title="About Us"
	subtitle="Chiptuning Flash specializes in making engines more powerful, faster, smoother, more economical and cleaner. We have an expert team of software developers and a worldwide network of ECU programmers who together ensure that our chip tuning files are always provided with the highest quality.
Every customer has their custom chip tuning wishes and expectations. We know better than anyone that every car and driving style is different. That is why we only supply fully customized chip tuning files: after all, you want to get the most out of your car, just like us!
Our files guarantee more engine power, higher torque, more powerful performance, improved drivability and a smoother response to the accelerator pedal. That way accelerating your vehicle will be more fun than ever. And what about lower fuel consumption and cleaner emissions? You read that right: we know how to combine power with efficiency. All in order to benefit your wallet.
The quality of our chiptuning files has proven itself in several ways. All our chip tuning files are extensively tested on the road and on advanced dynamometer. This means that we always deliver chiptuning files with the perfect combination of better performance and fuel savings.
Car companies, garages, business and private (end) users benefit from our many years of experience in the chiptuning sector. With branches, customers and knowledge all over the world. Quality and satisfaction are our number one priority."
/>
