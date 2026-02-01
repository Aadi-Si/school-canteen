import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createStudent } from '../../store/features/studentSlice'

const CreateStudentForm = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) return

    dispatch(createStudent(name))
    setName('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow mb-6"
    >
      <h3 className="font-bold mb-3">
        Add New Student
      </h3>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default CreateStudentForm
