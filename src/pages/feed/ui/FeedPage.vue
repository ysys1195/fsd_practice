<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ArticlePreview from "./ArticlePreview.vue";
import feedModule from "../index";
const { loader } = feedModule;

const route = useRoute();
const router = useRouter();
const articlesInfo = ref([]);
const tagsInfo = ref([]);
const pageAmount = ref([]);
const currentPage = ref([]);
const LIMIT = 20;

onMounted(async () => {
  try {
    // loader関数を実行し、articlesに結果を格納
    const { articles, tags } = await loader({
      request: new Request(route.fullPath),
    });

    articlesInfo.value = articles.articles; // articlesプロパティにアクセス
    tagsInfo.value = tags;

    pageAmount.value = Math.ceil(articles.articlesCount / LIMIT);
    currentPage.value = parseInt(route.query.page || "1", 10);
  } catch (error) {
    console.error("Error loading articles:", error);
  }
});

const setPage = (page) => {
  router.push({ query: { ...route.query, page } });
};

const setTag = (tag) => {
  router.push({ query: { ...route.query, tag, page: 1 } });
};
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>

    <div v-if="articlesInfo.length > 0" class="container page">
      <div class="row">
        <div class="col-md-9">
          <ArticlePreview
            v-for="article in articlesInfo"
            :key="article.slug"
            :article="article"
          />

          <form>
            <ul class="pagination">
              <li
                v-for="page in pageAmount"
                :key="page"
                :class="['page-item', { active: page === currentPage }]"
              >
                <button
                  v-if="page !== currentPage"
                  class="page-link"
                  @click.prevent="setPage(page)"
                >
                  {{ page }}
                </button>
                <span v-else class="page-link">{{ page }}</span>
              </li>
            </ul>
          </form>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <form>
              <div class="tag-list">
                <button
                  v-for="tag in tagsInfo"
                  :key="tag"
                  class="tag-pill tag-default"
                  @click.prevent="setTag(tag)"
                >
                  {{ tag }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
