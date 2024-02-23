"use client";
import { Memo } from "@prisma/client";
import * as style from "./Card.module.css";
import dayjs from "dayjs";
import clsx from "clsx";
import Lottie from "react-lottie-player";
function Card({ memo }: { memo: Memo }) {
  return (
    <article className={clsx([style.card, memo.color.toLowerCase()])}>
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
