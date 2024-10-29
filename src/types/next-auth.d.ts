import NextAuth, { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { AuthenticationResult } from "@azure/msal-node";

declare module "next-auth" {
  /**
   * The OAuth profile returned from your provider
   */
  interface Profile {
    roles?: string[];
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends Record<string, unknown>, DefaultSession {
    apiAccessToken?: string;
    graphAccessToken?: string;
    accessToken?: string;
    privileges?: Array<string>;
    user?: {
      name?: string | null;
      email?: string | null;
      userId?: string | null;
      roles?: Array<string> | null;
      privileges?: Array<string> | null;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Record<string, unknown>, DefaultJWT {
    backendToken?: {
      accessToken: string;
      expiresOn: Date | null;
    };
    refreshToken?: string;
    roles?: Array<string>;
  }
}
