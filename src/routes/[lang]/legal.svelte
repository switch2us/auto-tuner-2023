<script>
	import Header from '../../components/header.svelte';
</script>

<Header activeIndex={-1} />
<div class="container mx-auto p-10">
	<h1 class="flex justify-center text-center text-2xl font-bold my-10">Legal Information</h1>
	<div class="body-content flex flex-col justify-center text-justify my-10">
		<p>
			Best CAR Solutions Ltd T/A Chiptuning Flash are an independent company and all manufacturers’
			logos and trademarks shown within this website are the property of their respective owners and
			in no way shall be interpreted as an endorsement.
		</p>
		<p>
			These web pages are Copyright © 2008-2022 of Best CAR Solutions Ltd T/A Chiptuning Flash with
			all rights reserved. All material on this site is the property of Best CAR Solutions Ltd
			unless otherwise stated. You are not permitted to take any information, photographs or text
			from this site, whole or in part, without written permission from Best CAR Solutions Ltd.
		</p>
		<p>
			You are permitted to print or copy the documents for personal use only. Therefore, you are
			allowed to make a copy of a document for your own reference only, retaining the original
			author for reference. The webmaster and hosting company for this site are not associated with
			the any vehicle manufacturing group whatsoever and are not responsible for any damages as a
			result of using the information provided here.
		</p>
		<p>
			Use of any of the information found on this site is welcome for private use only but use it at
			your OWN risk. Best CAR Solutions T/A Chiptuning Flash, the authors or webmaster are not
			liable or legally responsible for any damages that result from the use of the information
			provided on the site.
		</p>
	</div>
</div>

<style lang="postcss">
	.body-content > :global(h2) {
		@apply py-5 text-gray-800 text-xl font-bold;
	}
	.body-content > :global(h3) {
		@apply py-3 text-gray-800 text-lg font-semibold;
	}
	.body-content > :global(h4) {
		@apply py-2 text-gray-800 text-base font-semibold;
	}
	.body-content > :global(p) {
		@apply py-1 text-gray-700;
	}
</style>
