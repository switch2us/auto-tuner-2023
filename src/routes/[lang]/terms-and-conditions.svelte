<script>
	import Header from '../../components/header.svelte';
	import TermsEn from './_terms/terms-and-conditions-en.svelte';
</script>

<Header activeIndex={-1} />
<div class="container mx-auto p-10">
	<h1 class="flex justify-center text-center text-2xl font-bold my-10">Terms & Conditions</h1>
	<div class="body-content flex flex-col justify-center text-justify my-10">
		<TermsEn />
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
