"use client";
import Bottom from "@/components/Bottom/Bottom";
import style from "./inputContainer.module.css";
import { useCallback, useRef, useState } from "react";

export default function InputContainer() {
  const [nickName, setNickName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const fontColors = ["BLUE", "ORANGE", "GREEN"];
  const randomColor = fontColors[Math.floor(Math.random() * fontColors.length)];

  const saveComment = useCallback(async () => {
    console.log(nickName, comment);
    // fetch(`/api/save/comment`, {
    //   body: JSON.stringify({ nickName, comment }),
    // });
  }, []);

  return (
    <>
      <section className={style.inputSection}>
        <div className={style.inputElem}>
          <label>닉네임</label>
          <input
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div className={style.inputElem}>
          <label>내용</label>
          <textarea
            className={style.textArea}
            placeholder="YAPP 23기에게 하고싶은 말을 남겨주세요. (최대 300자)"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
      </section>
      <Bottom>
        <button
          disabled={!(nickName && comment)}
          className="button"
          onClick={() => saveComment()}
        >
          등록하기
        </button>
      </Bottom>
    </>
  );
}
