import api from './axios';

export const registerUser = async(formData) => {
    return await api.post('api/users/register', formData);
}

export const loginUser = async(formData) => {
    return await api.post('api/users/login', formData);
}

export const deleteUser = async(user) => {
    await api.delete(`/api/users/${user._id}`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}

export const changePassword = async(user, formData) => {
    return await api.post('/api/users/change-password', {
        userId: user._id,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
    }, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}

export const updateHomeAddress = async(user, homeAddress) => {
    return await api.post('/api/users/update-home-address', {
        userId: user._id,
        homeAddress,
    }, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
}