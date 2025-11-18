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
        <Link to={"/donuts/$donutId"} params={{ donutId: donut.id }}>
          <h2>{donut.name}</h2>
        </Link>
        <div className={"buttons"}>
          <DonutLikeButton donutId={donut.id} currentLikes={donut.likes} />

          {/* <FavButton variant={"sm"} donutId={donut.id} />*/}
        </div>
      </div>
    </div>
  );
}
