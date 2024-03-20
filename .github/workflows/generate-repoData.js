import fs from "node:fs"



export default async function main({github, context}) {
  const ownerName = context.repo.owner
  const {repoData_otherStuff_input} = JSON.parse(fs.readFileSync("./repoData/input.json", "utf-8"))

  // Get user's list of repos
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



  // const repoData = {
  //   hundredPercentGuides: [],
  //   otherStuff: []
  // }

  const repoData = (() => {
    const asd = fs.readFileSync("./repoData/output.json", "utf-8")
    console.dir(asd, {depth: null, maxArrayLength: null, maxStringLength: null})

    return {
      hundredPercentGuides: [],
      otherStuff: []
    }
  })()

  // Generate repoData for 100% guides
  // To be implemened when I've started making 100%% guides

  // Generate repoData for other stuff
  for (const repoName of repoData_otherStuff_input) {
    // const repoName
  }
}
