import app from "./src/app.js";
import readline from "readline";

const PORT = 3055;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});
if (process.platform === "win32") {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("SIGINT", () => {
    rl.question("Are you sure you want to exit? ", (answer) => {
      if (answer.match(/^y(es)?$/i)) rl.close();
    });
  });
}
process.on("SIGINT", () => {
  server.close(() => {
    console.log("server closed");
    process.exit(0);
  });
});
