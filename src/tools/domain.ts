const domains: string[] = ['autotunerflash.com']
const _domain = ((import.meta.env.VITE_DOMAIN ?? domains[0]) as string).toLowerCase()
export const domain = domains.indexOf(_domain) != -1 ? _domain : domains[0]
export const websiteName = 'Chiptuning Flash'
export const metaTitle = 'Chiptuning Flash – Remap and tunning | Cars | Vans | Trucks | Tractors | Autotuner | Alientech | DPF | ECU | EGR | AdBlue | DSG | ZF'
export const metaDescription = ''