import { Link } from "@tanstack/react-router";
import BreakingNews from "@/components/BreakingNews.tsx";
import { showBreakingNews } from "@/demo-config.ts";

export default function NavBar() {
  return (
    <nav
      className={
        "relative container mx-auto flex min-h-16 items-center justify-between border-b-2 border-b-teal-900 py-4 font-bold"
      }
    >
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-x-2">
        <Link to={"/"}>
          <img src={"/images/d-icon.png"} className={"h-12"} alt={"Home"} />
        </Link>
        <Link
          to={"/donuts"}
          className="hover:text-sprinkleBlue text-brown tracking-wider"
        >
          Donuts
        </Link>
      </div>
      {showBreakingNews && (
        <div
          className={
            "BgGradient ml-auto max-w-80 cursor-pointer rounded-lg p-4"
          }
        >
          <BreakingNews>
            Donut prototype triggers random flavor glitches on deploy. +++ Beta
            donut sparks instant taste explosions—handle with care. +++ Rogue
            glaze causes unexpected sugar spikes in the UI.
          </BreakingNews>
        </div>
      )}
    </nav>
  );
}
