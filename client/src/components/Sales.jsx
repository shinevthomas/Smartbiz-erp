import React, { useState } from "react";
import "./Sales.css";

// --- SVG Icons ---
const SVGShoppingCart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const SVGSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SVGTrash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

function Sales() {
  const [products] = useState([
    { id: 1, name: "Basmati Rice 10kg", price: 520, stock: 45 },
    { id: 2, name: "Bluetooth Speaker", price: 1899, stock: 12 },
    { id: 3, name: "Cooking Oil 2L", price: 180, stock: 30 },
    { id: 4, name: "Cotton T-Shirt L", price: 399, stock: 6 },
    { id: 5, name: "Denim Jeans 32", price: 1299, stock: 18 },
    { id: 6, name: "Hand Soap 500ml", price: 89, stock: 50 },
    { id: 7, name: "LED Bulb 12W", price: 120, stock: 4 },
    { id: 8, name: "Non-stick Pan 24cm", price: 899, stock: 22 },
    { id: 9, name: "Notebook A5 200pg", price: 60, stock: 80 },
    { id: 10, name: "pen", price: 15, stock: 45 },
    { id: 11, name: "Stainless Bowl Set", price: 599, stock: 3 },
    { id: 12, name: "USB-C Cable 1m", price: 150, stock: 60 },
    { id: 13, name: "Wheat Flour 5kg", price: 240, stock: 8 }
  ]);

  const [cart, setCart] = useState([
    { id: 13, name: "Wheat Flour 5kg", price: 240, quantity: 2 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty! Add products to checkout.");
      return;
    }
    alert(`Checkout Successful! Total Paid: ₹${total}`);
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal - discount + gst;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pos-body-grid">
      {/* Product Catalog Grid */}
      <main className="products-catalog-section">
        <div className="pos-title-header">
          <h1>Sales / POS</h1>
          <p>Create a new sale by adding products to the cart</p>
        </div>

        <div className="product-search-input">
          <span className="header-search-icon">
            <SVGSearch />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="products-cards-grid">
          {filteredProducts.map((p) => {
            const inCart = cart.some((item) => item.id === p.id);
            return (
              <div
                key={p.id}
                className={`product-item-card ${inCart ? "active-selected" : ""}`}
                onClick={() => handleAddToCart(p)}
              >
                <div className="card-top-icon">
                  <SVGShoppingCart />
                </div>
                <div className="card-product-title">{p.name}</div>
                <div className="card-footer-info">
                  <span className="card-price-green">₹{p.price}</span>
                  <span className="card-stock-muted">{p.stock} left</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Cart & Checkout Panel */}
      <aside className="cart-checkout-panel">
        <div>
          <div className="cart-panel-header">
            <SVGShoppingCart /> Cart ({totalCartCount})
          </div>

          <div className="cart-items-scroll">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-unit-price">
                    ₹{item.price} × {item.quantity}
                  </div>
                </div>

                <div className="cart-quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="qty-btn trash"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <SVGTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary-box">
          <div className="summary-line">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-line">
            <span>Discount</span>
            <input
              type="number"
              className="discount-input"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>

          <div className="summary-line">
            <span>GST (18%)</span>
            <span>₹{gst}</span>
          </div>

          <div className="summary-line total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="checkout-emerald-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sales;