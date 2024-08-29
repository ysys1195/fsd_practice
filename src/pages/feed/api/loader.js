import { GET } from "@/shared/api";

export const loader = async ({ request }) => {
  const LIMIT = 20;
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") || undefined;
  const page = parseInt(url.searchParams.get("page") || "", 10);

  try {
    const [articlesResponse, tagsResponse] = await Promise.all([
      GET("/articles", {
        params: {
          query: {
            tag: selectedTag,
            limit: LIMIT,
            offset: !Number.isNaN(page) ? page * LIMIT : undefined,
          },
        },
      }),
      GET("/tags"),
    ]);

    const articles = articlesResponse.data;
    const tags = tagsResponse.data.tags;

    return { articles, tags };
  } catch (error) {
    console.log(error);

    throw { error: error.response.data, status: error.response.status };
  }
};
