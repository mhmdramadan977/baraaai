import axios from 'axios';

const API_URL = '/api/orders';
const USERS_URL = '/api/users';
const ITEMS_URL = '/api/items';

const OrderService = {
    fetchUsers: async () => {
        const response = await axios.get(USERS_URL);
        return response.data;
    },
    fetchItems: async () => {
        const response = await axios.get(ITEMS_URL);
        return response.data;
    },
    fetchAllOrders: async () => {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    },
    fetchOrdersByUser: async (user) => {
        const response = await axios.get(`${API_URL}/${user}`);
        return response.data;
    },
    createOrder: async (user, item) => {
        const response = await axios.post(API_URL, { user, item });
        return response.data;
    },
    deleteOrder: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
    },
    updateOrder: async (id, updatedOrder) => {
        const response = await axios.put(`${API_URL}/${id}`, updatedOrder);
        return response.data;
    },
};

export default OrderService;
