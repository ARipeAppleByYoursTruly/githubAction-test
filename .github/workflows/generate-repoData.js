import fs from "node:fs"



export default async function main({github, context}) {
  const ownerName = context.repo.owner
  const {repoNames} = JSON.parse(fs.readFileSync("./repoData/input.json", "utf-8"))

  const repoList_response = await github.rest.repos.listForUser({
    username: ownerName,
    sort: "pushed",
    per_page: 100
  })

  console.dir(repoList_response, {depth: null, maxArrayLength: null, maxStringLength: null})
}
