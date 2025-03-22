import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Print, PictureAsPdf } from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {axiosInstance} from '../../utils/axiosInstance';
import './OrderManagement.scss';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/order/all-order');
        const formattedOrders = response.data.orders.map((order, index) => ({
          _id: order._id || `order-${index}`,
          customerName: order.shippingAddress?.fullName || "Unknown",
          customerPhone: order.shippingAddress?.phoneNumber || "N/A",
          customerAddress: order.shippingAddress
            ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`
            : "No Address",
          status: order.orderStatus || "Pending",
          amount: order.billDetails?.total || 0,
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
        })).sort((a, b) => (b.date > a.date ? 1 : -1));
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const renderStatusDropdown = (params) => {
    const order = params.row;
    const currentStatus = order.status;

    let availableStatuses = [];
    if (currentStatus === "Pending") availableStatuses = ["Processing", "Cancelled"];
    else if (currentStatus === "Processing") availableStatuses = ["Shipped", "Cancelled"];
    else if (currentStatus === "Shipped") availableStatuses = ["Delivered"];
    
    return (
      <select
        value={currentStatus}
        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
        disabled={availableStatuses.length === 0}
      >
        <option value={currentStatus}>{currentStatus}</option>
        {availableStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    );
  };
  // Update Order Status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/order/${id}`, { orderStatus: newStatus });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Ung Agros", 20, 15);
    autoTable(doc, {
      startY: 50,
      head: [["Field", "Details"]],
      body: [
        ["Order ID", order._id],
        ["Customer Name", order.customerName],
        ["Phone", order.customerPhone],
        ["Address", order.customerAddress],
        ["Order Date", order.date],
        ["Total Amount", `₹${order.amount}`]
      ],
      theme: "grid",
    });
    doc.save(`Invoice_${order._id}.pdf`);
  };

  const handlePrintInvoice = (order) => {
    const invoiceHtml = `
      <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .invoice-container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; }
          .invoice-header { text-align: center; margin-bottom: 20px; }
          .invoice-details { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .invoice-details th, .invoice-details td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <h2>Ung Agros</h2>
            <p>Email: support@ungagros.com | Phone: +91 9986636773</p>
            <hr/>
            <h3>INVOICE</h3>
          </div>
          <table class="invoice-details">
            <tr><th>Order ID</th><td>${order._id}</td></tr>
            <tr><th>Customer Name</th><td>${order.customerName}</td></tr>
            <tr><th>Phone</th><td>${order.customerPhone}</td></tr>
            <tr><th>Address</th><td>${order.customerAddress}</td></tr>
            <tr><th>Order Date</th><td>${order.date}</td></tr>
            <tr><th>Total Amount</th><td>₹${order.amount}</td></tr>
          </table>
          <p class="footer">Thank you for your purchase!</p>
        </div>
      </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(invoiceHtml);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const columns = [
    { field: 'date', headerName: 'Date', width: 120 },
    { field: '_id', headerName: 'Order ID', width: 180 },
    { field: 'customerName', headerName: 'Customer Name', width: 180 },
    { field: 'customerPhone', headerName: 'Customer Phone', width: 150 },
    { field: 'customerAddress', headerName: 'Customer Address', width: 250 },
    { field: "status", headerName: "Status", width: 150, renderCell: renderStatusDropdown },
    { field: 'amount', headerName: 'Amount (₹)', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleDownloadInvoice(params.row)}>
            <PictureAsPdf />
          </IconButton>
          <IconButton color="secondary" onClick={() => handlePrintInvoice(params.row)}>
            <Print />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="order-management" style={{ width: '100%', padding: '20px' }}>
      <h2 className="title">Order Management</h2>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        getRowId={(row) => row._id}
        localeText={{ noRowsLabel: 'No orders available' }}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold', color: '#1abc9c' },
          '& .MuiDataGrid-root': { backgroundColor: '#fff', color: '#2c3e50' },
          '& .MuiDataGrid-cell:hover': { color: '#16a085' },
        }}
      />
    </div>
  );
}
