import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { placeOrder } from '../../store/features/ordersSlice'
import { incrementSnackOrders } from '../../store/features/snacksSlice'
import { updateStudentAfterOrder } from '../../store/features/studentSlice'

const OrderModal = ({ isOpen, snack, onClose }) => {
  const dispatch = useDispatch()
  const students = useSelector(state => state.student.students)

  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!isOpen || !snack) return null

  const handlePlaceOrder = () => {
    const student = students.find(
      s => s.id === selectedStudentId
    )

    if (!student) return

    const order = {
      studentId: student.id,
      snackId: snack.id,
      snackName: snack.name,
      quantity,
      totalPrice: snack.price * quantity,
      createdAt: new Date().toISOString()
    }

    
    dispatch(placeOrder(order))

    
    dispatch(updateStudentAfterOrder({
      student,
      order
    }))

    
    dispatch(incrementSnackOrders(snack))

    
    onClose()

    
    setSelectedStudentId('')
    setQuantity(1)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">

        <h3 className="text-lg font-bold mb-4">
          Order {snack.name}
        </h3>

        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Student
          </label>
          <select
            value={selectedStudentId}
            onChange={e => setSelectedStudentId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Quantity (1–5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded"
          >
            Cancel
          </button>

          <button
            disabled={!selectedStudentId}
            onClick={handlePlaceOrder}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  )
}

export default OrderModal
