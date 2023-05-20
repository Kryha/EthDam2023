// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {stringToAnimalName} from "@blockbusters/util-animal-names"

type Data = {
  username: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let string = ""
  if (typeof req.query.string === "string") {
    string = req.query.string
  }
  const animalName = stringToAnimalName(string)  
  res.status(200).json({ username: animalName})
}
