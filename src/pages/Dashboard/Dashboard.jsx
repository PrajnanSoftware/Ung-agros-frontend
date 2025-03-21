import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Paper, CardContent, IconButton, CircularProgress
} from '@mui/material';
import {
  ShoppingCart, AttachMoney, PeopleAlt, TrendingUp
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {axiosInstance} from '../../utils/axiosInstance';
import './Dashboard.scss';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverHealth, setServerHealth] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axiosInstance.get('/dashboard/metrics/:period');
        const salesResponse = await axiosInstance.get('/dashboard/salesOverview/:period');
        const serverHealthResponse = await axiosInstance.get('/dashboard/serverHealth');
        const lowStockResponse = await axiosInstance.get('/dashboard/lowStcok');

        setStats(statsResponse.data);
        setSalesData(salesResponse.data);
        setServerHealth(serverHealthResponse.data);
        setLowStock(lowStockResponse.data);

        if (salesResponse.data.length >= 2) {
          const currentSales = salesResponse.data[salesResponse.data.length - 1].totalSales;
          const previousSales = salesResponse.data[salesResponse.data.length - 2].totalSales;

          const growthValue = previousSales !== 0 
            ? ((currentSales - previousSales) / previousSales) * 100 
            : 0;

          setGrowth(growthValue);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box className="dashboard" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  const statItems = [
    { icon: <ShoppingCart color="primary" />, label: 'Total Orders', value: stats?.totalOrders || 0 },
    { icon: <AttachMoney color="success" />, label: 'Revenue', value: `₹${(stats?.totalSales || 0).toFixed(2)}` },
    { icon: <PeopleAlt color="secondary" />, label: 'Customers', value: stats?.totalCustomers || 0 },
    { icon: <TrendingUp color="warning" />, label: 'Growth', value: `${growth.toFixed(2)}%` },
  ];

  return (
    <Box className="dashboard" sx={{ p: 4 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statItems.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} className="stat-card" sx={{ minWidth: 180, textAlign: 'center' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexDirection: 'column' }}>
                <IconButton>{stat.icon}</IconButton>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} className="chart-container" sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Sales Overview</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalSales" stroke="#3f51b5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: 200, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Server Health</Typography>
            {serverHealth ? (
              serverHealth.status === "Healthy" ? (
                <>
                  <CircularProgress variant="determinate" value={100} color="success" thickness={6} size={80} />
                  <Typography sx={{ mt: 2, color: "green" }}>Status: {serverHealth.status}</Typography>
                  <Typography>Uptime: {serverHealth.uptime.toFixed(2)} sec</Typography>
                </>
              ) : (
                <>
                  <CircularProgress color="error" thickness={6} size={80} />
                  <Typography sx={{ mt: 2, color: "red" }}>Status: {serverHealth.status}</Typography>
                  <Typography>Uptime: {serverHealth.uptime.toFixed(2)} sec</Typography>
                </>
              )
            ) : (
              <Typography color="error">Error Fetching Data</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Low Stock Items</Typography>
            {lowStock && lowStock.length > 0 ? (
              <Box sx={{ maxHeight: 130, overflowY: "auto" }}>
                {lowStock.map((item) => (
                  <Paper key={item._id} elevation={2} sx={{ display: "flex", justifyContent: "space-between", p: 2, mb: 1 }}>
                    <Typography sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                    <Typography color="error">Qty: {item.quantity}</Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography sx={{ textAlign: "center", color: "green" }}>All stock levels are sufficient.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;