import { API_KEY, API_URL } from "./config.ts";
import { apiClient } from "./apiclient.ts";

export class MovieService {
  private static instance: MovieService;

  constructor() {}

  // 싱글톤 인스턴스를 반환하는 메서드
  public static getInstance(): MovieService {
    if (!MovieService.instance) {
      MovieService.instance = new MovieService();
    }
    return MovieService.instance;
  }

  async getMovieData(page: number, sort_by: string) {
    const url = API_URL + "discover/movie";
    const data = {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        sort_by: sort_by,
        include_adult: false,
        include_video: false,
        page: page,
        with_watch_providers: "providers:8",
        with_watch_monetization_types: "flatrate",
      },
    };
    try {
      return apiClient.get(url, data);
    } catch (error) {
      return null;
    }
  }
}
