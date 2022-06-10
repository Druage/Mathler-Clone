import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <section
      className={
        "flex h-screen w-screen flex-col items-center justify-center bg-gray-100"
      }
    >
      <h1 className={"mb-12 text-2xl font-medium"}>Mathler</h1>
      {children}
    </section>
  );
}
