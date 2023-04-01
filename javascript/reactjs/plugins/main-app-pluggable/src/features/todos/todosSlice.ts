import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      // @ts-ignore
      state.push({
        // @ts-ignore
        id: action.payload.id,
        // @ts-ignore
        text: action.payload.text,
        // @ts-ignore
        completed: false
      })
    },
    todoToggled(state, action) {
      // @ts-ignore
      const todo = state.find(todo => todo.id === action.payload)
      // @ts-ignore
      todo.completed = !todo.completed
    }
  }
})

export const { todoAdded, todoToggled } = todosSlice.actions

export default todosSlice.reducer