import { useState } from 'react';
import { menuItems } from '../../../lib/menuData';
import { MenuItem } from '../../../lib/types';

export default function BillingPage() {
  const [order, setOrder] = useState<MenuItem[]>([]);

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
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price * (item.quantity || 0), 0).toFixed(2);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h1>Billing Page</h1>
      
      {/* Menu Section */}
      <div>
        {(Object.keys(menuItems) as Array<keyof typeof menuItems>).map((category) => (
          <div key={category}>
            <h2>{category.replace(/([A-Z])/g, ' $1').trim()}</h2>
            {menuItems[category].map((item) => (
              <div key={item.id}>
                <span>{item.name} - ₹{item.price}</span>
                <button onClick={() => addToOrder(item)}>Add</button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div>
        <h2>Order Summary</h2>
        {order.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <input
              type="number"
              value={item.quantity || 1}
              min="1"
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            />
            <span> = ₹{(item.price * (item.quantity || 0)).toFixed(2)}</span>
          </div>
        ))}
        <h3>Total: ₹{calculateTotal()}</h3>
        <button onClick={handlePrint}>Print Bill</button>
      </div>
    </div>
  );
}
