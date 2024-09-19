import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>yet another github user search</title>
        <meta name="description" content="yet another github user search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page}`}
      >
        <main>
          Listado de Usuarios
        </main>
        
        <aside>
          Favoritos
        </aside>
        <footer>
          Credenciales
        </footer>
      </div>
    </>
  );
}
