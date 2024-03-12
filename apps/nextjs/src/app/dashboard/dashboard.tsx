"use client";

// import { useRouter } from "next/navigation";
import { User } from "@feprep/auth";

import { Left } from "./components/left";
// import { api } from "~/trpc/react";
import { Nav } from "./components/nav";

// import { Right } from "./components/right"; // for when this is implemented

export function Dashboard({ user }: { user: User | null }) {
  return (
    <div className="flex h-screen flex-col">
      <Nav user={user} />

      {/* <AuthButton user={user} /> */}
      <main className="flex flex-1">
        <div className="h-full w-1/2">
          <Left />
        </div>

        <div className="h-full w-1/2 bg-gray-200">
          {/* Just a placeholder background for visibility */}
          {/* <Right /> */}
        </div>
      </main>
    </div>
  );
}
