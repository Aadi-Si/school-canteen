import React from 'react'
import { Link } from 'react-router-dom'

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
      <div>
        <h4 className="font-semibold">
          {student.name}
        </h4>
        <p className="text-sm text-gray-600">
          Referral: {student.referralCode}
        </p>
        <p className="text-sm">
          Total Spent: ₹{student.totalSpent}
        </p>
      </div>

      <Link
        to={`/students/${student.id}`}
        className="text-blue-600 font-medium"
      >
        View Details →
      </Link>
    </div>
  )
}

export default StudentCard
