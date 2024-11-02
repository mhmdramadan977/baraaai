import React from 'react';
import { Button, MenuItem, Select, Typography } from '@mui/material';

const Login = ({ users, selectedUser, setSelectedUser, onLogin, onViewOrders }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <Typography variant="h4">Login</Typography>
            <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={{ margin: '10px 0' }}
            >
                <MenuItem value="">Select User</MenuItem>
                {users.map((user, index) => (
                    <MenuItem key={index} value={user}>{user}</MenuItem>
                ))}
            </Select>
            <Button variant="contained" onClick={() => onLogin(selectedUser)}>Login</Button>
            <Button variant="outlined" onClick={()=>onViewOrders()} style={{ marginTop: '10px' }}>
                View All Orders
            </Button>
        </div>
    );
};

export default Login;
