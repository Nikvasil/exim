import api from './axios';

export const setFavourite = async(user, facility) => {
    return await api.post('/api/users/set-favourite', { userId: user._id, facility }, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}

export const removeFavourite = async(user) => {
    await api.post('/api/users/remove-favourite', { userId: user._id}, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}

export const getFacilities = async(categories) => {
    return await Promise.all(
        categories.map(category => api.get(`/api/${category}`).then(res => res.data.map(item => ({ ...item, category }))))
    );
}