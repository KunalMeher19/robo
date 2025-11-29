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
        updateLogoUrl: (state, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.logoUrl = action.payload;
            }
        },
        updateSocialImage: (state, action: PayloadAction<{ index: number; imageUrl: string }>) => {
            if (state.data && state.data.socialPosts[action.payload.index]) {
                state.data.socialPosts[action.payload.index].imageUrl = action.payload.imageUrl;
            }
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

export const { setBrandData, updateLogoUrl, updateSocialImage, setLoading, setError, resetBrand } = brandSlice.actions;
export default brandSlice.reducer;
