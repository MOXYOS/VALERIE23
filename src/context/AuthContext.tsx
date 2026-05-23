"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  neuralSyncStatus: "Pending" | "Active" | "Optimizing";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // On mount, check if there's a mocked user session
  useEffect(() => {
    const storedUser = localStorage.getItem("valerie23_mock_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const mockUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email,
      name: email.split('@')[0],
      neuralSyncStatus: "Active"
    };
    setUser(mockUser);
    localStorage.setItem("valerie23_mock_user", JSON.stringify(mockUser));
    router.push("/dashboard");
  };

  const signup = async (email: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email,
      name,
      neuralSyncStatus: "Pending"
    };
    setUser(mockUser);
    localStorage.setItem("valerie23_mock_user", JSON.stringify(mockUser));
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("valerie23_mock_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
