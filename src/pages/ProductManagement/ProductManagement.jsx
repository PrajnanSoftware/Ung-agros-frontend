import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Box, Typography, Paper, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {axiosInstance} from '../../utils/axiosInstance';
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import './ProductManagement.scss';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const formRef = useRef(null);
  // const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      uploadedImages.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [uploadedImages]);


  const resetForm = () => {
    reset({
      name: '',
      description: '',
      mrp: '',
      sellingPrice: '',
      stock: '',
    });
    setEditProductId(null);
    setSelectedCategory('');
    setImageUrls([]);
    setUploadedImages([]);
    setShowForm(false);
  };
  
  

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;
  
    setUploading(true);
    let successfulUploads = [];
  
    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          try {
            const url = await uploadToCloudinary(file);
            if (!url) throw new Error("Invalid URL received");
            successfulUploads.push(url); // Only store successful uploads
            return url;
          } catch (err) {
            console.error("Image upload failed for:", file.name, err);
            toast.error(`Failed to upload ${file.name}`);
            return null; // Ensure failed uploads are not added
          }
        })
      );
  
      // Filter out null values (failed uploads)
      const validUrls = uploadedUrls.filter((url) => url !== null);
      setImageUrls((prevUrls) => [...prevUrls, ...validUrls]);
  
      if (validUrls.length > 0) {
        toast.success("Image(s) uploaded successfully");
      }
  
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };
  

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/product/getAll");
      const formattedProducts = response.data.data.map((product) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        mrp: product.price,
        sellingPrice: product.sellingPrice,
        stock: product.quantity,
        category: product.category?.name || "Unknown",
        image: product.image || [],
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    }
  };

  const onSubmit = async (data) => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }
  
    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
  
    try {
      setLoading(true);
  
      const productData = {
        name: data.name,
        description: data.description,
        price: data.mrp,
        sellingPrice: data.sellingPrice,
        quantity: data.stock,
        category: selectedCategory,
        image: imageUrls, // Cloudinary uploaded images
      };
  
      if (editProductId) {
        await axiosInstance.put(`/product/${editProductId}`, productData);
        toast.success("Product updated successfully");
      } else {
        await axiosInstance.post("/product", productData);
        toast.success("Product added successfully");
      }
  
      setShowForm(false);
      setEditProductId(null);
      resetForm();
      fetchProducts();
      setImageUrls([]);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = (product) => {
    setEditProductId(product.id);
  
    // Find the category ID from the list of categories
    const categoryId = categories.find((cat) => cat.name === product.category)?._id || product.category;
    setSelectedCategory(categoryId);
  
    // Reset form fields with product data
    reset({
      name: product.name,
      description: product.description,
      mrp: product.mrp,
      sellingPrice: product.sellingPrice,
      stock: product.stock,
    });
  
    setImageUrls(product.image || []);
    setShowForm(true);
    // Ensure state updates before scrolling
  setTimeout(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300); 
  };
  
  
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "Product ID", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "mrp", headerName: "MRP ($)", width: 120 },
    { field: "sellingPrice", headerName: "Selling Price ($)", width: 150 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "image",
      headerName: "Images",
      width: 400,
      renderCell: (params) => (
        <Box display="flex" gap={1} flexWrap="wrap">
          {Array.isArray(params.row.image) && params.row.image.length > 0 ? (
            params.row.image.slice(0, 6).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`product-image-${index}`}
                style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "5px" }}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No images
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleToggleForm = () => {
    if (showForm) {
      resetForm();
    } else {
      setShowForm(true);
      reset(); // Ensure the form is cleared when opening
      setEditProductId(null);
      setSelectedCategory('');
      setImageUrls([]);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  return (
    <Box className="product-management" sx={{ padding: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Button
  variant="contained"
  color="primary"
  sx={{ marginBottom: 2 }}
  startIcon={showForm ? <CloseIcon /> : <AddIcon />}
  onClick={handleToggleForm}
>
  {showForm ? "Close Form" : "Add Product"}
</Button>

      {showForm && (
        <Paper elevation={3} sx={{ padding: 3, marginY: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {editProductId ? 'Edit Product' : 'Add New Product'}
          </Typography>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField {...register('name')} label="Name" variant="outlined" required fullWidth />
            <TextField {...register('description')} label="Description" multiline rows={5} required fullWidth />
            <TextField {...register('mrp')} label="MRP" type="number" variant="outlined" required fullWidth />
            <TextField {...register('sellingPrice')} label="Selling Price" type="number" variant="outlined" required fullWidth />
            <TextField {...register('stock')} label="Stock" type="number" variant="outlined" required fullWidth />

            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Select Category"
                required
              >
               {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="subtitle1">Upload Product Images (First image will be the main image)</Typography>

{/* File Input */}
<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => handleImageUpload(e.target.files)}
  disabled={uploading} // Disable input while uploading
/>

{/* Show loading indicator */}
{uploading && <Typography color="primary">Uploading images...</Typography>}

{/* Display Uploaded Images */}
<Box display="flex" gap={1} flexWrap="wrap">
  {imageUrls.map((url, index) => (
    <Box key={index} position="relative">
      <img
        src={url}
        alt={`Uploaded ${index + 1}`}
        style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '5px' }}
      />
      <IconButton color="error" size="small" onClick={() => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
      }}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  ))}


  {/* Show newly uploaded images (Files converted to URLs) */}
  {uploadedImages.map((image, index) => (
    <Box key={index} position="relative">
      <img
        src={URL.createObjectURL(image)}
        alt={`Uploaded ${index + 1}`}
        style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: '5px' }}
      />
      <IconButton color="error" size="small" onClick={() => {
        setUploadedImages(uploadedImages.filter((_, i) => i !== index));
      }}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  ))}
</Box>

<Button type="submit" variant="contained" color="primary" disabled={loading || uploading || imageUrls.length === 0}>
  {loading ? 'Submitting...' : editProductId ? 'Update Product' : 'Submit'}
</Button>

          </form>
        </Paper>
      )}

      <TextField
        label="Search Products"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Typography variant="h6" sx={{ marginBottom: 2, marginTop: 1, color: "blue" }}>Product List</Typography>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid rows={filteredProducts} columns={columns} pageSizeOptions={[10, 20]} />
      </Box>
    </Box>
  );
}
