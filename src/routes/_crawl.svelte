<script lang="ts">
	import { onMount } from 'svelte';
	let req;

	interface Engine {
		brand_id: string;
		model_id: string;
		year_id: string;
		id: string;
		energy_type: string;
		label: string;
		url_label: string;
		// url: string;
		power_ps: number;
		power_nm: number;
		tuned_ower_ps: number;
		tuned_power_nm: number;
		originalCost: number;
		cost: number;
		hasStage2: boolean;
		tuned_ower_ps_2: number;
		tuned_power_nm_2: number;
	}

	interface Year {
		brand_id: string;
		model_id: string;
		id: string;
		label: string;
		url_label: string;
		// url: string;
		engines: Engine[];
	}

	interface Model {
		brand_id: string;
		id: string;
		label: string;
		url_label: string;
		// url: string;
		years: Year[];
	}

	interface Brand {
		id: string;
		label: string;
		url_label: string;
		// url: string;
		models: Model[];
	}

	let brands: Brand[] = [];

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function getSafeUrlLabel(label: string): string {
		return label.toLocaleLowerCase().replace(/[^a-z0-9-]/, '');
	}

	function download(filename: string, text: string) {
		const element = document.createElement('a');
		element.setAttribute('href', 'data:json;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	async function crawl() {
		req = new XMLHttpRequest();

		console.log('Getting brands');
		req.open('GET', 'https://www.fastech.de/fahrzeugwahl/', false);
		req.send();

		if (req.status != 200) return;

		const element = document.createElement('div');
		document.body.appendChild(element);

		element.innerHTML = req.response;

		let brandsListElements = document.getElementsByClassName('brandsList');
		let brandsUrls: string[] = [];
		let brandsLabels: string[] = [];

		for (let i = 0; i < brandsListElements.length; i++) {
			brandsUrls.push(brandsListElements[i].children[0].getAttribute('href'));
			brandsLabels.push(brandsListElements[i].children[0].children[1].children[0].textContent);
		}

		let brandId = 0;
		let modelId = 0;
		let yearId = 0;
		let engineId = 0;

		let brandLabel: string;
		let modelLabel: string;
		let yearLabel: string;
		let energyLabel: string;
		let engineLabel: string;

		for (let i = 0; i < brandsUrls.length && i >= 0; i++) {
			brandId++;
			const brandUrl = brandsUrls[i];

			console.log('Getting models' + (i + 1) + '/' + brandsUrls.length);
			req.open('GET', brandUrl, false);
			req.send();
			if (req.status != 200) return;
			element.innerHTML = req.response;

			const modelsListElements = document.querySelectorAll(
				'._menuSelection a'
			) as NodeListOf<HTMLElement>;
			let modelsUrls: string[] = [];
			let modelsLabels: string[] = [];

			for (let j = 0; j < modelsListElements.length; j++) {
				modelsUrls.push(modelsListElements[j].getAttribute('href'));
				modelsLabels.push(modelsListElements[j].innerText);
			}

			let brandModels: Model[] = [];

			for (let j = 0; j < modelsUrls.length && j >= 0; j++) {
				modelId++;
				const modelUrl = modelsUrls[j];

				console.log('Getting years');
				req.open('GET', modelUrl, false);
				req.send();
				if (req.status != 200) continue;
				element.innerHTML = req.response;

				const yearsListElements = document.querySelectorAll(
					'._second-menu-level a'
				) as NodeListOf<HTMLElement>;
				let yearsUrls: string[] = [];
				let yearsLabels: string[] = [];

				for (let x = 0; x < yearsListElements.length; x++) {
					yearsUrls.push(yearsListElements[x].getAttribute('href'));
					yearsLabels.push(yearsListElements[x].innerText);
				}

				let modelYears: Year[] = [];

				for (let k = 0; k < yearsUrls.length && k >= 0; k++) {
					yearId++;
					const yearUrl = yearsUrls[k];

					console.log('Getting engines');
					req.open('GET', yearUrl, false);
					req.send();
					if (req.status != 200) continue;
					element.innerHTML = req.response;

					const enginesListElements = document.querySelectorAll(
						'._third-menu-level a'
					) as NodeListOf<HTMLElement>;
					let enginesUrls: string[] = [];
					let enginesLabels: string[] = [];

					for (let x = 0; x < enginesListElements.length; x++) {
						enginesUrls.push(enginesListElements[x].getAttribute('href'));
						enginesListElements[x].children[0].remove();
						enginesLabels.push(enginesListElements[x].innerText);
					}

					let yearEngines: Engine[] = [];

					for (let l = 0; l < enginesUrls.length && l >= 0; l++) {
						engineId++;
						const engineUrl = enginesUrls[l];

						console.log('Getting listing details');
						req.open('GET', engineUrl, false);
						req.send();
						if (req.status != 200) continue;
						element.innerHTML = req.response;

						const bradcrumbsLinks = document.querySelectorAll('.bradcrumbs a');

						brandLabel = brandsLabels[i];
						modelLabel = modelsLabels[j];
						yearLabel = yearsLabels[k];

						energyLabel = enginesUrls[l].includes('/elektrisch')
							? 'elektrisch'
							: enginesUrls[l].includes('/hybrid')
							? 'hybrid'
							: enginesUrls[l].includes('/benzin')
							? 'benzin'
							: 'diesel';
						engineLabel = enginesLabels[l];

						const originalPowerPs = Number(
							document
								.getElementsByClassName('engine-data')[0]
								.children[1].children[0].children[0].children[1].children[1].innerHTML.toString()
								.replace(/[^0-9]/gim, '')
						);
						const originalPowerNm = Number(
							document
								.getElementsByClassName('engine-data')[0]
								.children[1].children[0].children[0].children[2].children[1].innerHTML.toString()
								.replace(/[^0-9]/gim, '')
						);
						const tunningPowerPs = Number(
							document
								.getElementsByClassName('engine-data')[0]
								.children[1].children[0].children[0].children[1].children[2].innerHTML.toString()
								.replace(/[^0-9]/gim, '')
						);
						const tunningPowerNm = Number(
							document
								.getElementsByClassName('engine-data')[0]
								.children[1].children[0].children[0].children[2].children[2].innerHTML.toString()
								.replace(/[^0-9]/gim, '')
						);
						const price = Number(
							document
								.getElementsByClassName('engine-data')[0]
								.children[1].children[0].children[0].children[3].children[1].innerHTML.replace(
									/[^0-9]/gim,
									''
								)
						);

						const hasStage2 =
							document.getElementsByClassName('engine-data')[0].children[1].children.length >= 2;

						const tunningPowerPs2 = hasStage2
							? Number(
									document
										.getElementsByClassName('engine-data')[0]
										.children[1].children[1].children[0].children[1].children[2].innerHTML.toString()
										.replace(/[^0-9]/gim, '')
							  )
							: undefined;

						const tunningPowerNm2 = hasStage2
							? Number(
									document
										.getElementsByClassName('engine-data')[0]
										.children[1].children[1].children[0].children[2].children[2].innerHTML.toString()
										.replace(/[^0-9]/gim, '')
							  )
							: undefined;

						yearEngines.push({
							id: engineId.toString(),
							year_id: yearId.toString(),
							model_id: modelId.toString(),
							brand_id: brandId.toString(),
							label: engineLabel,
							url_label: getSafeUrlLabel(engineLabel + '-' + engineId),
							// url: engineUrl,
							energy_type: energyLabel,
							power_ps: originalPowerPs,
							power_nm: originalPowerNm,
							tuned_ower_ps: tunningPowerPs,
							tuned_power_nm: tunningPowerNm,
							originalCost: price,
							cost: Math.floor(price / 2),
							hasStage2,
							tuned_ower_ps_2: tunningPowerPs2,
							tuned_power_nm_2: tunningPowerNm2
						});
					}

					modelYears.push({
						id: yearId.toString(),
						model_id: modelId.toString(),
						brand_id: brandId.toString(),
						label: yearLabel,
						url_label: getSafeUrlLabel(yearLabel + '-' + yearId),
						// url: yearUrl,
						engines: yearEngines
					});
				}

				brandModels.push({
					id: modelId.toString(),
					brand_id: brandId.toString(),
					label: modelLabel,
					url_label: getSafeUrlLabel(modelLabel + '-' + modelId),
					// url: modelUrl,
					years: modelYears
				});
			}

			brands.push({
				id: brandId.toString(),
				label: brandLabel,
				url_label: getSafeUrlLabel(brandLabel + '-' + brandId),
				// url: brandUrl,
				models: brandModels
			});

			// download('brands-' + (i + 1).toString() + '.json', JSON.stringify(brands));
			// await sleep(5000);
		}

		download('brands.json', JSON.stringify(brands));
	}

	onMount(() => {
		setTimeout(crawl, 5000);
	});
</script>
