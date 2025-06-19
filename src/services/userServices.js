import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000"; //"https://api-breakingnews-j2jf.onrender.com";

export function signup(data) {
  delete data.confirmPassword;
  const body = {
    ...data,
    username: generateUserName(data.name),
    avatar:
      "https://i.pinimg.com/1200x/bb/e3/02/bbe302ed8d905165577c638e908cec76.jpg",
    background:
      "https://img.freepik.com/free-vector/paper-style-dynamic-lines-background_23-2149008629.jpg?semt=ais_hybrid&w=740",
  };
  const response = axios.post(`${baseURL}/user/create`, body);
  return response;
}

export function signin(data) {
  const response = axios.post(`${baseURL}/auth/login`, data);
  return response;
}

export function userLogged() {
  const response = axios.get(`${baseURL}/user/findById`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

function generateUserName(name) {
  const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerCaseWithoutSpaces}-${randomNumber}`;
}
