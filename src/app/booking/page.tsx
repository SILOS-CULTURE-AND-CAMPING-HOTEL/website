'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Users, CreditCard, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    cabinType: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    foodItems: [] as string[],
    arrivalTime: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  })

  const cabinTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Cabin',
      price: 150,
      capacity: 4,
      features: ['King Bed', 'Kitchenette', 'Balcony', 'AC', 'Mountain View'],
      image: '🏡'
    },
    {
      id: 'standard',
      name: 'Standard Cabin',
      price: 100,
      capacity: 2,
      features: ['Queen Bed', 'Mini Fridge', 'Balcony', 'AC'],
      image: '🏕️'
    },
    {
      id: 'family',
      name: 'Family Suite',
      price: 200,
      capacity: 6,
      features: ['2 Bedrooms', 'Full Kitchen', 'Living Area', 'AC', 'Garden View'],
      image: '🏠'
    }
  ]

  const foodMenu = [
    {
      category: 'Breakfast',
      items: [
        { id: 'breakfast1', name: 'Continental Breakfast', price: 25 },
        { id: 'breakfast2', name: 'Full English Breakfast', price: 30 },
        { id: 'breakfast3', name: 'Local Kenyan Breakfast', price: 20 }
      ]
    },
    {
      category: 'Lunch',
      items: [
        { id: 'lunch1', name: 'Grilled Chicken Salad', price: 35 },
        { id: 'lunch2', name: 'Beef Burger & Fries', price: 40 },
        { id: 'lunch3', name: 'Vegetarian Pasta', price: 30 }
      ]
    },
    {
      category: 'Dinner',
      items: [
        { id: 'dinner1', name: 'Grilled Steak', price: 60 },
        { id: 'dinner2', name: 'Seafood Platter', price: 75 },
        { id: 'dinner3', name: 'Vegetarian Feast', price: 45 }
      ]
    },
    {
      category: 'Beverages',
      items: [
        { id: 'bev1', name: 'Fresh Juice', price: 8 },
        { id: 'bev2', name: 'Soft Drinks', price: 5 },
        { id: 'bev3', name: 'Local Beer', price: 10 }
      ]
    }
  ]

  const calculateTotal = () => {
    const cabin = cabinTypes.find(c => c.id === bookingData.cabinType)
    const cabinPrice = cabin ? cabin.price : 0
    const foodPrice = bookingData.foodItems.reduce((total, itemId) => {
      const item = foodMenu.flatMap(cat => cat.items).find(i => i.id === itemId)
      return total + (item ? item.price : 0)
    }, 0)
    return cabinPrice + foodPrice
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      window.location.href = '/'
    }
  }

  const toggleFoodItem = (itemId: string) => {
    setBookingData(prev => ({
      ...prev,
      foodItems: prev.foodItems.includes(itemId)
        ? prev.foodItems.filter(id => id !== itemId)
        : [...prev.foodItems, itemId]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Silos Hotel
            </Link>
            <Button variant="outline" className="border-gray-300 bg-gray-900/80 text-gray-100 hover:bg-gray-800 hover:border-gray-400 hover:text-white" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Booking Progress */}
      <div className="pt-24 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    s <= step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {s}
                </motion.div>
                {s < 4 && <div className={`w-16 h-1 mx-2 ${s < step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Book Your Stay</h1>
            <p className="text-gray-400">
              {step === 1 && "Select your perfect cabin"}
              {step === 2 && "Choose your check-in details"}
              {step === 3 && "Pre-order your meals"}
              {step === 4 && "Complete your booking"}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-6 pb-20">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {cabinTypes.map((cabin) => (
                  <motion.div
                    key={cabin.id}
                    whileHover={{ scale: 1.05 }}
                    className={`cursor-pointer ${bookingData.cabinType === cabin.id ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setBookingData(prev => ({ ...prev, cabinType: cabin.id }))}
                  >
                    <Card className={`h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all ${
                      bookingData.cabinType === cabin.id ? 'bg-white/20 border-purple-500' : ''
                    }`}>
                      <CardHeader className="text-center">
                        <div className="text-6xl mb-4">{cabin.image}</div>
                        <CardTitle className="text-xl text-white">{cabin.name}</CardTitle>
                        <CardDescription className="text-gray-300">
                          ${cabin.price} per night
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-300">
                            <Users className="h-4 w-4 mr-2" />
                            Up to {cabin.capacity} guests
                          </div>
                          <ul className="space-y-1">
                            {cabin.features.map((feature, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Booking Details</CardTitle>
                  <CardDescription className="text-gray-300">
                    Select your dates and number of guests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn" className="text-white">Check-in Date</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut" className="text-white">Check-out Date</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="guests" className="text-white">Number of Guests</Label>
                    <Select value={bookingData.guests} onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: value }))}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5 Guests</SelectItem>
                        <SelectItem value="6">6 Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="arrivalTime" className="text-white">Expected Arrival Time</Label>
                    <Select value={bookingData.arrivalTime} onValueChange={(value) => setBookingData(prev => ({ ...prev, arrivalTime: value }))}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select arrival time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                        <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
                        <SelectItem value="night">Night (8PM - 11PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Pre-order Meals</CardTitle>
                  <CardDescription className="text-gray-300">
                    Select meals to be ready upon your arrival (optional)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {foodMenu.map((category) => (
                      <div key={category.category}>
                        <h3 className="text-lg font-semibold mb-3 text-white">{category.category}</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {category.items.map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => toggleFoodItem(item.id)}
                              className={`cursor-pointer p-4 rounded-lg border transition-all ${
                                bookingData.foodItems.includes(item.id)
                                  ? 'bg-purple-600/30 border-purple-500'
                                  : 'bg-white/5 border-white/20 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-white">{item.name}</h4>
                                  <p className="text-sm text-gray-400">${item.price}</p>
                                </div>
                                <div className={`w-5 h-5 rounded border-2 ${
                                  bookingData.foodItems.includes(item.id)
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-white/40'
                                }`}>
                                  {bookingData.foodItems.includes(item.id) && (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Complete Your Booking</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill in your details and confirm payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name</Label>
                      <Input
                        id="name"
                        value={bookingData.customerInfo.name}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          customerInfo: { ...prev.customerInfo, name: e.target.value }
                        }))}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.customerInfo.email}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          customerInfo: { ...prev.customerInfo, email: e.target.value }
                        }))}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      value={bookingData.customerInfo.phone}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, phone: e.target.value }
                      }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests" className="text-white">Special Requests (Optional)</Label>
                    <Textarea
                      id="specialRequests"
                      value={bookingData.customerInfo.specialRequests}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, specialRequests: e.target.value }
                      }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Any special requirements or requests..."
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-white">Booking Summary</h3>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>Cabin: {cabinTypes.find(c => c.id === bookingData.cabinType)?.name}</p>
                      <p>Check-in: {bookingData.checkIn}</p>
                      <p>Check-out: {bookingData.checkOut}</p>
                      <p>Guests: {bookingData.guests}</p>
                      <p>Food Items: {bookingData.foodItems.length} items selected</p>
                    </div>
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <p className="text-xl font-bold text-white">Total: ${calculateTotal()}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center mb-2">
                      <CreditCard className="h-5 w-5 mr-2 text-purple-400" />
                      <h3 className="font-semibold text-white">Payment Method</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      Payment will be processed via M-Pesa upon confirmation
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Proceed to M-Pesa Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            className="border-gray-300 bg-gray-900/80 text-gray-100 hover:bg-gray-800 hover:border-gray-400 hover:text-white"
            onClick={prevStep}
            title={step === 1 ? "Go to Homepage" : "Go to Previous Step"}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 1 ? "Home" : "Previous"}
          </Button>
          
          {step < 4 && (
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={nextStep}
              disabled={
                (step === 1 && !bookingData.cabinType) ||
                (step === 2 && (!bookingData.checkIn || !bookingData.checkOut || !bookingData.guests || !bookingData.arrivalTime))
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
