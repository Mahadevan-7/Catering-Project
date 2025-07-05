import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import './Dashboard.css';
import WhatsAppContact from './WhatsAppContact';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import EditProductModal from './components/EditProductModal'; 


const OrdersGrid = () => {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);
    const itemsPerPage = 20;

    
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [openDetailsModal, setOpenDetailsModal] = React.useState(false);

    
    const [orderToUpdate, setOrderToUpdate] = React.useState(null);
    const [openStatusModal, setOpenStatusModal] = React.useState(false);
    const [newStatus, setNewStatus] = React.useState('');
    
    React.useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const timeoutId = setTimeout(() => {
                setError('Request timeout. Please try again.');
                setLoading(false);
            }, 10000);

            const response = await fetch('http://localhost:3000/api/orders');

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();

            const transformedData = data.map((item, index) => ({
                id: item._id || item.id,
                orderNumber: `ORD-${String(item._id || item.id).slice(-4).padStart(4, '0')}`,
                status: item.status || 'Pending',
                customerName: item.customerName || 'Anonymous Customer',
                email: item.email || 'No email provided',
                phone: item.phone || 'No phone provided',
                address: item.address || 'No address provided',
                orderDate: item.createdAt || new Date().toISOString(),
                itemCount: item.items ? item.items.length : 1,
                totalAmount: item.total || 0,
                eventType: item.eventType || 'General',
                items: item.items || []
            }));

            setOrders(transformedData);
            setHasMore(transformedData.length >= itemsPerPage);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'warning';
            case 'confirmed':
                return 'info';
            case 'completed':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };
    const getPaginatedOrders = () => {
        const startIndex = (page - 1) * itemsPerPage;
        return orders.slice(startIndex, startIndex + itemsPerPage);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setOpenDetailsModal(true);
    };

    const handleUpdateStatusClick = (order) => {
        setOrderToUpdate(order);
        setNewStatus(order.status); 
        setOpenStatusModal(true);
    };

    const handleSaveStatus = async () => {
        if (!orderToUpdate || !newStatus) {
            alert('Please select a new status.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/orders/${orderToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderToUpdate.id ? { ...order, status: newStatus } : order
                )
            );

            setOpenStatusModal(false);
            setOrderToUpdate(null);
            setNewStatus('');
            alert('Order status updated successfully!');
        } catch (err) {
            alert('Error updating status: ' + err.message);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="outlined"
                    onClick={fetchOrders}
                    sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.6)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    const displayedOrders = getPaginatedOrders();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                    Orders ({orders.length})
                </Typography>
                <Button
                    variant="outlined"
                    onClick={fetchOrders}
                    sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.6)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    Refresh
                </Button>
            </Box>

            {orders.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        No orders found
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {displayedOrders.map((order, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={order.id || index}>
                                <Card
                                    sx={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                                            border: '1px solid rgba(255, 255, 255, 0.4)'
                                        }
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                                                {order.orderNumber}
                                            </Typography>
                                            <Chip
                                                label={order.status}
                                                color={getStatusColor(order.status)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    color: 'rgba(255, 255, 255, 0.9)'
                                                }}
                                            />
                                        </Box>

                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                            <strong>Customer:</strong> {order.customerName}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                            <strong>Phone:</strong> {order.phone}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                            <strong>Item:</strong> {order.items && order.items.length > 0 ? order.items[0].title : 'No items'}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                                            <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                                        </Typography>

                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                                            <strong>Total:</strong> ₹{order.totalAmount}
                                        </Typography>

                                        <Chip
                                            label={order.eventType}
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                                color: 'rgba(255, 255, 255, 0.8)'
                                            }}
                                        />
                                    </CardContent>

                                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                        <Button
                                            size="small"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                                }
                                            }}
                                            onClick={() => handleViewDetails(order)}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                                                }
                                            }}
                                            onClick={() => handleUpdateStatusClick(order)}
                                        >
                                            Update Status
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {hasMore && displayedOrders.length < orders.length && (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <Button
                                variant="outlined"
                                onClick={handleLoadMore}
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    '&:hover': {
                                        borderColor: 'rgba(255, 255, 255, 0.6)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }
                                }}
                            >
                                Load More Orders
                            </Button>
                        </Box>
                    )}
                </>
            )}

            
            <Dialog open={openDetailsModal} onClose={() => setOpenDetailsModal(false)}>
                <DialogTitle sx={{ color: 'black' }}>Order Details: {selectedOrder?.orderNumber}</DialogTitle>
                <DialogContent dividers sx={{ color: 'black' }}>
                    {selectedOrder && (
                        <Box>
                            <Typography variant="body1" gutterBottom>
                                <strong>Order ID:</strong> {selectedOrder.id}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Customer Name:</strong> {selectedOrder.customerName}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Email:</strong> {selectedOrder.email}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Phone:</strong> {selectedOrder.phone}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Address:</strong> {selectedOrder.address}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Total Items:</strong> {selectedOrder.itemCount}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Event Type:</strong> {selectedOrder.eventType}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Status:</strong> <Chip label={selectedOrder.status} color={getStatusColor(selectedOrder.status)} size="small" />
                            </Typography>
                            {selectedOrder.items && selectedOrder.items.length > 0 && (
                                <Typography variant="body1" gutterBottom>
                                    <strong>Items:</strong>
                                    <Box sx={{ ml: 2, mt: 1 }}>
                                        {selectedOrder.items.map((item, index) => (
                                            <Typography key={index} variant="body2" sx={{ color: 'text.secondary' }}>
                                                • {item.title} - Qty: {item.qty} - ₹{item.price}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Typography>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDetailsModal(false)} sx={{ color: 'black' }}>Close</Button>
                </DialogActions>
            </Dialog>

            
            <Dialog open={openStatusModal} onClose={() => setOpenStatusModal(false)}>
                <DialogTitle sx={{ color: 'black' }}>Update Status for {orderToUpdate?.orderNumber}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        select
                        label="New Status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        fullWidth
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                    >
                        <option value=""></option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenStatusModal(false)} sx={{ color: 'black' }}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveStatus} sx={{ color: 'black' }}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};


const ProductsGrid = () => {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [editOpen, setEditOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
  
    const handleSaveEdit = async (updatedProduct) => {
      try {
        const res = await fetch(`http://localhost:3001/products/${updatedProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        });
  
        if (!res.ok) throw new Error("Failed to update");
  
        const updatedList = products.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        setProducts(updatedList);
      } catch (err) {
        console.error("Update error:", err);
      }
    };
  
    const [editingProduct, setEditingProduct] = React.useState(null);
    const handleEdit = (product) => {
        setEditingProduct(product); 
        alert(`Edit clicked for: ${product.title}`);
    
    };
    const [openAddModal, setOpenAddModal] = React.useState(false);
const [newProduct, setNewProduct] = React.useState({
    title: '',
    description: '',
    image: '',
    price: '',
    category: ''
});
    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3001/products/${productId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete');

            
            setProducts(prev => prev.filter(product => product.id !== productId));
        } catch (error) {
            alert(`Delete failed: ${error.message}`);
        }
    };
    const handleAddProduct = async () => {
        const productToAdd = {
            ...newProduct,
            price: parseFloat(newProduct.price),
            id: Date.now().toString()
        };
    
        try {
            const response = await fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToAdd)
            });
    
            if (!response.ok) throw new Error('Failed to add product');
    
            const addedProduct = await response.json();
            setProducts(prev => [...prev, addedProduct]);
            setOpenAddModal(false);
            setNewProduct({
                title: '',
                description: '',
                image: '',
                price: '',
                category: ''
            });
        } catch (err) {
            alert('Error adding product: ' + err.message);
        }
    };
    React.useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            
            const timeoutId = setTimeout(() => {
                setError('Request timeout. Please try again.');
                setLoading(false);
            }, 10000); 

           
            const response = await fetch('http://localhost:3001/products');
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button 
                    variant="outlined" 
                    onClick={fetchProducts}
                    sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.6)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    Retry
                </Button>
            </Box>
        );
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                    Products ({products.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        variant="contained"
                        onClick={() => setOpenAddModal(true)} 
                        sx={{ 
                            backgroundColor: 'rgba(76, 175, 80, 0.8)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                                backgroundColor: 'rgba(76, 175, 80, 1)'
                            }
                        }}
                    >
                        + Add Product
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={fetchProducts}
                        sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)', 
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            '&:hover': {
                                borderColor: 'rgba(255, 255, 255, 0.6)',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        Refresh
                    </Button>
                </Box>
            </Box>
            
            {products.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        No products found
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || index}>
                            <Card 
                                sx={{ 
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    transition: 'all 0.3s ease',
                                    maxWidth: 280,
                                    minHeight: 380,
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                                        border: '1px solid rgba(255, 255, 255, 0.4)'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 140,
                                        backgroundImage: `url(${product.image})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                />
                                
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, mb: 1 }}>
                                        {product.title?.substring(0, 20)}...
                                    </Typography>
                                    
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1.5 }}>
                                        {product.description?.substring(0, 100)}...
                                    </Typography>
                                    
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500, mb: 2 }}>
                                        ₹{product.price} per no.
                                    </Typography>
                                    
                                    {product.category && (
                                        <Chip 
                                            label={product.category} 
                                            variant="outlined"
                                            size="small"
                                            sx={{ 
                                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                                color: 'rgba(255, 255, 255, 0.8)'
                                            }}
                                        />
                                    )}
                                </CardContent>
                                
                                <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            onClick={() => {
                                                setSelectedProduct(product);  
                                                setEditOpen(true);            
                                               }}
                                            sx={{ 
                                                backgroundColor: 'rgba(33, 150, 243, 0.8)',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(33, 150, 243, 1)'
                                                }
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            onClick={() => handleDelete(product.id)}
                                            sx={{ 
                                                backgroundColor: 'rgba(244, 67, 54, 0.8)',
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(244, 67, 54, 1)'
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
              <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField label="Title" fullWidth value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                <TextField label="Description" fullWidth multiline minRows={2}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                <TextField label="Image URL" fullWidth
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
                <TextField label="Price" fullWidth type="number"
                    value={newProduct.price}
                    onChange={(e) => {
                        const val = e.target.value;
                        setNewProduct({ ...newProduct, price: val === '' ? '' : Math.max(0, Number(val)) });
                    }}
                    inputProps={{ min: 0 }}
                />
                <TextField label="Category" fullWidth
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
            </DialogContent>
            <DialogActions>
                <Button className='add-product-buttons-cancel' onClick={() => setOpenAddModal(false)}>Cancel</Button>
                <Button className='add-product-buttons-add' variant="contained" onClick={handleAddProduct}>Add</Button>
            </DialogActions>
        </Dialog>
        <EditProductModal
  open={editOpen}
  handleClose={() => setEditOpen(false)}
  product={selectedProduct}
  onSave={handleSaveEdit}
/>
        </Box>
    );
};

const Dashboard = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='dashboard-container'>
            <WhatsAppContact />
            <div className='glass-morphism-card' style={{
                maxHeight: '80vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
            }}>
                <Box sx={{ 
                    width: '100%', 
                    typography: 'body1', 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-start', 
                    p: 0,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.5)',
                        }
                    }
                }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.2)', p: 0, m: 0 }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                sx={{
                                    minHeight: 48,
                                    '& .MuiTab-root': {
                                        minHeight: 44,
                                        borderRadius: 2,
                                        background: 'transparent',
                                        transition: 'all 0.3s ease',
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: 'rgba(255, 255, 255, 1)',
                                        },
                                        '&.Mui-selected': {
                                            color: 'rgba(255, 255, 255, 1)',
                                            background: 'rgba(255, 255, 255, 0.15)',
                                        }
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    }
                                }}
                            >
                                <Tab label="Orders" value="1" sx={{ minHeight: 44 }} />
                                <Tab label="Products" value="2" sx={{ minHeight: 44 }} />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ flex: 1, color: 'rgba(255, 255, 255, 0.9)', overflowY: 'auto' }}>
                            <OrdersGrid />
                        </TabPanel>
                        <TabPanel value="2" sx={{ flex: 1, color: 'rgba(255, 255, 255, 0.9)', overflowY: 'auto' }}>
                            <ProductsGrid />
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export { Dashboard }