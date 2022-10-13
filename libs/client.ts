import { createClient } from 'microcms-js-sdk'
export const client = createClient({
  serviceDomain: 'test-nuxt-microcms',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
})