"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    // Retrieve the current session immediately when the component mounts
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session);
    };

    getSession();

    // Set up the listener for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    // Clean up the listener on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
