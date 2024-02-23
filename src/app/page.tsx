import { PrismaClient } from "@prisma/client";
import Bottom from "../components/Bottom/Bottom";
import MemoContainer from "@/components/MemoContainer/MemoContainer";
import Link from "next/link";

export default async function Home() {
  const prisma = new PrismaClient();
  const getMemo = async () => {
    const memos = await prisma.memo.findMany({});
    return {
      props: { memos },
      revalidate: 0,
    };
  };

  const {
    props: { memos },
  } = await getMemo();

  return (
    <main>
      <MemoContainer memos={memos} />
      <Bottom>
        <button>
          <Link href="/memo">코멘트 남기기 </Link>
        </button>
      </Bottom>
    </main>
  );
}
