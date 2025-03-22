import { useState, useEffect } from 'react';
import { TextField, Box, Typography, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { axiosInstance } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true); // Skeleton loader state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const lowStockResponse = await axiosInstance.get('/dashboard/lowStcok');
        const response = await axiosInstance.get('/product/getall');
        setProducts(response.data.data);
        setLowStock(lowStockResponse.data);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setNewQuantity(product.quantity);
    setEditOpen(true);
  };

  const handleQuantityUpdate = async () => {
    if (!selectedProduct) return;
    try {
      await axiosInstance.put(`/product/${selectedProduct._id}`, { quantity: newQuantity });
      setProducts((prev) =>
        prev.map((item) => (item._id === selectedProduct._id ? { ...item, quantity: newQuantity } : item))
      );
      toast.success('Stock updated successfully!');
      setEditOpen(false);
    } catch (error) {
      toast.error('Failed to update stock');
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Product Name', width: 250 },
    { field: 'quantity', headerName: 'Stock Available', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditClick(params.row)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {/* Inventory Overview */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Inventory Health</Typography>
        <Typography variant="body1" color="text.secondary">Monitor stock levels and ensure optimal inventory management.</Typography>

        {/* Low Stock Items Section */}
        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
          <Paper elevation={3} sx={{ p: 3, height: 250, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>Low Stock Items</Typography>
            
            {loading ? (
              // Skeleton loader for low stock section
              <Box sx={{ maxHeight: 170, overflowY: 'hidden' }}>
                {[1, 2, 3, 4].map((index) => (
                  <Skeleton key={index} variant="rectangular" height={40} sx={{ borderRadius: 1, mb: 1 }} />
                ))}
              </Box>
            ) : lowStock.length > 0 ? (
              <Box sx={{
                maxHeight: 170,
                overflowY: 'auto',
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "4px" }
              }}>
                {lowStock.map((item) => (
                  <Paper key={item._id} elevation={2} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                    mb: 1,
                    borderRadius: 1,
                    flexWrap: 'wrap'
                  }}>
                    <Typography sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>{item.name}</Typography>
                    <Typography color="error" sx={{ whiteSpace: 'nowrap' }}>Qty: {item.quantity}</Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography sx={{ textAlign: 'center', color: 'green' }}>
                All stock levels are sufficient.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Paper>

      {/* Search Bar */}
      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon color="action" />
          }}
        />
      </Box>

      {/* Data Grid with Skeleton Loader */}
      <Box sx={{ height: 400, width: '100%' }}>
        {loading ? (
          // Skeleton loader for table
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        ) : (
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSizeOptions={[10, 20, 50, 100]}
            getRowId={(row) => row._id}
            localeText={{ noRowsLabel: 'No products available' }}
          />
        )}
      </Box>

      {/* Edit Quantity Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Quantity</DialogTitle>
        <DialogContent>
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleQuantityUpdate} color="primary" variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
