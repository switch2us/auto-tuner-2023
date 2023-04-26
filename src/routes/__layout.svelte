<script context="module">
	import { langStore } from '../tools/lang';
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params }) {
		langStore.setLang(params?.['lang']);
		return {};
	}
</script>

<script>
	import '../tailwind.css';
	import '@fortawesome/fontawesome-free/css/all.css';
	import Footer from '../components/footer.svelte';
</script>

<slot />
<Footer />
