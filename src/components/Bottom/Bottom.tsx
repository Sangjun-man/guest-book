import { PropsWithChildren } from "react";
import style from "./Bottom.module.css";
function Bottom({ children }: PropsWithChildren) {
  return <section className={style.bottomSection}>{children}</section>;
}

export default Bottom;
