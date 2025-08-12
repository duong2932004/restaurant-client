import commonData from "./common.json";
import homeData from "./home.json";
import registerData from "./register.json";
import loginData from "./login.json";
import headersData from "./headers.json";

const messages = {
  ...commonData,
  home: homeData,
  register: registerData,
  login: loginData,
  headers: headersData,
};

export default messages;
