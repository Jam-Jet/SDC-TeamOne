// if you dont have k6, see this documentation for install:
// https://k6.io/docs/get-started/installation/
// run tests locally: "k6 run script.post.test.js"
// run test to cloud for graphs: "k6 run -o cloud script.post.test.js"

import http from "k6/http";
import { check } from "k6";

// Test for 1/10/100/1000 rps
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
      name: "Post Message",
    },
  },
};

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
    sfsdf: (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 200,
  });
}
