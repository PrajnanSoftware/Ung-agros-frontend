import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Box, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {axiosInstance} from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category');
      const formattedCategories = response.data.data.map((category) => ({
        id: category._id,
        name: category.name,
        description: category.description,
        image: category.image || null,
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (uploadedImage) formData.append('image', uploadedImage);

    try {
      if (editingCategory) {
        await axiosInstance.put(`/category/${editingCategory.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Category updated successfully');
      } else {
        await axiosInstance.post('/category', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Category added successfully');
      }
      fetchCategories();
      reset();
      setShowForm(false);
      setUploadedImage(null);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/category/${id}`);
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
    setValue('name', category.name);
    setValue('description', category.description);
  };

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedImage(event.target.files[0]);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: 'id', headerName: 'Category ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
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
        onClick={() => { setShowForm(!showForm); setEditingCategory(null); reset(); }}
      >
        {showForm ? 'Close Form' : 'Add Category'}
      </Button>

      {showForm && (
        <Paper elevation={3} sx={{ padding: 3, marginY: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField {...register('name')} label="Name" variant="outlined" required fullWidth />
            <TextField {...register('description')} label="Description" variant="outlined" required fullWidth />
            <Typography variant="subtitle1">Upload Category Image</Typography>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploadedImage && (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Preview"
                width={70}
                height={70}
                style={{ borderRadius: '5px' }}
              />
            )}
            <Button type="submit" variant="contained" color="primary">
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
