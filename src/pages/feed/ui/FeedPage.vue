<script setup>
import { ref, onMounted } from "vue";
// import ArticlePreview from "./ArticlePreview.vue";
import feedModule from "../index";
const { loader } = feedModule;

const articlesInfo = ref([]); // articlesをrefで初期化
const tagsInfo = ref([]); // articlesをrefで初期化

onMounted(async () => {
  try {
    // loader関数を実行し、articlesに結果を格納
    const { articles, tags } = await loader();
    articlesInfo.value = articles; // articlesプロパティにアクセス
    tagsInfo.value = tags;
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

    <div v-if="articlesInfo.length > 0" class="container page">
      <div class="row">
        <div class="col-md-9">
          <ArticlePreview
            v-for="article in articlesInfo"
            :key="article.slug"
            :article="article"
          />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <Form>
              <div class="tag-list">
                <button
                  v-for="tag in tagsInfo"
                  :key="tag"
                  class="tag-pill tag-default"
                >
                  {{ tag }}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
