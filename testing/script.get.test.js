// if you dont have k6, see this documentation for install:
// https://k6.io/docs/get-started/installation/
// run tests locally: "k6 run script.get.test.js"
// run test to cloud for graphs: "k6 run -o cloud script.get.test.js"

import http from "k6/http";
import { check, sleep } from "k6";

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
      name: "Get Messages",
    },
  },
};

export default function () {
  let res = http.get("http://localhost:3003/last1000messages");
  check(res, {
    "status was 200": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 200,
  });

  sleep(1);
}
