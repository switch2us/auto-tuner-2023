<script>
	export let extraSpacing = false;
	export let dark = true;
	export let marginBottom = false;
	export let bullets = [];
	export let useThemeColors = false;
</script>

<div
	class="flex flex-wrap {dark ? 'bg-black text-white' : 'bg-white text-black'} {useThemeColors
		? 'bg-theme_primary text-theme_primary-text'
		: ''} {marginBottom ? 'mb-1' : ''}"
>
	<div class="flex flex-wrap container justify-center m-auto">
		{#each bullets as bullet, i}
			<div class="flex max-w-xs">
				<div
					class="flex flex-col justify-start items-center mx-auto p-5 md:p-10 {extraSpacing
						? 'py-10 md:py-15'
						: ''}"
				>
					{#if bullet.icon}
						<div class="text-center text-xl my-2">
							{#if i == 0}
								<slot name="icon-1" />
							{:else if i == 1}
								<slot name="icon-2" />
							{:else if i == 2}
								<slot name="icon-3" />
							{:else if i == 3}
								<slot name="icon-4" />
							{:else if i == 4}
								<slot name="icon-5" />
							{:else if i == 5}
								<slot name="icon-6" />
							{:else if i == 6}
								<slot name="icon-7" />
							{:else if i == 7}
								<slot name="icon-8" />
							{/if}
						</div>
					{/if}
					{#if bullet.title}
						<div class="flex text-center font-bold my-2">{bullet.title}</div>
					{/if}
					<slot name="title" />
					{#if bullet.subtitle}
						<div class="flex text-center font-light text-sm my-2">{bullet.subtitle}</div>
					{/if}
					<slot name="subtitle" />
					{#if bullet.description}
						<div class="flex text-center text-xs my-2">{bullet.description}</div>
					{/if}
					<slot name="description" />
					{#if bullet.action}
						<div class="text-center my-2">
							{#if i == 0}
								<slot name="action-1" />
							{:else if i == 1}
								<slot name="action-2" />
							{:else if i == 2}
								<slot name="action-3" />
							{:else if i == 3}
								<slot name="action-4" />
							{:else if i == 4}
								<slot name="action-5" />
							{:else if i == 5}
								<slot name="action-6" />
							{:else if i == 6}
								<slot name="action-7" />
							{:else if i == 7}
								<slot name="action-8" />
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
