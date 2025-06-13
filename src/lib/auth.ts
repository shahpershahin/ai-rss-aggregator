import GoogleProvider from 'next-auth/providers/google';
import type { AuthOptions } from 'next-auth';

// ✅ Local module augmentation to extend types
declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    email: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
