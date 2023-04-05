import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://odugrrpozfqjsygravev.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kdWdycnBvemZxanN5Z3JhdmV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDcwOTE5MywiZXhwIjoxOTk2Mjg1MTkzfQ.yq8WEzH4FaRTP8nBOnGrq1TxWpUeJ8REeDwPDwG-0XE'
)