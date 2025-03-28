import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Print, PictureAsPdf } from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {axiosInstance} from '../../utils/axiosInstance';
import './OrderManagement.scss';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [refundId, setRefundId] = useState("");


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
          
          // ✅ Ensure Invoice Data is Included:
          billDetails: order.billDetails || {},  
          paymentInfo: order.paymentInfo || {},  
          shippingAddress: order.shippingAddress || {},  
          items: order.items || [],  
          orderStatus: order.orderStatus || "Pending",  
          paymentStatus: order.paymentStatus || "N/A",  
        })).sort((a, b) => (b.date > a.date ? 1 : -1));
  
        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleRowClick = (params, event) => {
    // Prevent row click if clicking on status or actions field
    if (params.field === "status" || params.field === "actions" || event.target.closest(".status-dropdown")) {
      event.stopPropagation();
      return;
    }
  
    // Open modal for other fields
    setSelectedOrder(params.row);
    setOpenModal(true);
  };
  
  

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
      let refundId = null;
  
      if (newStatus === "Cancelled") {
        refundId = prompt("Enter Refund ID:");
        if (!refundId) {
          alert("Refund ID is required!");
          return;
        }
      }
  
      const updateData = newStatus === "Cancelled" 
        ? { refundId } 
        : { orderStatus: newStatus };
  
      await axiosInstance.put(`/order/${newStatus === "Cancelled" ? `cancel/${id}` : id}`, updateData);
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  const fetchProductDetails = async (productId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/product/findById/${productId}`);
      
      console.log("Fetched Product Data:", response.data); // Debugging log
  
      if (response.data && response.data.data) {
        setSelectedProduct(response.data.data); // Ensure correct assignment
      } else {
        setSelectedProduct(null);
      }
  
      setOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // const handleDownloadInvoice = (order) => {
  //   if (!order || !order.billDetails) {
  //     console.error("Order data is missing or undefined:", order);
  //     alert("Error: Order details are not available!");
  //     return;
  //   }
  
  //   const { invoiceNumber, subTotal, totalTax, total } = order.billDetails;
  //   const { razorpayPaymentId } = order.paymentInfo || {};
  //   const { fullName, street, city, state, zipCode, phoneNumber } = order.shippingAddress || {};
  
  //   const doc = new jsPDF();
  //   doc.setFontSize(18);
  //   doc.text("Ung Agros", 20, 15);
  
  //   // Invoice Details
  //   doc.setFontSize(12);
  //   doc.text(`Invoice Number: ${invoiceNumber || "N/A"}`, 20, 30);
  //   doc.text(`Invoice Date: ${order.date}`, 20, 40);
  //   doc.text(`Payment ID: ${razorpayPaymentId || "N/A"}`, 20, 50);
  //   doc.text(`Payment Status: ${order.paymentStatus || "N/A"}`, 20, 70);
  
  //   // Shipping Details
  //   autoTable(doc, {
  //     startY: 80,
  //     head: [["Shipping Address"]],
  //     body: [[
  //       `${fullName || "N/A"}\n${street || "N/A"}, ${city || "N/A"}, ${state || "N/A"}, ${zipCode || "N/A"}\nPhone: ${phoneNumber || "N/A"}`
  //     ]],
  //     theme: "grid",
  //   });
  
  //   // Items Table
  //   autoTable(doc, {
  //     startY: doc.autoTable.previous.finalY + 10,
  //     head: [["Product", "Qty", "Price", "Tax", "Total"]],
  //     body: order.items?.map((item) => [
  //       item.product || "N/A",
  //       item.quantity || 0,
  //       `₹${item.price || 0}`,
  //       `₹${item.tax || 0}`,
  //       `₹${item.totalProductPrice || 0}`
  //     ]) || [],
  //     theme: "striped",
  //   });
  
  //   // Total Price Details
  //   autoTable(doc, {
  //     startY: doc.autoTable.previous.finalY + 10,
  //     head: [["Subtotal", "Total Tax", "Grand Total"]],
  //     body: [[
  //       `₹${subTotal || 0}`,
  //       `₹${totalTax || 0}`,
  //       `₹${total || 0}`
  //     ]],
  //     theme: "grid",
  //   });
  
  //   doc.save(`Invoice_${invoiceNumber || "N/A"}.pdf`);
  // };
  

const handlePrintInvoice = (order) => {
  const invoiceHtml = `
    <html>
    <head>
      <title>${order.billDetails.invoiceNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .invoice-container { max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ccc; }
        .invoice-header { text-align: center; margin-bottom: 20px; }
        .invoice-header h2 { margin-bottom: 5px; }
        .invoice-header hr { border: 1px solid #ccc; }
        
        .invoice-info { text-align: left; margin-top: 10px; }
        .invoice-info p { margin: 5px 0; }
        
        .invoice-details, .invoice-items { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .invoice-details th, .invoice-items th, .invoice-items td { border: 1px solid #ccc; padding: 10px; text-align: left; }
        .total-section { font-weight: bold; }
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

        <!-- Left Aligned Invoice Information -->
        <div class="invoice-info">
          <p><strong>Invoice Number:</strong> ${order.billDetails.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> ${order.date}</p>
          <p><strong>Payment ID:</strong> ${order.paymentInfo.razorpayPaymentId}</p>
          <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
        </div>

        <table class="invoice-details">
          <tr><th>Shipping Address</th></tr>
          <tr>
            <td>
              ${order.shippingAddress.fullName}<br/>
              ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zipCode}<br/>
              Phone: ${order.shippingAddress.phoneNumber}
            </td>
          </tr>
        </table>

        <h4>Item Details:</h4>
        <table class="invoice-items">
          <tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          ${order.items
            .map(
              (item) => `
            <tr>
              <td>${item.product}</td>
              <td>${item.quantity}</td>
              <td>₹${item.price}</td>
              <td>₹${item.totalProductPrice}</td>
            </tr>`
            )
            .join("")}
        </table>

        <h4>Total Summary:</h4>
        <table class="invoice-items">
          <tr><th>Subtotal</th><th>Total Tax</th><th>Grand Total</th></tr>
          <tr class="total-section">
            <td>₹${order.billDetails.subTotal}</td>
            <td>₹${order.billDetails.totalTax}</td>
            <td>₹${order.billDetails.total}</td>
          </tr>
        </table>

        <p class="footer">Thank you for your purchase! For any queries, contact support@ungagros.com.</p>
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
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
    { field: "status", headerName: "Status", width: 150,  renderCell: (params) => (
    <div className="status-dropdown">
      {renderStatusDropdown(params)}
    </div>
  ), },
    { field: 'amount', headerName: 'Amount (₹)', width: 120 },
    {
      field: 'actions',
      headerName: 'Invoice',
      width: 150,
      renderCell: (params) => (
        <div>
          {/* <IconButton color="primary" onClick={(event) => {
        event.stopPropagation(); // Prevents row click event from interfering
        handleDownloadInvoice(params.row);
      }}>
            <PictureAsPdf />
          </IconButton> */}
          <IconButton color="secondary" onClick={(event) => {
        event.stopPropagation();
        handlePrintInvoice(params.row);
      }}>
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
        onRowClick={handleRowClick} 
      />
    {/* Order Details Modal */}
<Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
  <DialogTitle>Order Details</DialogTitle>
  <DialogContent>
    {selectedOrder && (
      <>
        <p>
          <strong>Order ID:</strong> {selectedOrder._id}
        </p>
        <p>
          <strong>Order Status:</strong> {selectedOrder.orderStatus}
        </p>
        <p>
          <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
        </p>
        <p>
          <strong>Invoice Number:</strong> {selectedOrder.billDetails?.invoiceNumber}
        </p>
        <p>
          <strong>Customer Name:</strong> {selectedOrder.customerName}
        </p>
        <p>
          <strong>Address:</strong> {selectedOrder.customerAddress}
        </p>
        <p>
          <strong>Razorpay Payment ID:</strong> {selectedOrder.paymentInfo?.razorpayPaymentId}
        </p>

        <h3>Ordered Products</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder.items?.map((item, index) => (
  <TableRow key={index} onClick={() => fetchProductDetails(item.product._id)} style={{ cursor: "pointer" }}>
    <TableCell>{item.product.name}</TableCell>
    <TableCell>{item.quantity}</TableCell>
    <TableCell>₹{item.price}</TableCell>
    <TableCell>₹{item.totalProductPrice}</TableCell>
  </TableRow>
))}
{/* Loader for Product Fetching */}
{loadingProduct && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress />
            <p>Loading product details...</p>
          </div>
        )}
{/* Bill Details Section */}
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>Subtotal:</strong></TableCell>
                <TableCell>₹{selectedOrder.billDetails?.subTotal ?? "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Total Tax:</strong></TableCell>
                <TableCell>₹{selectedOrder.billDetails?.totalTax ?? "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Total Amount:</strong></TableCell>
                <TableCell><strong>₹{selectedOrder.billDetails?.total ?? "N/A"}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenModal(false)} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>

<Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        Product Details
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
  {loading ? (
    <CircularProgress />
  ) : selectedProduct ? (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {/* Image Section */}
      <div style={{ flex: "1", textAlign: "center" }}>
        <img
          src={selectedProduct.image?.[0] || "https://via.placeholder.com/150"}
          alt={selectedProduct.name || "No Image Available"}
          style={{
            width: "100%",
            maxWidth: "250px",
            maxHeight: "250px",
            objectFit: "contain",
            borderRadius: "10px",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        />
      </div>

      {/* Details Section */}
      <div style={{ flex: "2" }}>
      <p>
          <strong>Product ID:</strong> {selectedProduct._id ?? "N/A"}
        </p>
        <h3 style={{ marginBottom: "10px" }}><strong>Product Name: </strong>{selectedProduct.name || "No Name Available"}</h3>
        <p>
          <strong>Price:</strong> ₹{selectedProduct.price ?? "N/A"}
        </p>
        <p>
          <strong>Selling Price:</strong> ₹{selectedProduct.sellingPrice ?? "N/A"}
        </p>
        
      </div>
    </div>
  ) : (
    <p>No product details available.</p>
  )}
</DialogContent>

    </Dialog>

    </div>
  );
}
