import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Skeleton, Grid, Card, CardContent,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './SalesAnalytics.scss';

export default function SalesAnalytics() {
  const [timeRange, setTimeRange] = useState('1M');
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totals, setTotals] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        // Fetch Metrics
        const metricsResponse = await axiosInstance.get(`/dashboard/metrics/${timeRange}`);
        setTotals(metricsResponse.data);

        // Fetch Sales Data
        const salesResponse = await axiosInstance.get(`/dashboard/salesOverview/${timeRange}`);
        setSalesData(salesResponse.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  return (
    <Box className="sales-analytics" sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, minHeight: 500 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Sales Analytics
        </Typography>

        {/* Time Range Selector */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
          >
            <MenuItem value="1M">Last 1 Month</MenuItem>
            <MenuItem value="3M">Last 3 Months</MenuItem>
            <MenuItem value="6M">Last 6 Months</MenuItem>
            <MenuItem value="1Y">Last 1 Year</MenuItem>
          </Select>
        </FormControl>

        {/* Error Message */}
        {error && (
          <Box sx={{ textAlign: 'center', color: 'red', mt: 2 }}>
            <ErrorOutlineIcon fontSize="large" />
            <Typography variant="body1">Failed to load data. Try again later.</Typography>
          </Box>
        )}

        {/* Summary Cards (Totals) */}
        {loading ? (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[...Array(3)].map((_, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Skeleton variant="rectangular" width="100%" height={90} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Total Sales */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#f0f9ff' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <MonetizationOnIcon sx={{ fontSize: 40, color: '#0277bd', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#0277bd' }}>Total Sales</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>₹{totals.totalSales.toFixed(2)}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Total Orders */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#e8f5e9' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShoppingCartIcon sx={{ fontSize: 40, color: '#2e7d32', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#2e7d32' }}>Total Orders</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{totals.totalOrders}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Total Customers */}
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#fff3e0' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleAltIcon sx={{ fontSize: 40, color: '#ff6f00', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#ff6f00' }}>Total Customers</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{totals.totalCustomers}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Chart (Skeleton Placeholder) */}
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tick={{ fill: '#333' }} />
              <YAxis tick={{ fill: '#333' }} />
              <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', color: '#333' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalSales"
                stroke="#1abc9c"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </Box>
  );
}
