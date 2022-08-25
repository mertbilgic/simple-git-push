import { simpleGit, SimpleGit } from "simple-git";
import fs from "fs";

const USER = "---";
const PASS = "---";
const REPO_NAME = "----";
const FILE_PATH = `./${REPO_NAME}/file.txt`;
const REPO_URL = `gitlab.com/-----/${REPO_NAME}`;

const remote = `https://${USER}:${PASS}@${REPO_URL}`;

function createFile() {
  let data = "This is a file containing a collection of movies...";

  fs.writeFile(
    FILE_PATH,
    data,
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        console.log(fs.readFileSync(FILE_PATH, "utf8"));
      }
    }
  );
}

(async () => {
  try {
    await fs.promises.rmdir(`./${REPO_NAME}`, { recursive: true });

    const git: SimpleGit = simpleGit();

    await git
      .clone(remote)
      .then(() => console.log("finished clone"))
      .catch((err) => console.error("failed clone : ", err));

    createFile();

    git
      .cwd({ path: "./nodegit-test", root: true })
      .add("./*")
      .commit("first commit!")
      .push(["-u", "origin", "main"])
      .then(() => console.log("finished"))
      .catch((err) => console.error("failed: ", err));
  } catch (e) {
    console.log(e);
  }
})();
