import fs from "node:fs"



export default async function main() {
  const input = fs.readFileSync("./repoData/input.json", "utf-8")
  console.dir(input, {depth: null, maxArrayLength: null, maxStringLength: null})
}
