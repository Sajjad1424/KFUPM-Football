
import { supabase } from '@/lib/supabase';

export async function login(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  // For development/demo purposes, allow these specific credentials to work
  if ((email === "admin@example.com" || email === "guest@example.com") && 
      password === "password") {
    return { 
      success: true,
      token: "demo-token" 
    };
  }
  
  // If not using demo credentials, try with Supabase auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  return { 
    success: true, 
    token: data.session?.access_token 
  };
}

export async function signUp(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  return { 
    success: true, 
    token: data.session?.access_token 
  };
}

export async function signOut(): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting current user:', error);
    return null;
  }
  
  return user;
}
