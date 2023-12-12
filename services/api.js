import axios from "axios";
import { userState } from "../services/recoilAuth";
import { getRecoil } from "recoil-nexus";
const api = axios.create({
  baseURL: "https://redfox-futebol-backend-dev-jsmd.4.us-1.fl0.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((req) => {
  const currentUserState = getRecoil(userState);
  if (currentUserState.access != null) {
    req.headers.authorization = `Bearer ${currentUserState.access}`;
  }
  return req;
});
export default api;
