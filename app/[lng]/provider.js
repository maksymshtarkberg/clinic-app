"use client";
import { AuthProvider } from "@descope/nextjs-sdk";

export default function NextAuthSessionProvider({ children }) {
  return (
    <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_API}>
      {children}
    </AuthProvider>
  );
}
