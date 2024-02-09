import { ReactNode } from "react";
import styles from "./card.module.scss";

interface CardsProps {
  children: ReactNode;
  cardClass: string;
}

const Cards = ({ children, cardClass }: CardsProps) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default Cards;
