
import { createClient } from '@supabase/supabase-js';

// Use the values from the Supabase integration directly
const supabaseUrl = "https://bvfauumqnoelcfefbllh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZmF1dW1xbm9lbGNmZWZibGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjkwNDQsImV4cCI6MjA2MTQwNTA0NH0.DZ6AXM2DxlBY8IhKTx5SsHcRVZZt2eWS31I4qPAtbxU";

// Create Supabase client with realtime settings
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Enable realtime subscription for specific tables
const enableRealtimeForTables = async () => {
  try {
    // Enable realtime subscription for tournament table
    await supabase
      .channel('public:tournament')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tournament' }, (payload) => {
        console.log('Tournament change received:', payload);
      })
      .subscribe();
    
    console.log('Realtime subscriptions enabled for tables');
  } catch (error) {
    console.error('Failed to enable realtime subscriptions:', error);
  }
};

// Initialize realtime
enableRealtimeForTables();

export { supabase };
