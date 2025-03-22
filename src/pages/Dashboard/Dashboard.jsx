import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CardContent,
  IconButton,
  LinearProgress,
  Skeleton,
} from "@mui/material";
import {
  ShoppingCart,
  AttachMoney,
  PeopleAlt,
  TrendingUp,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { axiosInstance } from "../../utils/axiosInstance";
import "./Dashboard.scss";

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
        const [statsRes, salesRes, serverHealthRes, lowStockRes] =
          await Promise.all([
            axiosInstance.get("/dashboard/metrics/1M"),
            axiosInstance.get("/dashboard/salesOverview/1M"),
            axiosInstance.get("/dashboard/serverHealth"),
            axiosInstance.get("/dashboard/lowStcok"),
          ]);

        setStats(statsRes.data);
        setSalesData(salesRes.data);
        setServerHealth(serverHealthRes.data);
        setLowStock(lowStockRes.data);

        if (salesRes.data.length >= 2) {
          const currentSales =
            salesRes.data[salesRes.data.length - 1].totalSales;
          const previousSales =
            salesRes.data[salesRes.data.length - 2].totalSales;
          setGrowth(previousSales !== 0 ? ((currentSales - previousSales) / previousSales) * 100 : 0);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="dashboard" sx={{ p: 4 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {(loading ? Array.from(new Array(4)) : [
          { icon: <ShoppingCart color="primary" />, label: "Total Orders", value: stats?.totalOrders || 0 },
          { icon: <AttachMoney color="success" />, label: "Revenue", value: `₹${(stats?.totalSales || 0).toFixed(2)}` },
          { icon: <PeopleAlt color="secondary" />, label: "Customers", value: stats?.totalCustomers || 0 },
          { icon: <TrendingUp color="warning" />, label: "Growth", value: `${growth.toFixed(2)}%` },
        ]).map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} className="stat-card" sx={{ minWidth: 180, textAlign: "center" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, flexDirection: "column" }}>
                {loading ? <Skeleton variant="circular" width={40} height={40} /> : <IconButton>{stat.icon}</IconButton>}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500, wordBreak: "break-word" }}>{loading ? <Skeleton width={80} /> : stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>{loading ? <Skeleton width={60} /> : stat.value}</Typography>
                </Box>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Sales Overview Chart */}
      <Paper elevation={3} className="chart-container" sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Sales Overview</Typography>
        {loading ? <Skeleton variant="rectangular" width="100%" height={300} /> : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3f51b5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3f51b5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="totalSales" stroke="#3f51b5" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Paper>

      {/* Server Health and Low Stock Section */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: 250, textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Server Health</Typography>
            {loading ? <Skeleton variant="text" width="100%" /> : (
              <>
                <LinearProgress variant="determinate" value={serverHealth?.status === "Healthy" ? 100 : 30} color={serverHealth?.status === "Healthy" ? "success" : "error"} />
                <Typography sx={{ mt: 2, color: serverHealth?.status === "Healthy" ? "green" : "red" }}>
                  Status: {serverHealth?.status || "Unknown"}
                </Typography>
                <Typography>Uptime: {serverHealth?.uptime?.toFixed(2) || 0} sec</Typography>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
  <Paper elevation={3} sx={{ p: 3, height: 250, display: "flex", flexDirection: "column" }}>
    <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Low Stock Items</Typography>
    
    {lowStock && lowStock.length > 0 ? (
      <Box sx={{
        maxHeight: 170,  // Limit height
        overflowY: "auto",  // Enable scrolling
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "4px" }
      }}>
        {lowStock.map((item) => (
          <Paper key={item._id} elevation={2} sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            mb: 1,
            flexWrap: "wrap"  // Ensures content wraps instead of overflowing
          }}>
            <Typography sx={{ fontWeight: "bold", wordBreak: "break-word" }}>{item.name}</Typography>
            <Typography color="error" sx={{ whiteSpace: "nowrap" }}>Qty: {item.quantity}</Typography>
          </Paper>
        ))}
      </Box>
    ) : (
      <Typography sx={{ textAlign: "center", color: "green" }}>
        All stock levels are sufficient.
      </Typography>
    )}
  </Paper>
</Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;
