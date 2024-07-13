import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
  name: string;
  imageUrl?: string;
  username: string;
}

const initialState: UserState = {
  id: '',
  name: '',
  imageUrl: undefined,
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.imageUrl = action.payload.imageUrl;
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
    clearUser: (state) => {
      state.name = '';
      state.imageUrl = undefined;
        state.id = '';
        state.username = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
