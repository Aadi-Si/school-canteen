import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import SnacksCard from '../snacks/SnacksCard'
import OrderModal from '../order/OrderModal'
import { fetchSnacks } from '../../store/features/snacksSlice'
import { fetchStudents } from '../../store/features/studentSlice'

const Container = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const snacks = useSelector(state => state.snacks.items)
  const snacksStatus = useSelector(state => state.snacks.status)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [selectedSnack, setSelectedSnack] = useState(null)

  useEffect(() => {
    if (snacksStatus === 'idle') {
      dispatch(fetchSnacks())
    }
  }, [snacksStatus, dispatch])

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-[#FCEADB] font-['Plus_Jakarta_Sans',sans-serif]">
      
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[hsl(220,95%,45%)] to-[hsl(190,90%,50%)] opacity-95" />
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
              <span className="text-4xl">🍴</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
              School Canteen
            </h1>
            <p className="text-white/80 text-lg font-medium">
              Fresh • Delicious • Affordable
            </p>
          </div>

          
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-white text-[hsl(24,85%,55%)] shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              🍟 Snacks
            </Link>
            <Link
              to="/students"
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                location.pathname.startsWith('/students')
                  ? 'bg-white text-[hsl(24,85%,55%)] shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              👨‍🎓 Students
            </Link>
          </div>
        </div>
      </header>

      
      <main className="container mx-auto px-4 py-8">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🍽️</span>
            <h2 className="text-2xl font-bold text-[hsl(25,25%,15%)]">Snacks Available</h2>
          </div>

          
          {snacksStatus === 'loading' && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block animate-pulse">🍿</span>
              <p className="text-[hsl(25,15%,50%)] text-lg">Loading snacks...</p>
            </div>
          )}

          
          {snacksStatus === 'succeeded' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {snacks.map((snack, index) => (
                <SnacksCard
                  key={snack.id}
                  name={snack.name}
                  price={snack.price}
                  ordersCount={snack.ordersCount}
                  imageUrl={snack.imageUrl}
                  index={index}
                  onOrder={() => {
                    setSelectedSnack(snack)
                    setIsOrderModalOpen(true)
                  }}
                />
              ))}
            </div>
          )}

          
          {snacksStatus === 'failed' && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">😕</span>
              <h3 className="text-xl font-semibold text-[hsl(25,25%,15%)] mb-2">Failed to load snacks</h3>
              <p className="text-[hsl(25,15%,50%)]">Please try again later</p>
            </div>
          )}
        </section>
      </main>

      
      <footer className="border-t border-[hsl(35,20%,88%)] mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[hsl(25,15%,50%)] text-sm">
            🍴 School Canteen • Open Mon-Sat, 8AM - 4PM
          </p>
        </div>
      </footer>

      
      <OrderModal
        isOpen={isOrderModalOpen}
        snack={selectedSnack}
        onClose={() => {
          setIsOrderModalOpen(false)
          setSelectedSnack(null)
        }}
      />
    </div>
  )
}

export default Container
