import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk để gọi API lấy danh sách xe
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const response = await axios.get('https://67301afc66e42ceaf15f5b82.mockapi.io/XeDap');
  return response.data;
});

// Thunk để thêm xe mới vào API
export const addBikeToAPI = createAsyncThunk('bikes/addBikeToAPI', async (newBike) => {
  const response = await axios.post('https://67301afc66e42ceaf15f5b82.mockapi.io/XeDap', newBike);
  return response.data; // Trả về dữ liệu từ API sau khi thêm thành công
});

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addBike: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBikes.rejected, (state) => {
        state.status = 'failed';
      })
      // Thêm trường hợp cho addBikeToAPI
      .addCase(addBikeToAPI.fulfilled, (state, action) => {
        state.items.push(action.payload); // Thêm xe mới vào danh sách sau khi thêm thành công vào API
      })
      .addCase(addBikeToAPI.rejected, (state, action) => {
        state.error = action.error.message; // Xử lý lỗi nếu có
      });
  },
});

export const { addBike } = bikeSlice.actions;
export default bikeSlice.reducer;
