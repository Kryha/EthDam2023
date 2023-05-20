import fs from "fs";
import path from "path";

const animalNames = fs
  .readFileSync(path.join(__dirname, "animal-names.txt"))
  .toString()
  .split("\n");
const animalNamesLength = animalNames.length;

export function stringToAnimalName(s: string) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    total += char.charCodeAt(0);
  }

  const animalIndex = total % animalNamesLength;
  return animalNames[animalIndex]
}
