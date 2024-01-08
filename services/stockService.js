import { API_KEY } from '@env';

const BASE_URL = 'https://api.iex.cloud/v1';

const getIpoData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/data/CORE/UPCOMING_IPOS/market?token=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch IPO');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching IPO:', error);
        throw error;
    }
};

const getCurrencyData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/fx/latest?symbols=USDCAD,GBPUSD,USDJPY,USDINR&token=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch Currency data`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error Currency data:', error);
        throw error;
    }
};

const getConvertCurrency = async (currency) => {
    try {
        const response = await fetch(`${BASE_URL}/fx/latest?symbols=${currency}&token=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch Currency data`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error Currency data:', error);
        throw error;
    }
};


const stockService = {
    getIpoData,
    getCurrencyData,
    getConvertCurrency,
};

export default stockService;
