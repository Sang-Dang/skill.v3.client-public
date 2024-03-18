import styles from "./page.module.css";
import Link from "next/link";
import Header from "@/custom-components/Header";
import TitleIntro from "@/custom-components/home-page/TitleIntro";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <TitleIntro />
    </main>
  );
}
