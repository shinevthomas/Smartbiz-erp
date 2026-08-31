import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (invoice) => {
  const doc = new jsPDF();

  // Company Header
  doc.setFontSize(24);
  doc.setTextColor(37, 99, 235);
  doc.text("SMARTBIZ ERP", 105, 18, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(100);

  doc.text(
    "Inventory & Billing Management System",
    105,
    26,
    { align: "center" }
  );

  doc.line(14, 32, 196, 32);

  // Company Details
  doc.setFontSize(11);
  doc.setTextColor(0);

  doc.text("Address : Mangalore, Karnataka", 14, 42);
  doc.text("Phone   : +91 9876543210", 14, 49);
  doc.text("Email   : smartbiz@gmail.com", 14, 56);

  // Invoice Details
  doc.text(`Invoice No : ${invoice.invoiceNumber}`, 140, 42);
  doc.text(
    `Date : ${new Date(invoice.createdAt).toLocaleDateString()}`,
    140,
    49
  );

  doc.line(14, 62, 196, 62);

  // Customer
  doc.setFontSize(13);

  doc.text("Bill To", 14, 72);

  doc.setFontSize(11);

  doc.text(invoice.customerName, 14, 80);

  // Product Table
  autoTable(doc, {
    startY: 90,

    head: [["Product", "Quantity", "Price", "Total"]],

    body: [
      [
        invoice.productName,
        invoice.quantity,
        `₹${invoice.price.toLocaleString("en-IN")}`,
        `₹${invoice.total.toLocaleString("en-IN")}`,
      ],
    ],

    theme: "grid",

    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  const y = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(13);

  doc.text(
    `Grand Total : ₹${invoice.total.toLocaleString("en-IN")}`,
    14,
    y
  );

  doc.text(
    `Payment Status : ${invoice.status}`,
    14,
    y + 10
  );

  // Signature
  doc.line(145, y + 30, 190, y + 30);

  doc.text("Authorized Signature", 145, y + 38);

  // Footer
  doc.setFontSize(11);

  doc.setTextColor(120);

  doc.text(
    "Thank you for choosing SmartBiz ERP!",
    105,
    285,
    { align: "center" }
  );

  doc.save(`${invoice.invoiceNumber}.pdf`);
};