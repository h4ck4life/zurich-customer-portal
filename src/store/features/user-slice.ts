import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    emailVisibility: {
        [key: number]: {
            email: string;
            loading: boolean;
            visible: boolean;
        };
    };
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    emailVisibility: {},
};

// Async thunks
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (page: number) => {
        const response = await fetch(`/api/users?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    }
);

export const fetchUserEmail = createAsyncThunk(
    'users/fetchUserEmail',
    async (userId: number) => {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch email');
        return response.json();
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setEmailVisibility: (
            state,
            action: PayloadAction<{ userId: number; visible: boolean }>
        ) => {
            const { userId, visible } = action.payload;
            if (state.emailVisibility[userId]) {
                state.emailVisibility[userId].visible = visible;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchUsers
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.currentPage = action.payload.page;
                state.totalPages = action.payload.total_pages;
                state.emailVisibility = {};
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            // Handle fetchUserEmail
            .addCase(fetchUserEmail.pending, (state, action) => {
                const userId = action.meta.arg;
                state.emailVisibility[userId] = {
                    email: '',
                    loading: true,
                    visible: true,
                };
            })
            .addCase(fetchUserEmail.fulfilled, (state, action) => {
                const userId = action.meta.arg;
                state.emailVisibility[userId] = {
                    email: action.payload.email,
                    loading: false,
                    visible: true,
                };
            })
            .addCase(fetchUserEmail.rejected, (state, action) => {
                const userId = action.meta.arg;
                state.emailVisibility[userId] = {
                    email: 'Error loading email',
                    loading: false,
                    visible: true,
                };
            });
    },
});

export const { setEmailVisibility } = userSlice.actions;
export default userSlice.reducer;