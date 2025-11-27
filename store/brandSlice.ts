import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrandIdentity } from '@/types';

interface BrandState {
    data: BrandIdentity | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: BrandState = {
    data: null,
    isLoading: false,
    error: null,
};

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setBrandData: (state, action: PayloadAction<BrandIdentity | null>) => {
            state.data = action.payload;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        resetBrand: (state) => {
            state.data = null;
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const { setBrandData, setLoading, setError, resetBrand } = brandSlice.actions;
export default brandSlice.reducer;
