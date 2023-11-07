import { createSlice } from '@reduxjs/toolkit'

const state = {
    userId: null,
    nickname: null,
    avatar: null,
    stateChange: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickname: payload.nickname,
            avatar: payload.photoURL,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        }),
        authLogOut: () => state,
    },
})

// console.log("authSlice", authSlice)
