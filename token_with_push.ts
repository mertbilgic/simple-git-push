import { simpleGit, SimpleGit } from "simple-git";
import fs from "fs";

const REPO_NAME = "---------";
const FILE_PATH = `./${REPO_NAME}/file.txt`;
const TOKEN_NAME = "----------"
const TOKEN = "-----------"
const GROUP_NAME = "------"

const REPO_URL = `https://${TOKEN_NAME}:${TOKEN}@gitlab.com/${GROUP_NAME}/${REPO_NAME}.git`;

function createFile() {
  let data = "This is a file containing a collection of movies...123123123---TOKEN";

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

    await git.clone(REPO_URL)

    createFile()

    git
      .cwd({ path: `./${REPO_NAME}`, root: true })
      .add("./*")
      .commit("first commit!")
      .push(["-u", "origin", "main"], function () {
        console.log("Test");
      });
  } catch (e) {
    /* handle all errors here */
  }
})();
