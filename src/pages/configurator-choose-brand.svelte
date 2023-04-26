<script lang="ts">
	import { getTranslatedString, langStore } from '../tools/lang';

	import type { Brand } from '../types/brands';

	export let brands: Brand[];
</script>

<div class="bg-gray-800">
	<div class="flex flex-col container mx-auto p-10 ">
		<div
			class="flex flex-col justify-center items-center my-24 mt-14 text-4xl font-bold text-gray-50"
		>
			{getTranslatedString('Car configurator', $langStore)}
			<div class="text-base font-light">
				{getTranslatedString('Get started by selecting a brand', $langStore)}
			</div>
		</div>
		<div class="flex flex-wrap justify-start">
			{#each brands as brand}
				<a
					href="/{$langStore}/configurator/{brand.url_label}"
					class="flex flex-col flex-1 justify-start items-center p-2 m-1 bg-gray-700 hover:bg-gray-500 text-gray-100 rounded"
				>
					<div class="flex rounded">
						<div
							class="flex w-10 h-10 m-2 bg-center bg-no-repeat bg-contain"
							style="background-image: url('/brands/{brand.id}.png');"
						/>
					</div>
					<div
						class="flex justify-center items-center my-2 text-xs font-semibold text-center uppercase"
					>
						{brand.label}
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
