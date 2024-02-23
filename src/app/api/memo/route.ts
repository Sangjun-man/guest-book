import { Color, Memo, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export type RequestData = {
  nickname: Memo["nickname"];
  content: Memo["content"];
  color: Memo["color"];
};

type ResponseData = {
  message: string;
};

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { nickname, content } = data;
  const fontColors = ["BLUE", "ORANGE", "GREEN"] as Color[];
  const randomColor = fontColors[Math.floor(Math.random() * fontColors.length)];
  console.log(nickname, data);
  try {
    await prisma.memo.create({
      data: {
        color: randomColor,
        nickname,
        content,
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "실패",
    });
  }

  return NextResponse.json({
    message: "성공",
  });
}
