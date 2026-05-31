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

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.warn(`API call failed for ${endpoint}, using localStorage fallback:`, error);
        throw error; // Rethrow to let the caller handle it or use fallback
    }
}

// Helper for local storage persistence
const getLocalSpendings = () => JSON.parse(localStorage.getItem('spendings') || '[]');
const saveLocalSpendings = (spendings) => localStorage.setItem('spendings', JSON.stringify(spendings));

export const api = {
    uploadImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch(`${BASE_URL}/api/images/upload`, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            return result.data;
        } catch (e) {
            // Mock upload for demo
            return { imageUrl: URL.createObjectURL(file) };
        }
    },

    analyzeHome: async (imageFile, imageUrl) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('imageUrl', imageUrl);
            return await fetchWithGuest('/api/home', {
                method: 'POST',
                body: formData,
            });
        } catch (e) {
            // Mock analysis for demo
            return {
                itemName: "분석된 상품",
                category: "기타",
                amount: 10000,
                aiConfidence: 95,
                recommendedEmotion: "🌿 잘 샀다"
            };
        }
    },

    saveSpending: async (spendingData) => {
        try {
            const result = await fetchWithGuest('/api/spendings', {
                method: 'POST',
                body: JSON.stringify(spendingData),
            });
            return result;
        } catch (e) {
            // Fallback to local storage
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
            // Mock report data
            return {
                totalSpent: 150000,
                mostSpentCategory: "식비",
                emotionDistribution: { "잘 샀다": 5, "기분전환": 2 }
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

