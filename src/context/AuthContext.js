"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <AuthContent>{children}</AuthContent>
    </SessionProvider>
  );
}

function AuthContent({ children }) {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user) {
      const user = {
        id: session.user.id || session.user.email,
        firstName: session.user.name?.split(" ")[0] || "User",
        lastName: session.user.name?.split(" ")[1] || "",
        email: session.user.email,
        image: session.user.image,
        role: "candidate" // Default for social
      };
      setLocalUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setLocalUser(JSON.parse(savedUser));
      } else {
        setLocalUser(null);
      }
    }
    setLoading(status === "loading");
  }, [session, status]);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setLocalUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      router.push(foundUser.role === "recruiter" ? "/recruiter-dashboard" : "/dashboard");
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === userData.email)) return { success: false, message: "Exists" };
    
    const newUser = { 
      ...userData, 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date().toISOString() 
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setLocalUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    router.push(newUser.role === "recruiter" ? "/recruiter-dashboard" : "/upload");
    return { success: true };
  };

  const logout = () => {
    setLocalUser(null);
    localStorage.removeItem("currentUser");
    signOut({ callbackUrl: "/login" });
  };

  const loginSocial = (provider) => signIn(provider, { callbackUrl: "/dashboard" });

  useEffect(() => {
    const publicPaths = ["/", "/login", "/register", "/about"];
    if (!loading && !localUser && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [localUser, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user: localUser, login, register, logout, loginSocial, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
