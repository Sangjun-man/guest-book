import Image from "next/image";
import styles from "./page.module.css";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  const getUser = async () => {
    const user = await prisma.user.findFirst({
      where: { name: "이상준" },
    });
    return {
      props: { user },
      revalidate: 10,
    };
  };

  const {
    props: { user },
  } = await getUser();

  return (
    <main>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
      <div>{user?.updatedAt.toString()}</div>
    </main>
  );
}
