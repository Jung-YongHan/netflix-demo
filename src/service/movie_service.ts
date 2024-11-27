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
    const url = API_URL + `movie/${sort_by}`;
    const data = {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        page: page,
      },
    };
    return apiClient.get(url, data);
  }

  async getMovieDataByGenre(page: number, sort_by: string) {
    const url = API_URL + `/discover/movie`;
    const data = {
      params: {
        api_key: API_KEY,
        sort_by: sort_by,
        language: "ko-KR",
        page: page,
      },
    };
    return apiClient.get(url, data);
  }
}
