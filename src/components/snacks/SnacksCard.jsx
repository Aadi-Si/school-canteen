import React from 'react'

const SnacksCard = ({ name, price, ordersCount, imageUrl, index, onOrder }) => {
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(210,25%,15%,0.08)] hover:shadow-[0_12px_32px_-8px_hsl(210,25%,15%,0.15)] transition-all duration-300 hover:-translate-y-1"
      style={{ 
        animation: `fadeIn 0.5s ease-out forwards`,
        animationDelay: `${index * 50}ms`,
        opacity: 0
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[hsl(210,25%,15%)] font-bold px-3 py-1.5 rounded-full text-sm shadow-lg">
          ₹{price}
        </div>
      </div>

      
      <div className="p-4">
        <h3 className="font-bold text-lg text-[hsl(210,25%,15%)] mb-1 group-hover:text-[hsl(210,85%,55%)] transition-colors">
          {name}
        </h3>
        <p className="text-[hsl(210,15%,50%)] text-sm mb-4">
          Ordered {ordersCount} times
        </p>

        
        <button
          onClick={onOrder}
          className="w-full bg-linear-to-r from-[hsl(210,85%,55%)] to-[hsl(225,90%,65%)] text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[hsl(210,85%,55%,0.3)] transition-all duration-300 active:scale-[0.98]"
        >
          Order
        </button>
      </div>
    </div>
  )
}

export default SnacksCard