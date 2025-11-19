import _ky, { HTTPError } from "ky";
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createIsomorphicFn, createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { DonutCommentDtoList, DonutDto, DonutDtoList } from "@/types";

const ky = _ky.extend({
  retry: 0,
  timeout: 5000,
});

export const fetchDonutDetailsOpts = (donutId: string) =>
  queryOptions({
    queryKey: ["donuts", "details", donutId],
    async queryFn() {
      try {
        console.log("Loading Donut", donutId);
        const response = await ky
          .get(`http://localhost:7200/api/donuts/${donutId}?slow=r10`)
          .json();
        return DonutDto.parse(response);
      } catch (err) {
        if (err instanceof HTTPError && err.response?.status === 404) {
          throw notFound();
        }
        throw err;
      }
    },
  });

export const fetchCommentsOpts = (donutId: string) =>
  queryOptions({
    queryKey: ["donuts", "detail", donutId, "comments"],
    async queryFn() {
      // SLOW DOWN!!!!!!!!!!!!!!!
      const r = await ky
        .get(`http://localhost:7200/api/donuts/${donutId}/comments?slow=1200`)
        .json();
      return DonutCommentDtoList.parse(r);
    },
  });

const saveLikeAction = createServerFn({ method: "POST" })
  .inputValidator((data) => {
    // our endpoint can be called by ANYONE
    // so it's important to validate
    // typescript only is not safe!
    if (typeof data === "string") {
      return data;
    }

    throw new Error("Invalid data");
  })
  .handler(async ({ data: donutId }) => {
    // Handler only called when data is valid
    // type of data is inferred
    const response = await ky
      .put(`http://localhost:7200/api/donuts/${donutId}/likes`)
      .json();
    return DonutDto.parse(response);
  });

export const useLikeMutation = (donutId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn() {
      // 🔍 Where is this mutation executed?
      return saveLikeAction({
        data: donutId,
      });
    },
    onSuccess() {
      // 🔍 Where are this queries executed
      //   💡 In real live we could move them to server functions as well
      //      because TS Start supports READING data in server functions
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: fetchDonutDetailsOpts(donutId).queryKey,
        }),

        queryClient.invalidateQueries({
          queryKey: fetchDonutListOpts().queryKey.slice(0, 2),
        }),
      ]);
    },
  });
};

type FetchDonutListOptsArgs = "" | "name" | "likes";

export const fetchDonutListOpts = (orderBy: FetchDonutListOptsArgs = "") =>
  queryOptions({
    queryKey: ["donuts", "list", { orderBy }],
    async queryFn() {
      const response = await ky
        .get("http://localhost:7200/api/donuts?orderBy=" + orderBy)
        .json();
      return DonutDtoList.parse(response);
    },
  });
