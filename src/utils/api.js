export const BASE_URL = 'https://fe-be-api.com';

export const getGuestId = () => {
    return localStorage.getItem('guestId') || 'testUser001';
}

const fetchWithGuest = async (endpoint, options = {}) => {
    const guestId = getGuestId();
    const url = `${BASE_URL}${endpoint}`;
    
    const headers = {
        'X-Guest-Id': guestId,
        ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const result = await response.json();
    
    // ApiResponse structure: { success: boolean, data: T, error: { code: string, message: string } }
    if (!result.success) {
        throw new Error(result.error?.message || 'API 요청에 실패했습니다.');
    }
    
    return result.data;
}

// Helper for local storage persistence (fallback for list/save actions if needed)
const getLocalSpendings = () => JSON.parse(localStorage.getItem('spendings') || '[]');
const saveLocalSpendings = (spendings) => localStorage.setItem('spendings', JSON.stringify(spendings));

export const api = {
    // 2.1 Image Upload
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file); // Aligning key name with backend expectation
        
        return await fetchWithGuest('/api/images/upload', {
            method: 'POST',
            body: formData,
        });
    },

    // 2.2 AI Consumption Analysis
    analyzeHome: async (imageFile, imageUrl) => {
        const formData = new FormData();
        formData.append('image', imageFile); // @RequestPart("image")
        formData.append('imageUrl', imageUrl); // @RequestParam("imageUrl")
        
        return await fetchWithGuest('/api/home', {
            method: 'POST',
            body: formData,
        });
    },

    // 2.3 Save Spending Record
    saveSpending: async (spendingData) => {
        try {
            return await fetchWithGuest('/api/spendings', {
                method: 'POST',
                body: JSON.stringify(spendingData),
            });
        } catch (e) {
            // Fallback for offline/demo mode
            const spendings = getLocalSpendings();
            const newItem = {
                id: Date.now(),
                ...spendingData,
                createdAt: new Date().toISOString()
            };
            saveLocalSpendings([newItem, ...spendings]);
            return newItem;
        }
    },

    getSpendings: async (year, month) => {
        try {
            return await fetchWithGuest('/api/spendings');
        } catch (e) {
            return getLocalSpendings();
        }
    },

    getTodaysSpendings: async () => {
        try {
            return await fetchWithGuest('/api/spendings/todays');
        } catch (e) {
            const all = getLocalSpendings();
            const today = new Date().toISOString().split('T')[0];
            const filtered = all.filter(s => s.purchaseDate === today || s.createdAt?.startsWith(today));
            return {
                totalAmount: filtered.reduce((sum, s) => sum + Number(s.amount), 0),
                spendings: filtered
            };
        }
    },

    updateSpending: (id, updateData) => {
        return fetchWithGuest(`/api/spendings/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updateData),
        });
    },

    deleteSpending: (id) => {
        return fetchWithGuest(`/api/spendings/${id}`, {
            method: 'DELETE',
        });
    },

    getReport: async (year, month) => {
        try {
            return await fetchWithGuest('/api/report');
        } catch (e) {
            return {
                totalSpent: 0,
                mostSpentCategory: "없음",
                emotionDistribution: {}
            };
        }
    },

    analyzeSpending: (year, month) => {
        return fetchWithGuest('/api/analyze', {
            method: 'POST',
            body: JSON.stringify({ year, month }),
        });
    }
};

