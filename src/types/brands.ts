import brandsJson from '../../static/brands.json'
let set = false

export interface Engine {
    brand_id: string
    model_id: string
    year_id: string
    id: string
    energy_type: string
    label: string
    url_label: string
    // url: string
    power_ps: number
    power_nm: number
    tuned_ower_ps: number
    tuned_power_nm: number
    cost: number
    hasStage2: boolean
    tuned_ower_ps_2: number
    tuned_power_nm_2: number
}

export interface Year {
    brand_id: string
    model_id: string
    id: string
    label: string
    url_label: string
    // url: string
    engines: Engine[]
}

export interface Model {
    brand_id: string
    id: string
    label: string
    url_label: string
    // url: string
    years: Year[]
}

export interface Brand {
    id: string
    label: string
    url_label: string
    // url: string
    models: Model[]
}

export let brands: Brand[] = []

function getSafeUrlLabel(label: string): string {
    return label.toLocaleLowerCase().replace(/[^a-z0-9-]/gmi, '-').replace(/-+/gmi, '-').replace(/^-|-$/gmi, '')
}

function setData() {
    if (set) return
    set = true

    for (let i = 0; i < (brandsJson as Brand[] ?? [] as Brand[]).length; i++) {
        let brandModels: Model[] = []

        const brandModelsJson = brandsJson[i].models

        for (let j = 0; j < (brandModelsJson as Model[] ?? [] as Model[]).length; j++) {
            let modelYears: Year[] = []

            const modelYearsJson = brandModelsJson[j].years

            for (let k = 0; k < (modelYearsJson as Year[] ?? [] as Year[]).length; k++) {
                let yearEngines: Engine[] = []

                const yearEnginesJson = modelYearsJson[k].engines

                for (let l = 0; l < (yearEnginesJson as Engine[] ?? [] as Engine[]).length; l++) {
                    yearEngines.push({
                        id: yearEnginesJson[l].id,
                        year_id: yearEnginesJson[l].year_id,
                        model_id: yearEnginesJson[l].model_id,
                        brand_id: yearEnginesJson[l].brand_id,
                        label: yearEnginesJson[l].label,
                        url_label: getSafeUrlLabel(yearEnginesJson[l].label) + '-id-' + yearEnginesJson[l].id,
                        // url: yearEnginesJson[l].url,
                        energy_type: yearEnginesJson[l].energy_type,
                        power_ps: yearEnginesJson[l].power_ps,
                        power_nm: yearEnginesJson[l].power_nm,
                        tuned_ower_ps: yearEnginesJson[l].tuned_ower_ps,
                        tuned_power_nm: yearEnginesJson[l].tuned_power_nm,
                        cost: yearEnginesJson[l].cost,
                        hasStage2: yearEnginesJson[l].hasStage2,
                        tuned_ower_ps_2: yearEnginesJson[l].tuned_ower_ps_2,
                        tuned_power_nm_2: yearEnginesJson[l].tuned_power_nm_2
                    })
                }
                yearEngines = [...yearEngines]

                modelYears.push({
                    id: modelYearsJson[k].id,
                    model_id: modelYearsJson[k].model_id,
                    brand_id: modelYearsJson[k].brand_id,
                    label: modelYearsJson[k].label,
                    url_label: getSafeUrlLabel(modelYearsJson[k].label) + '-id-' + modelYearsJson[k].id,
                    // url: modelYearsJson[k].url,
                    engines: yearEngines
                })
            }

            modelYears = [...modelYears]

            brandModels.push({
                id: brandModelsJson[j].id,
                brand_id: brandModelsJson[j].brand_id,
                label: brandModelsJson[j].label,
                url_label: getSafeUrlLabel(brandModelsJson[j].label) + '-id-' + brandModelsJson[j].id,
                // url: brandModelsJson[j].url,
                years: modelYears
            })
        }

        brandModels = [...brandModels]

        const brand: Brand = {
            id: brandsJson[i].id,
            label: brandsJson[i].label,
            url_label: getSafeUrlLabel(brandsJson[i].label) + '-id-' + brandsJson[i].id,
            // url: brandsJson[i].url,
            models: brandModels
        }
        brands.push(brand)

    }
    brands = [...brands]
}
setData()