
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bvfauumqnoelcfefbllh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZmF1dW1xbm9lbGNmZWZibGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjkwNDQsImV4cCI6MjA2MTQwNTA0NH0.DZ6AXM2DxlBY8IhKTx5SsHcRVZZt2eWS31I4qPAtbxU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
