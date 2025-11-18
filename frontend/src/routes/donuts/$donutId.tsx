import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCommentsOpts, fetchDonutDetailsOpts } from "@/queries.ts";
import DonutDetail from "@/components/DonutDetail.tsx";

export const Route = createFileRoute("/donuts/$donutId")({
  component: RouteComponent,
  async loader({ params, context }) {
    //             ^--- typesafe!

    // returning the promise here makes the server part
    // wait for data
    return context.queryClient.ensureQueryData(
      fetchDonutDetailsOpts(params.donutId),
    );
  },
});

function RouteComponent() {
  const { donutId } = Route.useParams();
  //       ^-- type safe

  const { data } = useSuspenseQuery(fetchDonutDetailsOpts(donutId));

  // 🔍 Inspect:
  //    - Network traffic (SSR -> HTML)
  //    - but only first navigation!
  //
  // 💡 Note:
  //    - we would write the exact same code when building
  //      client-side SPA with TanRouter Router

  return <DonutDetail donut={data} />;
}
