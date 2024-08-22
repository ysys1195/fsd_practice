import { GET } from "@/shared/api";

export const loader = async () => {
  const { data: articles, error, response } = await GET("/articles");

  if (error !== undefined) {
    throw { error, status: response.status };
  }

  return articles;
};
