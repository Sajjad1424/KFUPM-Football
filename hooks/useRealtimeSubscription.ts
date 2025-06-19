
import { useEffect, useState } from 'react';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type SubscriptionOptions = {
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  filter?: string;
};

export function useRealtimeSubscription<T>(
  table: string,
  callback?: (payload: { new: T | Record<string, never>; old: T | Record<string, never> }) => void,
  options: SubscriptionOptions = {}
) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const { event = '*', schema = 'public', filter } = options;
    
    const realtimeChannel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event, 
          schema, 
          table,
          ...(filter ? { filter } : {})
        } as any,
        (payload: RealtimePostgresChangesPayload<Record<string, any>>) => {
          if (callback) {
            callback({
              new: (payload.new || {}) as T | Record<string, never>,
              old: (payload.old || {}) as T | Record<string, never>
            });
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      });

    setChannel(realtimeChannel);

    return () => {
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
        setChannel(null);
        setIsSubscribed(false);
      }
    };
  }, [table, callback]);

  return { isSubscribed, channel };
}
