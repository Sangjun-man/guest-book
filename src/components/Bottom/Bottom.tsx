import { PropsWithChildren } from "react";
import * as style from "./Bottom.module.css";
function Bottom({ children }: PropsWithChildren) {
  return <section className={style.bottomSection}>{children}</section>;
}

export default Bottom;
