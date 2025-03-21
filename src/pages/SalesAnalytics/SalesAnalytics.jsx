import { useState, useEffect } from 'react';
import {axiosInstance} from '../../utils/axiosInstance';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './SalesAnalytics.scss';

export default function SalesAnalytics() {
  const [timeRange, setTimeRange] = useState('6M');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axiosInstance.get(`/dashboard/salesOverview/${timeRange}`);
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [timeRange]);

  return (
    <Box className="sales-analytics" sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Sales Analytics</Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Time Range</InputLabel>
          <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <MenuItem value="1M">Last 1 Month</MenuItem>
            <MenuItem value="3M">Last 3 Months</MenuItem>
            <MenuItem value="6M">Last 6 Months</MenuItem>
            <MenuItem value="1Y">Last 1 Year</MenuItem>
          </Select>
        </FormControl>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="_id" tick={{ fill: '#333' }} />
            <YAxis tick={{ fill: '#333' }} />
            <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', color: '#333' }} />
            <Legend />
            <Line type="monotone" dataKey="totalSales" stroke="#1abc9c" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}