import React, { createContext, useContext, useState } from 'react';

const ERPContext = createContext();

export const ERPProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Keyboard', sku: 'KB-1001', price: 49.99, stock: 4, status: 'Low Stock' },
    { id: 2, name: 'USB-C Hub', sku: 'HB-2002', price: 39.99, stock: 7, status: 'In Stock' }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Corporation', email: 'acme@example.com', phone: '+1 555-0101', totalPurchases: 12450, status: 'Active' }
  ]);

  const [invoices, setInvoices] = useState([
    { id: 'INV-1001', customer: 'Acme Corporation', date: 'Aug 27, 2026', amount: 4250.00, status: 'Paid' }
  ]);

  // Handlers to modify data
  const addProduct = (newProduct) => setProducts([...products, { ...newProduct, id: Date.now() }]);
  const updateStock = (id, amount) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock - amount } : p));
  };

  return (
    <ERPContext.Provider value={{ products, customers, invoices, addProduct, updateStock }}>
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => useContext(ERPContext);