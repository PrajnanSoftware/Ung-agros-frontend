import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import './UserManagement.scss';

export default function UserManagement() {
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);

  const onSubmit = (data) => {
    setUsers([...users, data]);
    reset();
  };

  return (
    <Box className="user-management" sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>User Management</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
          <TextField {...register('name')} label="User Name" variant="outlined" required />
          <TextField {...register('email')} label="Email" type="email" variant="outlined" required />
          <TextField {...register('phone')} label="Phone Number" variant="outlined" required />
          <TextField {...register('address')} label="Address" variant="outlined" required />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select {...register('role')} defaultValue="" required>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Support">Support</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select {...register('status')} defaultValue="Active" required>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" sx={{ gridColumn: 'span 2' }}>Add User</Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>User List</Typography>
        <List>
          {users.map((user, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={`${user.name} (${user.role})`}
                secondary={`Email: ${user.email}, Phone: ${user.phone}, Address: ${user.address}, Status: ${user.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}