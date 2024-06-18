import api from './axios';

export const registerUser = async (formData, setIsLoading) => {
    setIsLoading(true);

    try {
        const response = await api.post('api/users/register', formData);
        setIsLoading(false);
        return response;
    } catch (error) {
        setIsLoading(false);
        return error;
    }
}

export const loginUser = async (formData, setIsLoading) => {
    setIsLoading(true);

    try {
        const response = await api.post('api/users/login', formData);
        setIsLoading(false);
        return response;
    } catch (error) {
        setIsLoading(false);
        return error;
    }
}

export const deleteUser = async (user, setIsLoading) => {
    setIsLoading(true);

    try {
        await api.delete(`/api/users/${user._id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
    }
}

export const changePassword = async (user, formData, setIsLoading) => {
    setIsLoading(true);

    try {
        const response = await api.post('/api/users/change-password', {
            userId: user._id, currentPassword: formData.currentPassword, newPassword: formData.newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        setIsLoading(false);
        return response;
    } catch (error) {
        setIsLoading(false);
        return error;
    }
}

export const updateHomeAddress = async (user, homeAddress, setIsLoading) => {
    setIsLoading(true);

    try {
        const response = await api.post('/api/users/update-home-address', {
            userId: user._id, homeAddress,
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });
        setIsLoading(false);
        return response;
    } catch (error) {
        setIsLoading(false);
        return error;
    }
}