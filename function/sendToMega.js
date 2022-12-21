const { spawn } = require("child_process");
const fs = require("fs");

const sendToMega = async (req, res) => {
  try {
    console.log("called");
    // const { data } = req.body;
    const data = "dj";
    fs.writeFile("hello.txt", data, () => {
      console.log("file created");
    });
    const ls = spawn("lsb_release", ["-a"]);
    ls.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    const spawnedShell = spawn("mega-cmd");
    spawnedShell.stdin.write(
      `login ${process.env.MEGA_UPLOAD_LOGIN_URL} ${process.env.MEGA_UPLOAD_PASSWORD} \n`
    );
    spawnedShell.stdin.write("put ../hello.txt \n");

    spawnedShell.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    spawnedShell.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    spawnedShell.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
    spawnedShell.stdin.end();
    // res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("error on sendToMega", error.message);
    // res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = sendToMega;
