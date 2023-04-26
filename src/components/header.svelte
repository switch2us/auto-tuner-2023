<script>
	import { page } from '$app/stores';
	import { metaTitle } from '../tools/domain';
	import { getTranslatedString, langStore, defaultLang } from '../tools/lang';

	import MobileMenu from './mobile-menu.svelte';

	export let activeIndex = 0;
	let menuIsVisible = false;
	function toggleMenu() {
		menuIsVisible = !menuIsVisible;
	}

	let showLanguageMenu = false;

	function getLanguageLabel(lang = 'en') {
		if (lang == 'de') return getTranslatedString('German', lang);
		if (lang == 'it') return getTranslatedString('Italian', lang);
		if (lang == 'ru') return getTranslatedString('Russian', lang);
		return getTranslatedString('English', lang);
	}
</script>

<svelte:window
	on:click={() => {
		showLanguageMenu = false;
	}}
/>

<div class="flex sticky top-0 z-10 bg-white shadow font-sans">
	<div
		class="xl:container flex flex-auto mx-auto flex-row p-2 px-10 md:px-20 justify-between items-center"
	>
		<div class="flex flex-shrink-0">
			<a href="/{$langStore != defaultLang ? $langStore : ''}" aria-label={metaTitle}>
				<img width="auto" height="51px" class="max-h-[51px]" src="/logo.png" alt={metaTitle} />
			</a>
		</div>
		<div class="hidden md:flex flex-auto justify-center font-medium">
			<a
				class:active={activeIndex == 0}
				class:not-active={activeIndex != 0}
				class="hover-underline-animation text-sm mx-2 lg:mx-5 py-4 hover:no-underline"
				href="/{$langStore != defaultLang ? $langStore : ''}"
				><span class="text-black whitespace-nowrap">{getTranslatedString('Home', $langStore)}</span>
			</a>
			<a
				class:active={activeIndex == 1}
				class:not-active={activeIndex != 1}
				class="hover-underline-animation text-sm mx-2 lg:mx-5 py-4 hover:no-underline"
				href="/{$langStore}/configurator"
				><span class="text-black whitespace-nowrap"
					>{getTranslatedString('Configurator', $langStore)}</span
				>
			</a>
			<a
				class:active={activeIndex == 2}
				class:not-active={activeIndex != 2}
				class="hover-underline-animation text-sm mx-2 lg:mx-5 py-4 hover:no-underline"
				href="/{$langStore}/store"
			>
				<span class="text-black whitespace-nowrap"
					>{getTranslatedString('Online store', $langStore)}</span
				>
			</a>
			<a
				class:active={activeIndex == 3}
				class:not-active={activeIndex != 3}
				class="group hover-underline-animation relative justify-center items-center text-sm mx-2 lg:mx-5 py-4 hover:no-underline"
				href="/{$langStore}/services"
			>
				<span class="text-black whitespace-nowrap"
					>{getTranslatedString('Services', $langStore)}
				</span>
				<div
					class="hidden group-hover:flex absolute top-full -left-6 lg:-left-9 py-2 rounded border shadow-xl bg-white"
				>
					<ul>
						<li class="border-b last:border-0 px-4">
							<a
								class:active={activeIndex == 3 && $page.url.hash == '#ecu-remapping'}
								class:not-active={activeIndex != 3 || $page.url.hash != '#ecu-remapping'}
								class="group hover-underline-animation relative justify-center items-center text-sm mx-2 lg:mx-5 py-4 pt-2 -mb-2 hover:no-underline"
								href="/{$langStore}/services#ecu-remapping"
							>
								<span class="text-black whitespace-nowrap"
									>{getTranslatedString('ECU Remapping', $langStore)}
								</span>
							</a>
						</li>
						<li class="border-b last:border-0 px-4">
							<a
								class:active={activeIndex == 3 && $page.url.hash == '#dpf-delete'}
								class:not-active={activeIndex != 3 || $page.url.hash != '#dpf-delete'}
								class="group hover-underline-animation relative justify-center items-center text-sm mx-2 lg:mx-5 py-4 pt-2 -mb-2 hover:no-underline"
								href="/{$langStore}/services#dpf-delete"
							>
								<span class="text-black whitespace-nowrap"
									>{getTranslatedString('DPF Delete', $langStore)}
								</span>
							</a>
						</li>
						<li class="border-b last:border-0 px-4">
							<a
								class:active={activeIndex == 3 && $page.url.hash == '#egr-delete'}
								class:not-active={activeIndex != 3 || $page.url.hash != '#egr-delete'}
								class="group hover-underline-animation relative justify-center items-center text-sm mx-2 lg:mx-5 py-4 pt-2 -mb-2 hover:no-underline"
								href="/{$langStore}/services#egr-delete"
							>
								<span class="text-black whitespace-nowrap"
									>{getTranslatedString('EGR Delete', $langStore)}
								</span>
							</a>
						</li>
						<li class="border-b last:border-0 px-4">
							<a
								class:active={activeIndex == 3 && $page.url.hash == '#adblue-delete'}
								class:not-active={activeIndex != 3 || $page.url.hash != '#adblue-delete'}
								class="group hover-underline-animation relative justify-center items-center text-sm mx-2 lg:mx-5 py-4 pt-2 -mb-2 hover:no-underline"
								href="/{$langStore}/services#adblue-delete"
							>
								<span class="text-black whitespace-nowrap"
									>{getTranslatedString('AdBlue Delete', $langStore)}
								</span>
							</a>
						</li>
						<li class="border-b last:border-0 px-4">
							<a
								class:active={activeIndex == 3 && $page.url.hash == '#speed-limiter-removal'}
								class:not-active={activeIndex != 3 || $page.url.hash != '#speed-limiter-removal'}
								class="group hover-underline-animation relative justify-center items-center text-sm mx-2 lg:mx-5 py-4 pt-2 -mb-2 hover:no-underline"
								href="/{$langStore}/services#speed-limiter-removal"
							>
								<span class="text-black whitespace-nowrap"
									>{getTranslatedString('Speed Limiter Removal', $langStore)}
								</span>
							</a>
						</li>
						<li class="border-b last:border-0 px-4">
							<a
								class:active={activeIndex == 3 && $page.url.hash == '#dsg-and-zf-gearbox-remapping'}
								class:not-active={activeIndex != 3 ||
									$page.url.hash != '#dsg-and-zf-gearbox-remapping'}
								class="group hover-underline-animation relative justify-center items-center text-sm mx-2 lg:mx-5 py-4 pt-2 -mb-2 hover:no-underline"
								href="/{$langStore}/services#dsg-and-zf-gearbox-remapping"
							>
								<span class="text-black whitespace-nowrap"
									>{getTranslatedString('DSG and ZF Gearbox Remapping', $langStore)}
								</span>
							</a>
						</li>
					</ul>
				</div>
			</a>
			<a
				class:active={activeIndex == 4}
				class:not-active={activeIndex != 4}
				class="hover-underline-animation text-sm mx-2 lg:mx-5 py-4 hover:no-underline"
				href="/{$langStore}/contact"
				><span class="text-black whitespace-nowrap"
					>{getTranslatedString('Contact', $langStore)}</span
				>
			</a>
			<a
				class:active={activeIndex == 5}
				class:not-active={activeIndex != 5}
				class="hover-underline-animation text-sm mx-2 lg:mx-5 py-4 hover:no-underline"
				href="/{$langStore}/about-us"
				><span class="text-black whitespace-nowrap"
					>{getTranslatedString('About us', $langStore)}</span
				>
			</a>
		</div>
		<div class="hidden md:flex">
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
		<div class="flex md:hidden">
			<a
				class="flex flex-row items-center mx-1 p-1 bg-white hover:bg-black text-black hover:text-white rounded-full scale-1 hover:scale-125 transition-transform"
				href="/{$langStore}/menu"
				on:click|preventDefault={toggleMenu}
				aria-label="Deschide meniu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="currentColor"
					viewBox="0 0 24 24"
					><g data-name="Layer 2"
						><g data-name="menu-2"
							><rect width="24" height="24" opacity="0" transform="rotate(180 12 12)" /><circle
								cx="4"
								cy="12"
								r="1"
							/><rect width="14" height="2" x="7" y="11" rx=".94" ry=".94" /><rect
								width="18"
								height="2"
								x="3"
								y="16"
								rx=".94"
								ry=".94"
							/><rect width="18" height="2" x="3" y="6" rx=".94" ry=".94" /></g
						></g
					></svg
				>
			</a>
		</div>
	</div>
</div>
<div
	class:hidden={!menuIsVisible}
	class="menu fixed z-50 top-0 left-0 bottom-0 right-0 w-full h-full bg-white"
>
	<MobileMenu {activeIndex} {toggleMenu} />
</div>

<style>
	.hover-underline-animation {
		display: inline-block;
		position: relative;
		color: #0087ca;
	}

	.hover-underline-animation:after {
		content: '';
		position: absolute;
		width: 100%;
		-webkit-transform: scaleX(0) scaleY(0.75);
		transform: scaleX(0) scaleY(0.75);
		opacity: 0.8;
		height: 2px;
		bottom: 1rem;
		left: 0;
		background-color: black;
		transform-origin: bottom right;
		-webkit-transition: transform 0.25s ease-out, opacity 0.25s ease-out;
		transition: transform 0.25s ease-out, opacity 0.25s ease-out;
	}

	.hover-underline-animation:hover:after,
	.active.hover-underline-animation:after {
		-webkit-transform: scaleX(1) scaleY(0.75);
		transform: scaleX(1) scaleY(0.75);
		opacity: 1;
		transform-origin: bottom left;
	}
	.menu.hidden {
		display: none !important;
	}
</style>
