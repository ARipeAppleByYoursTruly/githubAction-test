import fs from "node:fs"



export default async function main({github, context}) {
  const ownerName = context.repo.owner
  const {repo_otherStuff_input} = JSON.parse(fs.readFileSync("./repoData/input.json", "utf-8"))

  const repoList = await (async () => {
    const repoList_response = await github.rest.repos.listForUser({
      username: ownerName,
      sort: "pushed",
      per_page: 100
    })

    if (repoList_response.status !== 200) {
      throw new Error("repoList_response.status is not 200")
    }
    else {
      return repoList_response.data
    }
  })()

  console.dir(repoList, {depth: null, maxArrayLength: null, maxStringLength: null})
}
