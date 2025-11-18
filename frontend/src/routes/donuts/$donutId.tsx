import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCommentsOpts, fetchDonutDetailsOpts } from "@/queries.ts";
import DonutDetail from "@/components/DonutDetail.tsx";
import CommentList from "@/components/CommentList.tsx";
import CommentLoadingIndicator from "@/components/CommentListLoadingIndicator.tsx";

export const Route = createFileRoute("/donuts/$donutId")({
  component: RouteComponent,
  async loader({ params, context }) {
    //             ^--- typesafe!

    // 💡 preventing request waterfall
    //    (not really neccessary for our demo today
    //     skip when time is running)
    context.queryClient.ensureQueryData(fetchCommentsOpts(params.donutId));

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

  // Show CommentList Suspense Query
  // Note commentList is slow, due to setting in queries.ts
  // we don't want this...
  // -> add Suspense
  // 🔍 Inspect network:
  //    - CommentList is SSR'ed but sent later (Streaming)
  // 🔍 Inspect TS Query Cache:
  //    - Cache is populate (we have DATA and HTML)
  //    - Navigate to list and back => fast, because everything
  //      comes from cache
  // 🔍 Isomorphic:
  //    - All code (including) loader is executed on server AND client side
  //    - All code would be same when using TS Router only (no SSR)
  return (
    <DonutDetail
      donut={data}
      commentList={
        <Suspense fallback={<CommentLoadingIndicator />}>
          <CommentList donutId={donutId} />
        </Suspense>
      }
    />
  );
}
