"use client";

import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Nav } from "./Nav";

/** Pages that open on a dark section: the header floats over it in white. */
const DARK_HERO_ROUTES = ["/services"];

/** Logo top-left; all navigation lives in the Menu pill and its glass overlay (see Nav). */
export function Header() {
  const pathname = usePathname();
  const overHero = DARK_HERO_ROUTES.includes(pathname);

  return (
    <header className={overHero ? "absolute inset-x-0 top-0 z-20 text-white" : undefined}>
      <div className="mx-auto flex h-20 max-w-6xl items-center px-5 sm:px-8">
        <Logo inverted={overHero} />
      </div>
      <Nav />
    </header>
  );
}
