export const BASE_URL = 'https://fe-be-api.com';

export const getGuestId = () => {
    return localStorage.getItem('guestId') || 'testUser001'; // Default for testing if not set
}

const fetchWithGuest = async (endpoint, options = {}) => {
    const guestId = getGuestId();
    const url = `${BASE_URL}${endpoint}`;
    
    const headers = {
        'X-Guest-Id': guestId,
        ...options.headers,
    };

    // Don't set Content-Type if it's FormData, let the browser handle it
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.error?.message || 'API request failed');
    }
    return result.data;
}

export const api = {
    // 2.1 Image Upload (X-Guest-Id NOT required as per spec)
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${BASE_URL}/api/images/upload`, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.error?.message || 'Upload failed');
        return result.data;
    },

    // 2.2 AI Consumption Analysis
    analyzeHome: (imageFile, imageUrl) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('imageUrl', imageUrl);
        return fetchWithGuest('/api/home', {
            method: 'POST',
            body: formData,
        });
    },

    // 2.3 Save Spending Record
    saveSpending: (spendingData) => {
        return fetchWithGuest('/api/spendings', {
            method: 'POST',
            body: JSON.stringify(spendingData),
        });
    },

    // 2.4 List Spending Records
    getSpendings: (year, month) => {
        const params = new URLSearchParams();
        if (year) params.append('year', year);
        if (month) params.append('month', month);
        const queryString = params.toString() ? `?${params.toString()}` : '';
        return fetchWithGuest(`/api/spendings${queryString}`);
    },

    // 2.5 Today's Spending
    getTodaysSpendings: () => {
        return fetchWithGuest('/api/spendings/todays');
    },

    // 2.6 Update Spending Record
    updateSpending: (id, updateData) => {
        return fetchWithGuest(`/api/spendings/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updateData),
        });
    },

    // 2.7 Delete Spending Record
    deleteSpending: (id) => {
        return fetchWithGuest(`/api/spendings/${id}`, {
            method: 'DELETE',
        });
    },

    // 2.8 Monthly Report
    getReport: (year, month) => {
        const params = new URLSearchParams();
        if (year) params.append('year', year);
        if (month) params.append('month', month);
        const queryString = params.toString() ? `?${params.toString()}` : '';
        return fetchWithGuest(`/api/report${queryString}`);
    },

    // 2.9 Spending Analysis Insight
    analyzeSpending: (year, month) => {
        return fetchWithGuest('/api/analyze', {
            method: 'POST',
            body: JSON.stringify({ year, month }),
        });
    }
};
