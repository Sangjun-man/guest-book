import Link from "next/link";
import style from "./Header.module.css";
function Header() {
  return (
    <header className={style.header}>
      <Link className={style.image} href="/" />
    </header>
  );
}

export default Header;
