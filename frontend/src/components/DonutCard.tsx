import { Link } from "@tanstack/react-router";
import { DonutDto } from "@/types.ts";
import DonutLikeButton from "@/components/DonutLikeButton.tsx";
import FavButton from "@/components/FavButton.tsx";

type DonutCardProps = {
  donut: DonutDto;
};

export default function DonutCard({ donut }: DonutCardProps) {
  return (
    <div className={"DonutCard group"}>
      <img alt={donut.name} src={`/images/${donut.image}`} />
      <div className={"content"}>
        {/* todo: link */}
        <h2>{donut.name}</h2>
        <div className={"buttons"}>
          <DonutLikeButton donutId={donut.id} currentLikes={donut.likes} />
        </div>
      </div>
    </div>
  );
}
