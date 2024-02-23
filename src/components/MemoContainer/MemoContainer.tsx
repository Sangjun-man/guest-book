/* eslint-disable @next/next/no-img-element */
"use client";

import { Memo } from "@prisma/client";
import style from "./MemoContainer.module.css";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

interface MemoContainerProps {
  memos: Memo[];
}
function MemoContainer({ memos }: PropsWithChildren<MemoContainerProps>) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const splitedMemo = useMemo(
    () =>
      memos.reduce<[Memo[], Memo[], Memo[]]>(
        (acc, cur, index) => {
          acc[index % 3].push(cur);
          return acc;
        },
        [[], [], []]
      ),
    [memos]
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1248) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    handleResize();
    setIsLoaded(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isLoaded ? (
        <section className="bg">
          <Loader />
        </section>
      ) : (
        <section className={style.container}>
          {isMobile
            ? memos.map((memo) => <Card key={`memo_${memo.id}`} memo={memo} />)
            : splitedMemo.map((memos, i) => (
                <div key={`spliteed_${i}`} className={style.splited}>
                  {memos.map((memo) => (
                    <Card key={`memo_${memo.id}`} memo={memo} />
                  ))}
                </div>
              ))}
        </section>
      )}
    </>
  );
}

export default MemoContainer;
