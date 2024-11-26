import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../app/styles/Dashboard.module.css';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBaristas = async () => {
      try {
        const res = await fetch('/api/admin/get-baristas');
        if (!res.ok) throw new Error("Failed to fetch baristas");
        const data = await res.json();
        setBaristas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        alert('Error fetching baristas');
        setBaristas([]); // Set an empty array to avoid map issues
      }
    };
    fetchBaristas();
  }, []);
  

  // Handle creating or updating a barista
  const handleCreateOrEditBarista = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Determine the API endpoint and method based on whether we're editing
    const endpoint = editingBarista ? `/api/admin/edit-barista?id=${editingBarista.id}` : '/api/admin/create-barista';
    const method = editingBarista ? 'PUT' : 'POST';
    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      const updatedBarista = await res.json();
      if (editingBarista) {
        // Update the list with the edited barista
        setBaristas(baristas.map(b => (b.id === updatedBarista.id ? updatedBarista : b)));
      } else {
        // Add the new barista to the list
        setBaristas([...baristas, updatedBarista]);
      }
      setShowForm(false);
      setEditingBarista(null);
      setName('');
      setEmail('');
      setPassword('');
    } else {
      alert(`Failed to ${editingBarista ? 'update' : 'create'} barista`);
    }
  };

  // Handle deleting a barista
  const handleDeleteBarista = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const res = await fetch(`/api/admin/delete-barista?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBaristas(baristas.filter(barista => barista.id !== id)); // Remove from list on successful delete
      } else {
        alert('Failed to delete barista');
      }
    }
  };

  // Handle setting the form for editing a barista
  const handleEditBarista = (barista: Barista) => {
    setEditingBarista(barista);
    setName(barista.name);
    setEmail(barista.email);
    setPassword(''); // Reset password field for security
    setShowForm(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link href="/admin/dashboard" className={styles.sidebarLink}>Baristas</Link>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div className={styles.accountMenu}>
            
            <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
          </div>
        </div>

        {/* Baristas list */}
        <div className={styles.baristaList}>
          <h2>Existing Baristas</h2>
          <ul>
            {baristas.map((barista) => (
              <li key={barista.id} className={styles.baristaItem}>
                <span>{barista.name} ({barista.email})</span>
                <button onClick={() => handleDeleteBarista(barista.id)} className={styles.deleteButton}>Delete</button>
                <button onClick={() => handleEditBarista(barista)} className={styles.editButton}>Edit</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add/Edit Barista button */}
        <button onClick={() => { setShowForm(!showForm); setEditingBarista(null); }} className={styles.addButton}>
          {showForm ? 'Close Form' : 'Add Barista'}
        </button>

        {/* Form for adding or editing a barista */}
        {showForm && (
          <form onSubmit={handleCreateOrEditBarista} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              {editingBarista ? 'Update Barista' : 'Create Barista'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
