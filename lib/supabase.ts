import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY
const SUPABASE_URL="https://uwtrivrkhpqzexvdaqvt.supabase.co"
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dHJpdnJraHBxemV4dmRhcXZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3NjU3ODAsImV4cCI6MTk5MjM0MTc4MH0.ihZONPc1vB_PUSmgcyZjpCQgZt3GZXWxBDW471xUMTY"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase