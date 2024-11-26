// pages/api/getBaristas.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const baristas = await prisma.barista.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      res.status(200).json(baristas);
    } catch (error) {
      console.error("Error fetching baristas:", error);
      res.status(500).json({ message: "Error fetching baristas" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
