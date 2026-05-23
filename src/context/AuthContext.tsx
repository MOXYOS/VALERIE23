"use client";

import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: null,
  isLoading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use useMemo to ensure client is created exactly once on the client
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setIsAuthenticated(!!user);
        
        if (user) {
          // Fetch profile data if it exists
          const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (data) setProfile(data);
        }
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      setUser(session?.user || null);
      setIsAuthenticated(!!session?.user);
      
      if (session?.user) {
        try {
          const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
          if (data && mounted) setProfile(data);
        } catch (err) {
          console.error("Profile fetch error in auth change:", err);
        }
      } else {
        if (mounted) setProfile(null);
      }
      if (mounted) setIsLoading(false);
    });

    // Safety timeout to forcefully end loading state after 4 seconds
    const timeout = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 4000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [supabase]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setProfile(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
