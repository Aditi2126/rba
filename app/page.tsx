// 'use client'

// import Head from "next/head";
// import Image from "next/image";
// import localFont from "next/font/local";
// import styles from './styles/Home.module.css'
// // import styles from "@/styles/Home.module.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Cafe Management Dashboard</title>
//         <meta name="description" content="Cafe Admin and Barista Dashboard" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <div
//         className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
//       >
//         <main className={styles.main}>
          
//           <ol>
//             <li>
//               Welcome to your cafe management system. Start by logging in as an admin to manage barista accounts or log in as a barista to check your tasks.
//             </li>
//             <li>
//               Admins can create new barista accounts and manage existing employees.
//             </li>
//           </ol>

//           <div className={styles.ctas}>
//             <a
//               className={styles.primary}
//               href="/admin/login"
//               rel="noopener noreferrer"
//             >
//               Go to Admin Login
//             </a>
//             <a
//               className={styles.secondary}
//               href="/barista/login"
//               rel="noopener noreferrer"
//             >
//               Go to Barista Login
//             </a>
//           </div>
//         </main>
//         <footer className={styles.footer}>
//           <p>2024 © Cafe Management System</p>
//         </footer>
//       </div>
//     </>
//   );
// }




'use client';

import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from './styles/Home.module.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Cafe Management Dashboard</title>
        <meta name="description" content="Cafe Admin and Barista Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        {/* Logo and Cafe Name */}
        <header className={styles.header}>
          <Image
            className={styles.logo}
            src="/images/cafe-inertia-logo.jpg"
            alt="Cafe Inertia Logo"
            width={80}
            height={80}
          />
          <h1 className={styles.cafeName}>Cafe Inertia</h1> {/* Animated Cafe Name */}
        </header>

        <main className={styles.main}>
          <ol>
            <li>
              Welcome to your cafe management system. Start by logging in as an admin to manage barista accounts or log in as a barista to check your tasks.
            </li>
            <li>
              Admins can create new barista accounts and manage existing employees.
            </li>
          </ol>

          <div className={styles.ctas}>
            <a className={styles.primary} href="/admin/login" rel="noopener noreferrer">
              Go to Admin Login
            </a>
            <a className={styles.secondary} href="/barista/login" rel="noopener noreferrer">
              Go to Barista Login
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>2024 © Cafe Management System</p>
        </footer>
      </div>
    </>
  );
}