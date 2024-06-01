const baseUrl = 'http://localhost:8080/api/users';

export async function getAllUsers(token) {
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getUserById(id,token) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteUserById(id,token) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function editUserById(id, userModel,token) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userModel)
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getAllUsersHistory(id,token){
    try {
        const response = await fetch(`${baseUrl}/${id}/history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getUsersHistoryById(id,token,historyId) {
    try {
        const response = await fetch(`${baseUrl}/${id}/history/${historyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function searchTopic(id,topic,limit = 10,subreddit = 'all',token) {
    try {
        const response = await fetch(`${baseUrl}/${id}/history?topic=${topic}&limit=${limit}&subreddit=${subreddit}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteHistory(id, historyId, token) {
    try {
        const response = await fetch(`${baseUrl}/${id}/history/${historyId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            console.log('No JSON content returned from delete operation');
            return response.statusText;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function getAllPostsFromHistory(id,historyId,token){
    try {
        const response = await fetch(`${baseUrl}/${id}/history/${historyId}/post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getPostFromHistoryById(id,historyId,postId,token) {
    try {
        const response = await fetch(`${baseUrl}/${id}/history/${historyId}/post/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deletePostFromHistoryById(id,historyId,postId,token) {
    try {
        const response = await fetch(`${baseUrl}/${id}/history/${historyId}/post/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
// getAllUsers().then(data => console.log(data));
// getUserById(1).then(data => console.log(data));
// deleteUserById(1).then(data => console.log(data));
// editUserById(1, { /* user object */ }).then(data => console.log(data));
