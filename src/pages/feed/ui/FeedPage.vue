<script setup>
import { ref, onMounted } from "vue";
import ArticlePreview from "./ArticlePreview.vue";
import feedModule from "../index";
const { loader } = feedModule;

const articles = ref([]); // articlesをrefで初期化

onMounted(async () => {
  try {
    // loader関数を実行し、articlesに結果を格納
    const result = await loader();
    articles.value = result.articles; // articlesプロパティにアクセス
  } catch (error) {
    console.error("Error loading articles:", error);
  }
});
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>

    <div v-if="articles.length > 0" class="container page">
      <div class="row">
        <div class="col-md-9">
          <ArticlePreview
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />
        </div>
      </div>
    </div>
  </div>
</template>
