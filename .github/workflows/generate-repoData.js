import fs from "node:fs"



export default async function main() {
  // const input = fs.readFileSync("/repoData/input.json")
  const input = fs.readdirSync(".", {withFiletypes: true})
  console.dir(input, {depth: null, maxArrayLength: null, maxStringLength: null})
}
