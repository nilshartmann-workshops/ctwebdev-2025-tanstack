import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Marquee } from "@/components/Marquee.tsx";
import { showBreakingNews } from "@/demo-config.ts";

interface BreakingNewsProps {
  children: ReactNode;
}

export default function BreakingNews({ children }: BreakingNewsProps) {
  const [visible, setVisible] = useState(false);

  const buttonClassName = twMerge(
    "border-brown text-brown hover:bg-sprinkleBlue font-caveat flex items-center justify-center space-x-2 rounded-2xl border bg-slate-50 px-3 py-1 hover:cursor-pointer hover:text-white",
    "disabled:hover:bg-grey-200 disabled:hover:bg-sprinkleBlue/80 disabled:cursor-default",
    "text-base",
  );

  return (
    <div className={"flex"}>
      {visible && (
        <Marquee
          pauseOnHover={true}
          className="tracking-wide [--duration:20s] motion-reduce:overflow-auto" // pass class to change gap or speed
          innerClassName="motion-reduce:animate-none motion-reduce:first:hidden"
        >
          {children}
        </Marquee>
      )}
      <button className={buttonClassName} onClick={() => setVisible(!visible)}>
        {visible ? (
          <i className="fa-regular fa-circle-xmark" />
        ) : (
          <i className="fa-solid fa-bullhorn" />
        )}
      </button>
    </div>
  );
}
