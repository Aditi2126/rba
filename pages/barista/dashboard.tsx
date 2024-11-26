import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../app/styles/Dashboard.module.css";

// Define a type for a Barista object
interface Barista {
  id: number;
  name: string;
  email: string;
}

export default function Dashboard() {
  const [baristas, setBaristas] = useState<Barista[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBarista, setEditingBarista] = useState<Barista | null>(null); // Track if we're editing
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBaristas = async () => {
      try {
        const res = await fetch("/api/admin/get-baristas");
        if (!res.ok) throw new Error("Failed to fetch baristas");
        const data = await res.json();
        setBaristas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        alert("Error fetching baristas");
        setBaristas([]); // Set an empty array to avoid map issues
      }
    };
    fetchBaristas();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/barista/login");
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link href="/barista/dashboard" className={styles.sidebarLink}>
              Hello Barista
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>This is the Barista's Dashboard</h1>
          <div className={styles.accountMenu}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
