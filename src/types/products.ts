import productsJson from '../../static/products.json'
let set = false

export interface Product {
    id: string
    label: string
    url_label: string
    description: string
    reduced_from_cost?: number
    reduced_percentage?: number
    cost: number
    out_of_stock: boolean
    images?: string[],
    added_ts?: number
}

export let products: Product[] = []

function setData() {
    if (set) return
    set = true

    products = [...productsJson]
}
setData()