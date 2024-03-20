import fs from "node:fs"



export default async function main({github, context}) {
  const ownerName = context.repo.owner



  // Get repos that I want to track as other stuff
  const {repoData_otherStuff_input} = (() => {
    let jsonFile

    try {
      jsonFile = fs.readFileSync("./repoData/input.json", "utf-8")
    }
    catch (error) {
      throw new Error("repoData/input.json not found")
    }

    return JSON.parse(jsonFile)
  })()



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



  // Get repoData
  const repoData = (() => {
    let jsonFile

    try {
      jsonFile = fs.readFileSync("./repoData/output.json", "utf-8")
    }
    catch (error) {
      // File doesn't exist, repoData will be empty
      return {
        hundredPercentGuides: [],
        otherStuff: []
      }
    }

    // File exists, repoData will use existing values as base
    return JSON.parse(jsonFile)
  })()



  // Generate repoData for 100% guides
  // To be implemened when I've started making 100% guides



  // Generate repoData for other stuff
  for (const repoName of repoData_otherStuff_input) {
    // Find the repo in repoList
    const repo_found = repoList.find((repo) => {
      return repo.name === repoName
    })

    // Stale repos will not be updated
    if (repo_found === undefined) {
      continue
    }



    // Replace url_html with the url to GitHub Pages if the repo has Pages
    let url_html = repo_found.url_html

    if (repo_found.has_pages) {
      url_html = `https://aripeapplebyyourstruly.github.io/${repoName}`
    }



    // Get url of thumbnail if it exists
    let url_thumbnail = await (async () =>{
      const url = `https://raw.githubusercontent.com/${ownerName}/${repoName}/` +
        "for-personal-website/thumbnail.webp"

      const response = await fetch(url)

      if (response.ok) {
        return url
      }
      else {
        return ""
      }
    })()



    repoData.otherStuff.push({
      name: repoName,
      description: repo_found.description,
      pushed_at: repo_found.pushed_at,
      url_html: url_html,

    })
  }

  console.dir(repoData, {depth: null, maxArrayLength: null, maxStringLength: null})
}
