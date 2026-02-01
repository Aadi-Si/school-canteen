import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchStudents } from '../../store/features/studentSlice'
import CreateStudentForm from '../../components/students/CreateStudentForm'
import StudentCard from '../../components/students/StudentCard'

const StudentsPage = () => {
  const dispatch = useDispatch()
  const students = useSelector(state => state.student.students)
  const status = useSelector(state => state.student.status)

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-[#FCEADB] px-4 py-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-4">
          Students
        </h2>

        <CreateStudentForm />

        {status === 'loading' && (
          <p className="text-gray-500">Loading students...</p>
        )}

        <div className="space-y-4">
          {students.map(student => (
            <StudentCard
              key={student.id}
              student={student}
            />
          ))}
        </div>

        {students.length === 0 && status === 'succeeded' && (
          <p className="text-gray-600 mt-4">
            No students added yet.
          </p>
        )}

      </div>
    </div>
  )
}

export default StudentsPage
