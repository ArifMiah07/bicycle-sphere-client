import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilter {
  price: [number, number];
  brand?: string;
  model?: string;
  category?: string;
  availability?: boolean | 'all';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc' | '';
}

export interface IInitialState {
  search: string;
  filters: IFilter;
}

const initialState: IInitialState = {
  search: '',
  filters: {
    price: [0, 10000],
    brand: '',
    model: '',
    category: '',
    availability: 'all',
    sortBy: '',
    sortOrder: '',
  },
};

const bicycleSlice = createSlice({
  name: 'bicycles',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<IFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.search = '';
    },
  },
});

export const { setSearch, setFilters, resetFilters } = bicycleSlice.actions;

export default bicycleSlice.reducer;
