// if you dont have k6, see this documentation for install:
// https://k6.io/docs/get-started/installation/
// run tests locally: "k6 run get.http.test.js"
// run test to cloud for graphs: "k6 run -o cloud get.http.test.js"

import http from "k6/http";
import { check, sleep } from "k6";

//1 RPS
export let options = {
  vus: 1,
  duration: "30s",
  ext: {
    loadimpact: {
      projectID: 3622560,
      // Test runs with the same name groups test runs together
      name: "Get Messages",
    },
  },
};

//10 RPS
// export let options = {
//   vus: 10,
//   duration: "30s",
//   ext: {
//     loadimpact: {
//       projectID: 3622560,
//       // Test runs with the same name groups test runs together
//       name: "Get Messages",
//     },
//   },
// };

//100 RPS
// export let options = {
//   vus: 100,
//   duration: "30s",
//   ext: {
//     loadimpact: {
//       projectID: 3622560,
//       // Test runs with the same name groups test runs together
//       name: "Get Messages",
//     },
//   },
// };

//1000 RPS
// export let options = {
//   vus: 1000,
//   duration: "30s",
//   ext: {
//     loadimpact: {
//       projectID: 3622560,
//       // Test runs with the same name groups test runs together
//       name: "Get Messages",
//     },
//   },
// };

// ----------------------------------------------------------------------- //

//GET LAST 100 MESSAGES REQUESTS LOAD
export default function () {
  let res = http.get("http://localhost:3003/last100messages");
  check(res, {
    "status was 200": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 200,
  });
  sleep(1);
}

// GET LAST 50 MESSAGES REQUESTS LOAD
// export default function () {
//   let res = http.get("http://localhost:3003/last50messages");
//   check(res, {
//     "status was 200": (r) => r.status === 200,
//     "transaction time OK": (r) => r.timings.duration < 200,
//   });
//   sleep(1);
// }
