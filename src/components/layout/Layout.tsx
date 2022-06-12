import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <section
      className={
        "flex h-screen w-screen flex-col items-center justify-center bg-gray-100"
      }
    >
      <h1 className={"text-2xl font-medium"}>Mathler</h1>
      <span className={"mb-6"}>
        An equation guessing game for the Wordler at heart
      </span>
      {children}
    </section>
  );
}
