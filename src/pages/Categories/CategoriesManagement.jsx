import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Box, Typography, Paper, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { axiosInstance } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const formRef = useRef(null); // For scrolling to the form

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category');
      console.log("Fetch Categories Response:", response.data);
      const formattedCategories = response.data.data.map((category) => ({
        id: category._id,
        name: category.name,
        description: category.description,
        tax: category.tax,
        image: category.image || null,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to fetch categories');
    }
  };

  const onSubmit = async (data) => {
    if (uploading) {
      toast.warn("Please wait until the image upload completes.");
      return;
    }

    const categoryData = {
      name: data.name,
      description: data.description,
      tax: data.tax, 
      image: uploadedImage,
    };

    try {
      let response;
      if (editingCategory) {
        response = await axiosInstance.put(`/category/${editingCategory.id}`, categoryData);
        toast.success('Category updated successfully');
      } else {
        response = await axiosInstance.post('/category', categoryData);
        toast.success('Category added successfully');
      }
      console.log("Category Save Response:", response.data);

      fetchCategories();
      handleCloseForm();
    } catch (error) {
      console.error('Failed to save category:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/category/${id}`);
      console.log("Delete Response:", response.data);
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
    setValue('name', category.name);
    setValue('description', category.description);
    setValue('tax', category.tax); 
    setUploadedImage(category.image);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleImageUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      setUploading(true);
      setUploadedImage(URL.createObjectURL(file));

      try {
        const uploadedImageUrl = await uploadToCloudinary(file);
        if (uploadedImageUrl) {
          setUploadedImage(uploadedImageUrl);
          toast.success('Image uploaded successfully');
        } else {
          throw new Error('Invalid image URL received');
        }
      } catch (error) {
        console.error('Image upload failed:', error);
        setUploadedImage(null);
        toast.error('Failed to upload image, please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    toast.info('Image removed');
  };

  const handleCloseForm = () => {
    setShowForm(false);
    reset();
    setUploadedImage(null);
    setEditingCategory(null);
  };

  const handleToggleForm = () => {
    if (showForm) {
      // If the form is open, close it.
      handleCloseForm();
    } else {
      // If the form is closed, open it for adding a new category.
      setShowForm(true);
      setEditingCategory(null);
      reset();
      setUploadedImage(null);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: 'Category ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'tax', headerName: 'Tax (%)', width: 120 },
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      renderCell: (params) =>
        params.row.image ? <img src={params.row.image} alt="Category" width={50} height={50} /> : 'No Image'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <TextField
        label="Search Category"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={showForm ? <CloseIcon /> : <AddIcon />}
        onClick={handleToggleForm}
      >
        {showForm ? 'Close Form' : 'Add Category'}
      </Button>

      {showForm && (
        <Paper ref={formRef} elevation={3} sx={{ padding: 3, marginY: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </Typography>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField {...register('name')} label="Name" variant="outlined" required fullWidth />
            <TextField {...register('description')} label="Description" variant="outlined" required fullWidth />
            <TextField {...register('tax')} label="Tax (%)" variant="outlined" required fullWidth type="number" />

            <Typography variant="subtitle1">Upload Category Image</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploading && <CircularProgress size={24} />}
            </Box>

            {uploadedImage && !uploading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 1 }}>
                <img src={uploadedImage} alt="Uploaded" width={70} height={70} style={{ borderRadius: '5px', objectFit: 'cover' }} />
                <IconButton color="error" onClick={handleRemoveImage}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}

            <Button type="submit" variant="contained" color="primary" disabled={uploading}>
              {editingCategory ? 'Update' : 'Submit'}
            </Button>
          </form>
        </Paper>
      )}

      <Typography variant="h6" sx={{ marginBottom: 2, marginTop: 1, color: "blue" }}>
        Category List
      </Typography>
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid rows={filteredCategories} columns={columns} pageSizeOptions={[10, 20]} />
      </Box>
    </Box>
  );
}
