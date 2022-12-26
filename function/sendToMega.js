const { spawn } = require("child_process");
const fs = require("fs");
const multer = require("multer");
const mkdirp = require("mkdirp");
const FormData = require("form-data");

const { Storage } = require("megajs");

const sendToMega = async (req, res) => {
  // try {
  //   console.log("called");
  //   // const { data } = req.body;
  //   // const data = "dj";
  //   // fs.writeFile("hello.txt", data, () => {
  //   //   console.log("file created");
  //   // });
  //   // const getWeget = spawn("apt install", ["wget"]);
  //   // getWeget.stdout.on("data", (data) => {
  //   //   console.error(`weget: ${data}`);
  //   // });

  //   // const ls = spawn("wget", [
  //   //   "https://mega.nz/linux/repo/Debian_11/amd64/megacmd-Debian_11_amd64.deb",
  //   // ]);
  //   // ls.stdin.write("sudo install ./megacmd-Debian_11_amd64.deb /");

  //   // ls.stdout.on("data", (data) => {
  //   //   console.error(`weget: ${data}`);
  //   // });
  //   // const spawnedShell = spawn("mega-cmd");
  //   // spawnedShell.stdin.write(
  //   //   `login ${process.env.MEGA_UPLOAD_LOGIN_URL} ${process.env.MEGA_UPLOAD_PASSWORD} \n`
  //   // );
  //   // spawnedShell.stdin.write("put ./hello.txt");

  //   // spawnedShell.stdout.on("data", (data) => {
  //   //   console.log(`stdout: ${data}`);
  //   // });

  //   // spawnedShell.stderr.on("data", (data) => {
  //   //   console.error(`stderr: ${data}`);
  //   // });

  //   // spawnedShell.on("close", (code) => {
  //   //   console.log(`child process exited with code ${code}`);
  //   // });
  //   // spawnedShell.stdin.end()

  //   const storage = await new Storage({
  //     email: process.env.MEGA_EMAIL,
  //     password: process.env.MEGA_PASSWORD,
  //   }).ready;
  //   console.log("logged in");

  //   const data = fs.readFileSync("uploads/myfile.js");
  //   const upFile = await storage.upload("test.js", data).complete;
  //   console.log("success");
  //   res.status(200).json({ message: "success" });
  // } catch (error) {
  //   console.log("error on sendToMega", error.message);
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
  try {
    const file = req.file;
    console.log(file);
    const storage = await new Storage({
      email: process.env.MEGA_EMAIL,
      password: process.env.MEGA_PASSWORD,
    }).ready;
    console.log("logged in");
    const data = fs.readFileSync(`uploads/${file.filename}`);

    const upFile = await storage.upload(file.originalname, data).complete;
    fs.unlinkSync(file.path);
    console.log("success");
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = sendToMega;
