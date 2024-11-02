import React, { useEffect, useState } from 'react';
import OrderService from '../OrderService';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const ViewerPanel = ({ onLogout }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const allOrders = await OrderService.fetchAllOrders(); // Adjust to fetch all orders if needed
        setOrders(allOrders);
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div>
            <Typography variant="h4">All Orders</Typography>
            <List>
                {orders.map((order) => (
                    <ListItem key={order.id}>
                        <ListItemText 
                            primary={`${order.user}: ${order.item}`} 
                            secondary={`Placed on: ${new Date(order.timestamp).toLocaleString()}`} // Displaying the updated time
                        />
                    </ListItem>
                ))}
            </List>
            <Button variant="outlined" onClick={onLogout} style={{ marginTop: '10px' }}>
                Logout
            </Button>
        </div>
    );
};

export default ViewerPanel;
