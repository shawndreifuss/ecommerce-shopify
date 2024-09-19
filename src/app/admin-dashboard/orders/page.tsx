'use client'

import { useState } from 'react';

// Mock orders data
const ordersData = [
    
        {
          "id": "order_1",
          "user": {
            "name": "Liam Johnson",
            "email": "liam@example.com"
          },
          "products": [
            { "name": "Glimmer Lamps", "quantity": 2, "price": 250.00 },
            { "name": "Aqua Filters", "quantity": 1, "price": 49.00 }
          ],
          "totalAmount": 299.00,
          "shipping": {
            "address": "1234 Main St., Anytown, CA 12345",
            "status": "Fulfilled"
          },
          "payment": {
            "method": "Visa",
            "cardLastFour": "4532",
            "status": "Paid"
          },
          "supplierName": "Acme Supplies",  // Add the supplier name here
          "status": "Fulfilled",
          "createdAt": "2023-06-23T14:34:00Z",
          "updatedAt": "2023-06-24T16:00:00Z"
        },
        {
          "id": "order_2",
          "user": {
            "name": "Olivia Smith",
            "email": "olivia@example.com"
          },
          "products": [
            { "name": "Aqua Filters", "quantity": 1, "price": 150.00 }
          ],
          "totalAmount": 150.00,
          "shipping": {
            "address": "5678 River Rd., Someplace, TX 78901",
            "status": "Declined"
          },
          "payment": {
            "method": "Mastercard",
            "cardLastFour": "1234",
            "status": "Declined"
          },
          "supplierName": "Best Supplies",
          "status": "Declined",
          "createdAt": "2023-06-24T11:15:00Z",
          "updatedAt": "2023-06-24T12:30:00Z"
        },
        {
          "id": "order_3",
          "user": {
            "name": "Emma Brown",
            "email": "emma@example.com"
          },
          "products": [
            { "name": "Solar Panel", "quantity": 1, "price": 450.00 }
          ],
          "totalAmount": 450.00,
          "shipping": {
            "address": "9876 Ocean Ave., Seaside, FL 32459",
            "status": "Fulfilled"
          },
          "payment": {
            "method": "Visa",
            "cardLastFour": "9876",
            "status": "Paid"
          },
          "supplierName": "Green Energy Supplies",
          "status": "Fulfilled",
          "createdAt": "2023-06-26T09:45:00Z",
          "updatedAt": "2023-06-27T10:00:00Z"
        }
      
      
];

export default function InsertOrders() {
  const [message, setMessage] = useState('');

  const insertOrders = async () => {
    setMessage(''); // Reset the message before sending the request

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordersData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Orders inserted successfully');
      } else {
        setMessage(`Error: ${data.error || 'Failed to insert orders'}`);
      }
    } catch (error) {
      setMessage('Error: An error occurred while inserting orders');
    }
  };

  return (
    <div>
      <h1>Insert Orders</h1>
      <button onClick={insertOrders}>Insert Orders</button>
      {message && <p>{message}</p>}
    </div>
  );
}
