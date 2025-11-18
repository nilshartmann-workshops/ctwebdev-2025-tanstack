import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod/v4";
import DonutList from "@/components/DonutList.tsx";
import { fetchDonutListOpts } from "@/queries.ts";
import FavList from "@/components/FavList.tsx";

const DonutListSearchParams = z.object({
  orderBy: z.enum(["name", "likes"]).optional(),
});

export const Route = createFileRoute("/donuts/")({
  component: RouteComponent,
  validateSearch: DonutListSearchParams,
});

function RouteComponent() {
  const { orderBy } = Route.useSearch();
  //       ^---- type safe!

  const { data: donuts } = useSuspenseQuery(fetchDonutListOpts(orderBy));

  return (
    <div className={"DonutListRouteComponent"}>
      {/* <div className={"OrderButtons"}>*/}
      {/*  <Link*/}
      {/*    to={"/donuts"}*/}
      {/*    search={{*/}
      {/*      orderBy: "name",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Name*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    to={"/donuts"}*/}
      {/*    search={{*/}
      {/*      orderBy: "likes",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Likes*/}
      {/*  </Link>*/}
      {/* </div>*/}

      <DonutList donuts={donuts} />
      {/* example: global state behaviour of cache */}
      {/* <FavList favIds={["1", "2"]} />*/}
    </div>
  );
}
