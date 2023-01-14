// if you dont have k6, see this documentation for install:
// https://k6.io/docs/get-started/installation/
// run tests locally: "k6 run post.http.test.js"
// run test to cloud for graphs: "k6 run -o cloud post.http.test.js"

import http from "k6/http";
import { check } from "k6";

//1 RPS
export let options = {
  // vus: 1,
  // vus: 10,
  // vus: 100,
  vus: 1000,
  duration: "30s",
  ext: {
    loadimpact: {
      projectID: 3622560,
      // Test runs with the same name groups test runs together
      name: "Get Messages",
    },
  },
};

// ----------------------------------------------------------------------- //

// POST MESSAGE REQUEST LOAD
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
    sfsdf: (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 200,
  });
}
