
import { loadScript } from '@paypal/paypal-js'
import type { PayPalNamespace } from '@paypal/paypal-js'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { dev } from '$app/env'

const globalPaypal: Writable<PayPalNamespace> = writable()

loadScript({
    'client-id': dev ? 'AZdLro3fuMkejL58VC8UnWpu-0o1dY5Faupvj0AX6wRtPWPSJrK6YPnlXOu8D98g5MY836lZNtwWeI0d' : 'ATtlB6417PngetIsr0ACc4OsRGXR3FTrvvkZzlRyPfSS5OveQXkbE3FFzv5woe25kCOvAspFoEeh1L8H',
    currency: 'EUR'
})
    .then((paypal) => {
        globalPaypal.set(paypal)
        // start to use the PayPal JS SDK script
    })
    .catch((err) => {
        console.error('failed to load the PayPal JS SDK script', err)
    })

export default globalPaypal