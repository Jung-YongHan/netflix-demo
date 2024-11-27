import axios from "axios";
import { API_ACCESS_TOKEN } from "./config.ts";

// const APPLICATION_JSON = {
//   accept: "application/json",
// };
//
// const APPLICATION_FORM_URLENCODED = {
//   "Content-Type": "application/x-www-form-urlencoded",
// };

export const apiClient = axios.create({
  headers: {
    // APPLICATION_JSON,
    Authorization: "Bearer " + API_ACCESS_TOKEN,
  },
});
//
// const apiEncodedClient = axios.create({
//   headers: {
//     APPLICATION_FORM_URLENCODED,
//     Authorization: "Bearer " + API_ACCESS_TOKEN,
//   },
// });
//
// export { apiClient, apiEncodedClient };
