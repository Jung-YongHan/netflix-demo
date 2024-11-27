<template>
  <Header />
  <div v-if="isLoaded" class="main-page">
    <!-- 메인 영화 섹션 -->
    <section
      v-if="mainMovie"
      class="main-movie-section"
      :style="{
        backgroundImage: `url(${IMAGE_BASE_URL + mainMovie.poster_path})`,
      }"
    >
      <div class="main-movie-info">
        <h1 class="main-movie-title">{{ mainMovie.title }}</h1>
        <p class="main-movie-description">{{ mainMovie.overview }}</p>
        <div class="main-movie-buttons">
          <button class="btn btn-primary">재생</button>
          <button class="btn btn-secondary">상세 정보</button>
        </div>
      </div>
    </section>

    <section class="movie-section">
      <h2 class="section-title">인기 영화</h2>
      <Carousel
        :value="popularMovies"
        :numVisible="6"
        :numScroll="6"
        :show-indicators="false"
      >
        <template #item="slotProps">
          <div class="movie-item">
            <img
              :src="IMAGE_BASE_URL + slotProps.data.poster_path"
              :alt="slotProps.data.title"
              class="movie-poster"
            />
            <p class="movie-title">{{ slotProps.data.title }}</p>
          </div>
        </template>
      </Carousel>
    </section>

    <!-- 최신 영화 섹션 -->
    <section class="movie-section">
      <h2 class="section-title">최신 영화</h2>
      <Carousel
        :value="latestMovies"
        :numVisible="6"
        :numScroll="6"
        :show-indicators="false"
      >
        <template #item="slotProps">
          <div class="movie-item">
            <img
              :src="IMAGE_BASE_URL + slotProps.data.poster_path"
              :alt="slotProps.data.title"
              class="movie-poster"
            />
            <p class="movie-title">{{ slotProps.data.title }}</p>
          </div>
        </template>
      </Carousel>
    </section>

    <!-- 액션 영화 섹션 -->
    <section class="movie-section">
      <h2 class="section-title">액션 영화</h2>
      <Carousel
        :value="actionMovies"
        :numVisible="6"
        :numScroll="6"
        :show-indicators="false"
      >
        <template #item="slotProps">
          <div class="movie-item">
            <img
              :src="IMAGE_BASE_URL + slotProps.data.poster_path"
              :alt="slotProps.data.title"
              class="movie-poster"
            />
            <p class="movie-title">{{ slotProps.data.title }}</p>
          </div>
        </template>
      </Carousel>
    </section>

    <!-- 호러 영화 섹션 -->
    <section class="movie-section">
      <h2 class="section-title">호러 영화</h2>
      <Carousel
        :value="horrorMovies"
        :numVisible="6"
        :numScroll="6"
        :show-indicators="false"
      >
        <template #item="slotProps">
          <div class="movie-item">
            <img
              :src="IMAGE_BASE_URL + slotProps.data.poster_path"
              :alt="slotProps.data.title"
              class="movie-poster"
            />
            <p class="movie-title">{{ slotProps.data.title }}</p>
          </div>
        </template>
      </Carousel>
    </section>
  </div>
  <div v-else-if="!isLoaded && errorMessage === ''" class="main-page">
    <ProgressSpinner class="loading-spinner" />
  </div>
  <div v-else class="main-page">
    <h1 class="error">{{ errorMessage }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { checkIsLoggedIn } from "../../utils/local_storage_utils.ts";
import Header from "../components/Header.vue";
import { useBaseRouter } from "../../router/useBaseRouters.ts";
import { MovieService } from "../../service/movie_service.ts";
import { IMAGE_BASE_URL } from "../../service/config.ts";
import Carousel from "primevue/carousel";
import ProgressSpinner from "primevue/progressspinner";

const { navigateToSignIn } = useBaseRouter();

const mainMovie = ref(null);
const popularMovies = ref([]);
const latestMovies = ref([]);
const actionMovies = ref([]);
const horrorMovies = ref([]);

const errorMessage = ref("");
const isLoaded = ref(false);

const getPopularMovies = async () => {
  const response = await MovieService.getInstance().getMovieData(1, "popular");
  popularMovies.value = response.data.results;
  mainMovie.value = response.data.results[0];
};

const getReleaseMovies = async () => {
  const response = await MovieService.getInstance().getMovieData(
    1,
    "now_playing",
  );
  latestMovies.value = response.data.results;
};

const getActionMovies = async () => {
  const response = await MovieService.getInstance().getMovieDataByGenre(
    1,
    "28",
  );
  actionMovies.value = response.data.results;
};

const getHorrorMovies = async () => {
  const response = await MovieService.getInstance().getMovieDataByGenre(
    1,
    "29",
  );
  horrorMovies.value = response.data.results;
};

const getMovieData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    await getPopularMovies();
    await getReleaseMovies();
    await getActionMovies();
    await getHorrorMovies();
  } catch (error) {
    errorMessage.value = "문제가 발생하였습니다.";
  }
  isLoaded.value = true;
};

onMounted(async () => {
  if (!checkIsLoggedIn()) {
    navigateToSignIn();
  }
  await getMovieData();
});
</script>

<style scoped>
.main-page {
  background-color: #141414;
  color: white;
  padding-bottom: 40px;
  min-height: 100vh;
}

.main-page .loading-spinner {
  background-color: #141414;
  color: white;
  padding-bottom: 40px;
  min-height: 100vh;
  display: flex; /* Flex 컨테이너로 설정 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center;
}

.main-page .error {
  background-color: #141414;
  color: white;
  padding-bottom: 40px;
  min-height: 100vh;
  display: flex; /* Flex 컨테이너로 설정 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center;
}

/* 메인 영화 섹션 */
.main-movie-section {
  height: 60vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 40px;
}

.main-movie-info {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
}

.main-movie-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.main-movie-description {
  font-size: 1rem;
  margin-bottom: 20px;
}

.main-movie-buttons .btn {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 1rem;
}

/* 영화 리스트 섹션 */
.movie-section {
  margin-bottom: 40px;
  padding: 20px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
}

.movie-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.movie-item {
  flex-shrink: 0;
  width: 220px;
  text-align: center;
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.movie-poster {
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}

.movie-poster:hover {
  transform: scale(1.1); /* 살짝 확대 */
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
}

.movie-title {
  font-size: 1.5rem;
  color: white;
}
</style>
