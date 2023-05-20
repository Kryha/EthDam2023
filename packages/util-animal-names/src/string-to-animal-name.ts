import { animalNames } from "./animal-names";

const animalNamesLength = animalNames.length;

export function stringToAnimalName(s: string) {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    total += char.charCodeAt(0);
  }

  const animalIndex = total % animalNamesLength;
  return animalNames[animalIndex];
}
