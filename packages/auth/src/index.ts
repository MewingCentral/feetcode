import { Lucia, TimeSpan } from "lucia";

import type { SelectUser } from "@feprep/db";
import { adapter } from "@feprep/db";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      type: attributes.type,
    };
  },
  sessionExpiresIn: new TimeSpan(1, "w"),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<SelectUser, "hashedPassword">;
  }
}

export * from "lucia";
export * from "./validate-request";
