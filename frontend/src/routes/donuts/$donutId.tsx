import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCommentsOpts, fetchDonutDetailsOpts } from "@/queries.ts";
import DonutDetail from "@/components/DonutDetail.tsx";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";

export const Route = createFileRoute("/donuts/$donutId")({
  component: RouteComponent,
  pendingComponent: () => <LoadingIndicator />,

  // be aware: loader needs to be on top'!
  async loader({ params, context }) {
    context.queryClient.ensureQueryData(fetchCommentsOpts(params.donutId));

    // make the server (SSR) wait for the data
    // RETURNing the promise make sure that server WAITS
    //   for query (no pending component)
    // BUT: pending component when navigation on client side!
    return context.queryClient.ensureQueryData(
      fetchDonutDetailsOpts(params.donutId),
    );

    // ...now both of our request running in parallel.
    // As both took ~2000ms, we don't see the loading indicator
    // for CommentList anymore... 🥳
  },
});

function RouteComponent() {
  const { donutId } = Route.useParams();
  //         ^---- TypeSafe!

  const donut = Route.useLoaderData();
  //         ^---- TypeSafe!
  return <DonutDetail donut={donut} />;
}
