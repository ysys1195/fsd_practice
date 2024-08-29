import { GET } from "@/shared/api";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const selectedTag = url.searchParams.get("tag") || undefined;
  try {
    const [articlesResponse, tagsResponse] = await Promise.all([
      GET("/articles", { params: { query: { tag: selectedTag } } }),
      GET("/tags"),
    ]);

    const articles = articlesResponse.data.articles;
    const tags = tagsResponse.data.tags;

    return { articles, tags };
  } catch (error) {
    throw { error: error.response.data, status: error.response.status };
  }
};
