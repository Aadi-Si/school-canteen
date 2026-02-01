import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StudentDetailPage = () => {
  const { id } = useParams()

  
  const students = useSelector(state => state.student.students)

  
  const student = students.find(s => s.id === id)

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Student not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FCEADB] px-4 py-6">
      <div className="max-w-4xl mx-auto">

        
        <Link
          to="/students"
          className="text-blue-600 font-medium mb-4 inline-block"
        >
          ← Back to Students
        </Link>

        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {student.name}
          </h2>

          <p className="text-gray-600">
            Referral Code: <b>{student.referralCode}</b>
          </p>

          <p className="mt-2 font-semibold">
            Total Spent: ₹{student.totalSpent}
          </p>
        </div>

        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">
            Order History
          </h3>

          {student.orders.length === 0 ? (
            <p className="text-gray-600">
              No orders placed yet.
            </p>
          ) : (
            <div className="space-y-3">
              {student.orders.map((order, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">
                      {order.snackName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {order.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{order.totalPrice}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="mt-6 text-right">
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Place New Order
          </Link>
        </div>

      </div>
    </div>
  )
}

export default StudentDetailPage
