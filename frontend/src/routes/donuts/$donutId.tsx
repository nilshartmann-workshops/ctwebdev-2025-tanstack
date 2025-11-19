import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { fetchDonutDetailsOpts } from "@/queries.ts";
import DonutDetail from "@/components/DonutDetail.tsx";
import CommentLoadingIndicator from "@/components/CommentListLoadingIndicator.tsx";
import CommentList from "@/components/CommentList.tsx";

export const Route = createFileRoute("/donuts/$donutId")({
  component: RouteComponent,
  async loader({ params, context }) {
    return context.queryClient.ensureQueryData(
      fetchDonutDetailsOpts(params.donutId),
    );
  },
});

function RouteComponent() {
  const { donutId } = Route.useParams();

  const { data } = useSuspenseQuery(fetchDonutDetailsOpts(donutId));

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
