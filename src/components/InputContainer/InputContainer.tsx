"use client";
import Bottom from "@/components/Bottom/Bottom";
import style from "./inputContainer.module.css";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function InputContainer() {
  const [nickname, setNickname] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  const saveComment = useCallback(
    async ({
      nickname: n,
      content: c,
    }: {
      nickname: string;
      content: string;
    }) => {
      const nickname = n.trim();
      const content = c.trim();

      if (!nickname) {
        return alert("공백을 제외한 문자를 닉네임에 입력해주세요!");
      }
      if (!content) {
        return alert("공백을 제이한 문자를 코멘트를 입력해주세요!");
      }

      const response = await fetch("/api/memo", {
        method: "POST",
        body: JSON.stringify({
          nickname,
          content,
        }),
      });
      const { message } = await response.json();

      if (message === "실패") {
        alert("메세지가 저장되지 않았습니다");
      } else {
        router.push("/");
      }
    },
    []
  );

  return (
    <>
      <section className={style.inputSection}>
        <div className={style.inputElem}>
          <label>닉네임</label>
          <input
            max={10}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <div className={style.inputElem}>
          <label>내용</label>
          <textarea
            maxLength={300}
            className={style.textArea}
            placeholder="YAPP 23기에게 하고싶은 말을 남겨주세요. (최대 300자)"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      </section>
      <Bottom>
        <button
          disabled={!(nickname && content)}
          className="button"
          onClick={() => saveComment({ nickname, content })}
        >
          등록하기
        </button>
      </Bottom>
    </>
  );
}
