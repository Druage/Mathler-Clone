import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <section
      className={
        "flex h-screen w-screen flex-col items-center justify-center bg-soft-midnight"
      }
    >
      <img src={"/logo.svg"} width={300} height={115} alt={"mathler-logo"} />

      {children}
    </section>
  );
}
