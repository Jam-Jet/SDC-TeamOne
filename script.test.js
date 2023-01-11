// if you dont have k6, see this documentation for install:
// https://k6.io/docs/get-started/installation/
// then run from root project directory: "k6 run script.test.js"

import http from "k6/http";
import { check, sleep } from "k6";

//GET REQUESTS ACTIVE USERS HOMEPAGE
export let options = {
  vus: 1000,
  duration: "30s",
};

// export default function () {
//   let res = http.get('http://localhost:3003/users');
//   check(res, {
//     "status was 200": (r) => r.status === 200,
//     "transaction time OK": (r) => r.timings.duration < 200,
//     });

//   sleep(1);
// }

// POST REQUESTS LOAD
export default function () {
  const url = "http://localhost:3003/addMessage";
  const payload = JSON.stringify({
    message: "Hello, how are you?",
    send_date: "2022-12-12 16:04",
    username: "David",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(url, payload, params);
  check(res, {
    "status was 200": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 200,
  });
}
