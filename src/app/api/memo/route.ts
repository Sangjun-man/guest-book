import { Color, Memo } from "@prisma/client";
import prisma from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export type RequestData = {
  nickname: Memo["nickname"];
  content: Memo["content"];
  color: Memo["color"];
};

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { nickname, content } = data;
  const fontColors = ["BLUE", "ORANGE", "GREEN"] as Color[];
  const randomColor = fontColors[Math.floor(Math.random() * fontColors.length)];
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

export async function GET(request: NextRequest, response: NextResponse) {
  const memos = await prisma.memo.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return NextResponse.json({
    memos,
  });
}
