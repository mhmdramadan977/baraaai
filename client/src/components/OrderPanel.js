import React, { useEffect, useState } from 'react';
import OrderService from '../OrderService';
import {
    Button,
    Select,
    MenuItem,
    TextField,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';

const OrderPanel = ({ selectedUser, onLogout }) => {
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [editingOrder, setEditingOrder] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editedItem, setEditedItem] = useState('');

    useEffect(() => {
  
        fetchItems();
        fetchUserOrders();
    }, [selectedUser]);

    const fetchItems = async () => {
        const fetchedItems = await OrderService.fetchItems();
        setItems(fetchedItems);
    };

    const fetchUserOrders = async () => {
        const userOrders = await OrderService.fetchOrdersByUser(selectedUser);
        setOrders(userOrders);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedUser && selectedItem) {
            await OrderService.createOrder(selectedUser, selectedItem);
            setSelectedItem('');
            fetchUserOrders();
        }
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setEditedItem(order.item);
        setDialogOpen(true);
    };

    const handleDelete = async (id) => {
        await OrderService.deleteOrder(id);
        fetchUserOrders();
    };

    const handleUpdateOrder = async () => {
        if (editingOrder) {
            await OrderService.updateOrder(editingOrder.id, { user: selectedUser, item: editedItem });
            setDialogOpen(false);
            setEditingOrder(null);
            fetchUserOrders();
        }
    };

    return (
        <div>
            <Typography variant="h4">Order Panel for {selectedUser}</Typography>
            <form onSubmit={handleSubmit}>
                <Select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    required
                    style={{ margin: '10px 0' }}
                >
                    <MenuItem value="">Select Item</MenuItem>
                    {items.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" type="submit">Create Order</Button>
            </form>
            <List>
                {orders.map((order) => (
                    <ListItem key={order.id}>
                        <ListItemText primary={order.item} />
                        <Button onClick={() => handleEdit(order)}>Edit</Button>
                        <Button onClick={() => handleDelete(order.id)}>Delete</Button>
                    </ListItem>
                ))}
            </List>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Edit Order</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item"
                        fullWidth
                        variant="outlined"
                        value={editedItem}
                        onChange={(e) => setEditedItem(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateOrder}>Update</Button>
                </DialogActions>
            </Dialog>

            <Button variant="outlined" onClick={onLogout} style={{ marginTop: '10px' }}>
                Logout
            </Button>
        </div>
    );
};

export default OrderPanel;
