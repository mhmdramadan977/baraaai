import React, { useState } from 'react';
import { Button, Select, MenuItem, Typography } from '@mui/material';
import Login from './components/Login';
import OrderPanel from './components/OrderPanel';
import ViewerPanel from './components/ViewerPanel';
import OrderService from './OrderService';

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [view, setView] = useState('login'); // 'login', 'order', 'viewer'

    const fetchUsers = async () => {
        const fetchedUsers = await OrderService.fetchUsers();
        setUsers(fetchedUsers);
    };

    const handleLogin = (user) => {
        setSelectedUser(user);
        setView('order');
    };

    const handleViewOrders = () => {
        setView('viewer');
    };

    const handleLogout = () => {
        setSelectedUser('');
        setView('login');
    };

    // Fetch users on mount
    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            {view === 'login' && (
                <Login
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    onLogin={handleLogin}
                    onViewOrders={handleViewOrders}
                />
            )}
            {view === 'order' && (
                <OrderPanel selectedUser={selectedUser} onLogout={handleLogout} />
            )}
            {view === 'viewer' && (
                <ViewerPanel selectedUser={selectedUser} onLogout={handleLogout} />
            )}
        </div>
    );
};

export default App;
