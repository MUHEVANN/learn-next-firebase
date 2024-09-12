import { NextApiRequest, NextApiResponse } from "next";
import { singUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await singUp(req.body, (status: boolean) => {
      if (status) {
        res.status(200).json({
          status: true,
          message: "Success register",
          statusCode: 200,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Email already exist",
          statusCode: 400,
        });
      }
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Cannot access with get method",
      statusCode: 400,
    });
  }
}
