// if you dont have k6, see this documentation for install:
// https://k6.io/docs/get-started/installation/
// run tests locally: "k6 run post.ws.test.js"
// run test to cloud for graphs: "k6 run -o cloud post.ws.test.js"

// import ws from "k6/ws";
// import { check } from "k6";

export let options = {
  vus: 50,
  iterations: 50,
  ext: {
    loadimpact: {
      projectID: 3622560,
      // Test runs with the same name groups test runs together
      name: "Post Message",
    },
  },
};

// export default function () {
//   const url = "ws://localhost:3003";
//   //   const params = { tags: { my_tag: "hello" } };
//   const payload = {
//     message: "test message",
//     send_date: "2022-12-12 16:04",
//     username: "test",
//   };

//   // let res = http.post(url, payload, params);
//   // check(res, {
//   //     sfsdf: (r) => r.status === 200,
//   //     "transaction time OK": (r) => r.timings.duration < 200,
//   // });

//   const res = ws.connect(url, payload, function (socket) {
//     socket.on("open", function open() {
//       console.log("connected");

//       //   socket.send(JSON.stringify(payload));
//       // });
//       socket.send(JSON.stringify(payload));

//       //   socket.setInterval(function timeout() {
//       //     socket.send(JSON.stringify(payload));
//       //     console.log("Sending message every 1sec");
//       //   }, 1000);
//     });

//     // socket.on("ping", () => console.log("PING!"));
//     // socket.on("pong", () => console.log("PONG!"));
//     socket.on("close", () => console.log("disconnected"));
//   });

//   check(res, { "status is 101": (r) => r && r.status === 101 });
// }

import ws from "k6/ws";
import { check } from "k6";

export default function () {
  const url = "ws://localhost:3003";
  const params = { tags: { my_tag: "hello" } };
  const payload = {
    message: "test message",
    send_date: "2022-12-12 16:04",
    username: "test",
  };

  const res = ws.connect(url, params, function (socket) {
    socket.on("open", () => console.log("connected"));
    socket.on("message", (data) => console.log("Message received: ", data));
    socket.on("ping", () => console.log("PING!"));
    socket.send(JSON.stringify(payload));
    socket.on("pong", () => console.log("PONG!"));
    socket.on("close", () => console.log("disconnected"));
  });

  check(res, { "status is 101": (r) => r && r.status === 101 });
}
