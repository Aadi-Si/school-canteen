import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async () => {
    const res = await fetch('http://localhost:3000/students')

    if (!res.ok) {
      throw new Error('Failed to fetch students')
    }

    return res.json()
  }
)


export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (name) => {
    const newStudent = {
      id: nanoid(),
      name,
      referralCode: `REF-${Math.floor(Math.random() * 10000)}`,
      totalSpent: 0,
      orders: []
    }

    const res = await fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    })

    if (!res.ok) {
      throw new Error('Failed to create student')
    }

    return res.json()
  }
)


export const updateStudentAfterOrder = createAsyncThunk(
  'student/updateStudentAfterOrder',
  async ({ student, order }) => {
    const updatedStudent = {
      ...student,
      orders: [...student.orders, order],
      totalSpent: student.totalSpent + order.totalPrice
    }

    const res = await fetch(
      `http://localhost:3000/students/${student.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent)
      }
    )

    if (!res.ok) {
      throw new Error('Failed to update student')
    }

    return res.json()
  }
)


const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStudents.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.students = action.payload
      })
      .addCase(fetchStudents.rejected, state => {
        state.status = 'failed'
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload)
      })
      .addCase(updateStudentAfterOrder.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          s => s.id === action.payload.id
        )

        if (index !== -1) {
          state.students[index] = action.payload
        }
      })
  }
})

export default studentSlice.reducer