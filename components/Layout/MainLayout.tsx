
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/components/SupabaseProvider";

export function MainLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const { user } = useSupabase();
  
  // Update login state based on Supabase session
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setIsAdmin(user.email?.includes('admin') || false);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [user]);
  
  const handleLogin = (user: { email: string; isAdmin: boolean }) => {
    setIsLoggedIn(true);
    setIsAdmin(user.isAdmin);
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${user.email}!`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
      <main className="flex-grow">
        <Outlet context={{ isLoggedIn, isAdmin, handleLogin }} />
      </main>
      <Footer />
    </div>
  );
}
