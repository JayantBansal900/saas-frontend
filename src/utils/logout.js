// frontend/src/utils/logout.ts
import axios from 'axios';
export const logout = async () => {
    try {
        await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
        window.location.href = '/login'; // redirect after logout
    }
    catch (err) {
        console.error('Logout error:', err);
    }
};
