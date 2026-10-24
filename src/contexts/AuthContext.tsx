import { supabase } from "@/lib/supabase";
import type { JwtPayload } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";

interface AuthType {
  claims: JwtPayload | null;
  loading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [claims, setClaims] = useState<JwtPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      setClaims(data?.claims ?? null);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        setClaims(data?.claims ?? null);
        setLoading(false);
      });
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ claims, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
