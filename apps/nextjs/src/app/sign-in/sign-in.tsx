"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";

import { EyeClosedIcon, EyeOpenIcon } from "@feprep/ui";
import { Button } from "@feprep/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@feprep/ui/card";
import { Input } from "@feprep/ui/input";
import { Label } from "@feprep/ui/label";

import { signInAction } from "./sign-in-action";

export function SignIn() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [state, formAction] = useFormState(signInAction, null);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>FEPrep Sign In</CardTitle>
            <CardDescription>
              Sign in using your NID and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-2">
              <div className="space-y-1">
                <Label>NID</Label>
                <Input name="nid" placeholder="jd123456" />
                {state?.fieldError?.nid && (
                  <p className="text-sm text-red-500">{state.fieldError.nid}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Password</Label>
                <div className="relative flex flex-row items-center justify-end space-x-1">
                  <Input
                    name="password"
                    id="password"
                    type={toggle ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="********"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-4"
                    onClick={() => setToggle(!toggle)}
                  >
                    {!toggle && <EyeClosedIcon />}
                    {toggle && <EyeOpenIcon />}
                  </button>
                </div>
                {state?.fieldError?.password && (
                  <p className="text-sm text-red-500">
                    {state.fieldError.password}
                  </p>
                )}
              </div>
              <Button className="mt-2" type="submit">
                Submit
              </Button>
              <p className="text-center text-sm font-light underline">
                <Link href="/reset-password"> Forgot Password?</Link>
              </p>
              <p className="font-regular mt-8 text-center text-sm">
                Don&apos;t have an account?
                <Link href="/sign-up" className="font-semibold">
                  {" "}
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
