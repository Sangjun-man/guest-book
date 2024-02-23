"use client";
import { Memo } from "@prisma/client";
import * as style from "./Card.module.css";
import dayjs from "dayjs";
import clsx from "clsx";
function Card({ memo }: { memo: Memo }) {
  const fontColors = [style.blue, style.green, style.orange];
  const randomColor = fontColors[Math.floor(Math.random() * fontColors.length)];

  return (
    <article className={clsx([style.card, randomColor])}>
      <div>{memo.content}</div>
      <div>
        {memo.nickname}
        <br />
        {dayjs(memo.created_at).format("YY.MM.DD HH:MM")}
      </div>
    </article>
  );
}
export default Card;
