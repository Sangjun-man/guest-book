/* eslint-disable @next/next/no-img-element */
"use client";

import { Memo } from "@prisma/client";
import style from "./MemoContainer.module.css";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Loader from "../Loader/Loader";
import Card from "../Card/Card";

interface MemoContainerProps {
  memos: Memo[];
}
function MemoContainer({
  memos,
  ...props
}: PropsWithChildren<MemoContainerProps>) {
  const [freshMemo, setFreshMemo] = useState(memos);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const splitedMemo = useMemo(
    () =>
      freshMemo.reduce<[Memo[], Memo[], Memo[]]>(
        (acc, cur, index) => {
          acc[index % 3].push(cur);
          return acc;
        },
        [[], [], []]
      ),
    [freshMemo]
  );

  const getMemo = useCallback(async () => {
    const response = await fetch("/api/memo", {
      method: "get",
      next: {
        revalidate: 0,
      },
    });
    return response;
  }, []);

  useEffect(() => {
    const fetching = async () => {
      const res = await getMemo();
      const { memos } = await res.json();
      setFreshMemo(memos);
    };

    fetching();
    const id = setInterval(fetching, 10000);
    return () => clearInterval(id);
  }, []);

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
            ? freshMemo.map((memo) => (
                <Card key={`memo_${memo.id}`} memo={memo} />
              ))
            : splitedMemo.map((freshMemo, i) => (
                <div key={`spliteed_${i}`} className={style.splited}>
                  {freshMemo.map((memo) => (
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
