import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Electronics', 'Monitors', 'Furniture', 'Accessories', 'Office Supplies'];

const AddEditItemModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    reorderPoint: '',
    barcode: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Auto-generate SKU for new items
      const autoSKU = `SKU-${Math.floor(1000 + Math.random() * 9000)}`;
      const autoBarcode = `890${Math.floor(100000000 + Math.random() * 900000000)}`;
      setFormData({
        id: autoSKU,
        name: '',
        category: 'Electronics',
        price: '',
        stock: '',
        reorderPoint: '10',
        barcode: autoBarcode,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (formData.stock === '' || Number(formData.stock) < 0) newErrors.stock = 'Valid stock count is required';
    if (!formData.reorderPoint || Number(formData.reorderPoint) < 0) newErrors.reorderPoint = 'Valid reorder point required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      reorderPoint: parseInt(formData.reorderPoint, 10),
    });
    onClose();
  };

  return (
    <div className="erp-modal-overlay">
      <div className="erp-modal-card">
        <div className="erp-modal-header">
          <h3>{initialData ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="erp-modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="erp-modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>SKU Code</label>
              <input type="text" name="id" value={formData.id} readOnly className="input-disabled" />
            </div>
            <div className="form-group">
              <label>Barcode</label>
              <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Product Name <span className="req">*</span></label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Wireless Ergonomic Mouse"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Unit Price ($) <span className="req">*</span></label>
              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'input-error' : ''}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Initial Stock Count <span className="req">*</span></label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                value={formData.stock}
                onChange={handleChange}
                className={errors.stock ? 'input-error' : ''}
              />
              {errors.stock && <span className="error-text">{errors.stock}</span>}
            </div>
            <div className="form-group">
              <label>Reorder Point Alert <span className="req">*</span></label>
              <input
                type="number"
                name="reorderPoint"
                placeholder="10"
                value={formData.reorderPoint}
                onChange={handleChange}
                className={errors.reorderPoint ? 'input-error' : ''}
              />
              {errors.reorderPoint && <span className="error-text">{errors.reorderPoint}</span>}
            </div>
          </div>

          <div className="erp-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditItemModal;