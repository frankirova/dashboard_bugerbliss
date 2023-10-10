import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// export const subscription = supabase
//   .from('orders')
//   .on('INSERT', (payload) => {
//     console.log('Nueva fila insertada:', payload.new)
//   })
//   .subscribe()