import { useState, useEffect } from 'react';
import { TextField, Box, Typography, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import {axiosInstance} from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const lowStockResponse = await axiosInstance.get('/dashboard/lowStcok');
        const response = await axiosInstance.get('/product/getall');
        setProducts(response.data.data);
        setLowStock(lowStockResponse.data);
      } catch (error) {
        toast.error('Failed to fetch products');
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
    { field: 'name', headerName: 'Product Name', width: 200 },
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
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Inventory Health</Typography>
        <Typography sx={{ marginBottom: 2 }}>Monitor stock levels and ensure optimal inventory management.</Typography>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Low Stock Items</Typography>
            {lowStock && lowStock.length > 0 ? (
              <Box sx={{ maxHeight: 130, overflowY: 'auto' }}>
                {lowStock.map((item) => (
                  <Paper
                    key={item._id}
                    elevation={2}
                    sx={{ display: 'flex', justifyContent: 'space-between', p: 2, mb: 1 }}
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                    <Typography color="error">Qty: {item.quantity}</Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography sx={{ textAlign: 'center', color: 'green' }}>All stock levels are sufficient.</Typography>
            )}
          </Paper>
        </Grid>
      </Paper>

      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />
          }}
        />
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          pageSizeOptions={[10, 20, 50, 100]}
          getRowId={(row) => row._id}
          localeText={{ noRowsLabel: 'No products available' }}
        />
      </Box>

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
