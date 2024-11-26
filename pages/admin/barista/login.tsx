// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import styles from '../../../app/styles/BaristaLogin.module.css';


// export default function BaristaLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/barista/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem('token', data.token);
//       router.push('/barista/dashboard');
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* Hero Section */}
//       <div className={styles.heroSection}>
//         <h1 className={styles.heroTitle}>Welcome to Barista</h1>
//         <p className={styles.heroDescription}>
//           Barista comes with the perfect blend of highly customizable predesigned pages, flexible options, and beautiful elements for your coffee shop website.
//         </p>
//         <button className={styles.ctaButton}>Get Barista</button>
//       </div>

//       {/* Login Form Section */}
//       <div className={styles.loginFormSection}>
//         <h2 className={styles.formTitle}>Barista Login</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={styles.inputField}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={styles.inputField}
//           />
//           <button type="submit" className={styles.submitButton}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useRouter } from 'next/router';
import { useState } from 'react';

export default function BaristaLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/barista/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // Add token handling if needed
      router.push('/barista/billing');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Barista Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
