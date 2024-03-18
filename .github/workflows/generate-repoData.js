import fs from "node:fs"



export default async function main() {
  const {repoNames} = JSON.parse(fs.readFileSync("./repoData/input.json", "utf-8"))
  console.dir(repoNames, {depth: null, maxArrayLength: null, maxStringLength: null})
}
