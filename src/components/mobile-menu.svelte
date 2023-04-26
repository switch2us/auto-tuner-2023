<script>
	import { metaTitle } from '../tools/domain';
	import { defaultLang, langStore } from '../tools/lang';

	export let activeIndex;
	export let toggleMenu = () => {};
</script>

<div class="flex font-sans">
	<div
		class="xl:container flex flex-auto mx-auto flex-row p-2 px-10 md:px-20 justify-between items-center"
	>
		<div class="flex flex-shrink-0">
			<a
				href="/{$langStore != defaultLang ? $langStore : ''}"
				on:click={toggleMenu}
				aria-label={metaTitle}
			>
				<img width="auto" height="51px" class="max-h-[51px]" src="/logo.png" alt={metaTitle} />
			</a>
		</div>
		<div class="flex">
			<a
				class="mx-1 p-1 bg-white hover:bg-black text-black hover:text-white rounded-full scale-1 hover:scale-125 transition-transform"
				href="/{$langStore != defaultLang ? $langStore : ''}"
				on:click|preventDefault={toggleMenu}
				aria-label="Close menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="currentColor"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					><path
						d="M2.39705176,2.55378835 L2.46966991,2.46966991 C2.73593648,2.20340335 3.15260016,2.1791973 3.44621165,2.39705176 L3.53033009,2.46966991 L8,6.939 L12.4696699,2.46966991 C12.7625631,2.1767767 13.2374369,2.1767767 13.5303301,2.46966991 C13.8232233,2.76256313 13.8232233,3.23743687 13.5303301,3.53033009 L9.061,8 L13.5303301,12.4696699 C13.7965966,12.7359365 13.8208027,13.1526002 13.6029482,13.4462117 L13.5303301,13.5303301 C13.2640635,13.7965966 12.8473998,13.8208027 12.5537883,13.6029482 L12.4696699,13.5303301 L8,9.061 L3.53033009,13.5303301 C3.23743687,13.8232233 2.76256313,13.8232233 2.46966991,13.5303301 C2.1767767,13.2374369 2.1767767,12.7625631 2.46966991,12.4696699 L6.939,8 L2.46966991,3.53033009 C2.20340335,3.26406352 2.1791973,2.84739984 2.39705176,2.55378835 L2.46966991,2.46966991 L2.39705176,2.55378835 Z"
					/></svg
				>
			</a>
		</div>
	</div>
</div>
<div class="container m-auto p-5">
	<div class="block font-medium my-10">
		<a
			class:active={activeIndex == 0}
			class="flex flex-auto justify-center m-auto text-sm font-bold p-4 hover:no-underline bg-gradient-to-br from-theme_primary to-theme_primary-dark my-2 uppercase rounded-full"
			href="/{$langStore != defaultLang ? $langStore : ''}"
			on:click={toggleMenu}><span class="text-white whitespace-nowrap">Home</span></a
		>
		<a
			class:active={activeIndex == 1}
			class="flex flex-auto justify-center m-auto text-sm font-bold p-4 hover:no-underline bg-gradient-to-br from-theme_primary to-theme_primary-dark my-2 uppercase rounded-full"
			href="/{$langStore}/configurator"
			on:click={toggleMenu}><span class="text-white whitespace-nowrap">Configurator</span></a
		>
		<a
			class:active={activeIndex == 2}
			class="flex flex-auto justify-center m-auto text-sm font-bold p-4 hover:no-underline bg-gradient-to-br from-theme_primary to-theme_primary-dark my-2 uppercase rounded-full"
			href="/{$langStore}/store"
			on:click={toggleMenu}><span class="text-white whitespace-nowrap">Online store</span></a
		>
		<a
			class:active={activeIndex == 3}
			class="flex flex-auto justify-center m-auto text-sm font-bold p-4 hover:no-underline bg-gradient-to-br from-theme_primary to-theme_primary-dark my-2 uppercase rounded-full"
			href="/{$langStore}/services"
			on:click={toggleMenu}><span class="text-white whitespace-nowrap">Services</span></a
		>
		<a
			class:active={activeIndex == 4}
			class="flex flex-auto justify-center m-auto text-sm font-bold p-4 hover:no-underline bg-gradient-to-br from-theme_primary to-theme_primary-dark my-2 uppercase rounded-full"
			href="/{$langStore}/contact"
			on:click={toggleMenu}><span class="text-white whitespace-nowrap">Contact</span></a
		>
		<a
			class:active={activeIndex == 5}
			class="flex flex-auto justify-center m-auto text-sm font-bold p-4 hover:no-underline bg-gradient-to-br from-theme_primary to-theme_primary-dark my-2 uppercase rounded-full"
			href="/{$langStore}/about-us"
			on:click={toggleMenu}><span class="text-white whitespace-nowrap">About us</span></a
		>
	</div>
	<div class="flex justify-center">
		<a
			class="mx-1 p-1.5 bg-white hover:bg-gradient-to-bl from-purple-500 via-red-500 to-yellow-500 text-black hover:text-white rounded-full scale-1 hover:scale-125 transition-transform opacity-75 hover:opacity-100"
			href="https://www.instagram.com/tuning_solutions_online/"
			target="_blank"
			rel="external nofollow noopener"
			aria-label="Tuning Solutions Online Instagram Profile"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="currentColor"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				><path
					d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
				/></svg
			>
		</a>
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
</div>

<style>
	a.active {
		text-decoration: underline !important;
		text-decoration-color: white;
		text-decoration-thickness: 2px;
	}
</style>
