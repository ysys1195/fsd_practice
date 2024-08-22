<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
    default: () => ({
      createdAt: "",
      author: { username: "", image: "" },
      favoritesCount: 0,
      slug: "",
      title: "",
      description: "",
      tagList: [],
    }),
  },
});

const formattedDate = props.article.createdAt
  ? new Date(props.article.createdAt).toLocaleDateString(undefined, {
      dateStyle: "long",
    })
  : "Date not available";
</script>

<template>
  <div class="article-preview">
    <div class="article-meta">
      <RouterLink :to="`/profile/${article.author.username}`">
        <img :src="article.author.image" alt="" />
      </RouterLink>
      <div class="info">
        <RouterLink :to="`/profile/${article.author.username}`">
          {{ article.author.username }}
        </RouterLink>
        <span class="date">{{ formattedDate }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>

    <RouterLink :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li
          v-for="tag in article.tagList"
          :key="tag"
          class="tag-default tag-pill tag-outline"
        >
          {{ tag }}
        </li>
      </ul>
    </RouterLink>
  </div>
</template>

<style scoped></style>
