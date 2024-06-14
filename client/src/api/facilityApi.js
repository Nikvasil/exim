import api from './axios';

export const setFavourite = async(user, facility, setIsLoading) => {
    setIsLoading(true);
    const response = await api.post('/api/users/set-favourite', { userId: user._id, facility }, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
    setIsLoading(false);
    return response;
}

export const removeFavourite = async(user, setIsLoading) => {
    setIsLoading(true);
    await api.post('/api/users/remove-favourite', { userId: user._id}, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
    setIsLoading(false);
}

export const getFacilities = async(categories, setIsLoading) => {
    setIsLoading(true);
    const response = await Promise.all(
        categories.map(category => api.get(`/api/${category}`).then(res => res.data.map(item => ({ ...item, category }))))
    );
    setIsLoading(false);
    return response;
}