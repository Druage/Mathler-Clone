import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <section
      className={
        "flex h-screen w-screen flex-col items-center justify-center gap-6 bg-red-200"
      }
    >
      {children}
    </section>
  );
}
