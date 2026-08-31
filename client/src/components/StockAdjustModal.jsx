import React, { useState, useEffect } from 'react';

const ADJUST_REASONS = ['Restock / Purchase Order', 'Damage / Expiry', 'Physical Audit Correction', 'Return to Supplier', 'Internal Usage'];

const StockAdjustModal = ({ isOpen, onClose, onConfirm, selectedItem }) => {
  const [adjustType, setAdjustType] = useState('add');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState(ADJUST_REASONS[0]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setQuantity('');
    setNotes('');
    setError('');
    setAdjustType('add');
  }, [isOpen]);

  if (!isOpen || !selectedItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyNum = parseInt(quantity, 10);

    if (!quantity || isNaN(qtyNum) || qtyNum <= 0) {
      setError('Please enter a valid quantity greater than 0');
      return;
    }

    if (adjustType === 'subtract' && qtyNum > selectedItem.stock) {
      setError(`Cannot subtract more than current available stock (${selectedItem.stock})`);
      return;
    }

    const delta = adjustType === 'add' ? qtyNum : -qtyNum;
    onConfirm(selectedItem.id, delta, reason, notes);
    onClose();
  };

  const calculatedNewStock =
    adjustType === 'add'
      ? selectedItem.stock + (parseInt(quantity, 10) || 0)
      : selectedItem.stock - (parseInt(quantity, 10) || 0);

  return (
    <div className="erp-modal-overlay">
      <div className="erp-modal-card modal-sm">
        <div className="erp-modal-header">
          <h3>Adjust Stock Level</h3>
          <button className="erp-modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="erp-modal-body">
          <div className="selected-item-preview">
            <span className="preview-title">{selectedItem.name}</span>
            <span className="preview-sub">SKU: {selectedItem.id} | Current Stock: <strong>{selectedItem.stock}</strong></span>
          </div>

          <div className="adjust-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${adjustType === 'add' ? 'active-add' : ''}`}
              onClick={() => setAdjustType('add')}
            >
              + Add Stock
            </button>
            <button
              type="button"
              className={`toggle-btn ${adjustType === 'subtract' ? 'active-subtract' : ''}`}
              onClick={() => setAdjustType('subtract')}
            >
              - Reduce Stock
            </button>
          </div>

          <div className="form-group">
            <label>Adjustment Quantity <span className="req">*</span></label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 15"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError('');
              }}
            />
            {error && <span className="error-text">{error}</span>}
          </div>

          <div className="form-group">
            <label>Reason Code</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {ADJUST_REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Audit Note (Optional)</label>
            <input
              type="text"
              placeholder="Reference PO # or audit log details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="stock-projection-banner">
            <span>New Projected Stock:</span>
            <strong className={calculatedNewStock < 0 ? 'text-danger' : 'text-success'}>
              {isNaN(calculatedNewStock) ? selectedItem.stock : calculatedNewStock} units
            </strong>
          </div>

          <div className="erp-modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Apply Adjustment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustModal;