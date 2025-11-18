import { ReactNode, Suspense } from "react";
import { DonutDto } from "@/types.ts";
import CommentList from "@/components/CommentList.tsx";
import Donut from "@/components/Donut.tsx";
import CommentLoadingIndicator from "@/components/CommentListLoadingIndicator.tsx";

type DonutDetailProps = {
  donut: DonutDto;
  commentList?: ReactNode;
};
export default function DonutDetail({ donut, commentList }: DonutDetailProps) {
  return (
    <div className={"DonutDetail"}>
      <Donut donut={donut} />

      {!!commentList && (
        <div className={"CommentList"}>
          <h1>What the Snackers Say</h1>
          {commentList}
        </div>
      )}
    </div>
  );
}
