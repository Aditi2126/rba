import { useState } from 'react';
import { menuItems } from '../../lib/menuData';
import styles from '../../app/styles/BillingPage.module.css';
import { MenuItem } from '../../lib/types';

export default function BillingPage() {
  const [order, setOrder] = useState<MenuItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [billNumber, setBillNumber] = useState(1);

  const addToOrder = (item: MenuItem) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((o) => o.id === item.id);
      if (existingItem) {
        return prevOrder.map((o) =>
          o.id === item.id ? { ...o, quantity: (o.quantity || 0) + 1 } : o
        );
      } else {
        return [...prevOrder, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setOrder((prevOrder) =>
      prevOrder.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 0) } : item
      )
    );
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * (item.quantity || 0), 0).toFixed(2);
  };

  const handlePrint = () => {
    setBillNumber(billNumber + 1);
    window.print();
  };

  return (
    <div className={styles.billingContainer}>
      <h1> Cafe Inertia Menu</h1>

      <div className={styles.menuSection}>
        {Object.keys(menuItems).map((category) => {
          const menuCategory = category as keyof typeof menuItems; // Type assertion

          return (
            <div key={menuCategory}>
              <h3 className={styles.category}>{menuCategory}</h3>
              <div className={styles.menuGrid}>
                {menuItems[menuCategory].map((item) => (
                  <div key={item.id} className={styles.menuItem}>
                    <span>{item.name} - ₹{item.price}</span>
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, (order.find(o => o.id === item.id)?.quantity || 0) - 1)}>-</button>
                      <span className={styles.quantityDisplay}>{order.find((o) => o.id === item.id)?.quantity || 0}</span>
                      <button onClick={() => updateQuantity(item.id, (order.find(o => o.id === item.id)?.quantity || 0) + 1)}>+</button>
                      <button onClick={() => addToOrder(item)} className={styles.addButton}>Add</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Details Section */}
      <div className={styles.customerDetails}>
        <h2>Customer Details</h2>
        <div className={styles.customerInput}>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            maxLength={10}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))} // Ensures only numbers
          />
        </div>
      </div>

      <div id="print-area" className={styles.selectedItems}>
        <h2>Cafe Inertia</h2>
        <p>Bill No: IN-{billNumber}</p>
        <p>Customer Name: {customerName}</p>
        <p>Phone Number: {phoneNumber}</p>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.filter(item => item.quantity! > 0).map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{(item.price * (item.quantity || 0)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total: ₹{calculateTotal()}</h3>
        <p>Thank you for visiting Cafe Inertia!</p>
      </div>

      <button onClick={handlePrint} className={styles.printButton}>Print Bill</button>
    </div>
  );
}
