'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Calendar, 
  DollarSign, 
  Bed, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Home,
  Search,
  Filter
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Deluxe Cabin 1', type: 'deluxe', status: 'available', capacity: 4, price: 150 },
    { id: 2, name: 'Deluxe Cabin 2', type: 'deluxe', status: 'occupied', capacity: 4, price: 150 },
    { id: 3, name: 'Standard Cabin 1', type: 'standard', status: 'available', capacity: 2, price: 100 },
    { id: 4, name: 'Family Suite 1', type: 'family', status: 'maintenance', capacity: 6, price: 200 },
  ])

  const [reservations, setReservations] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+254 XXX XXX XXX',
      roomName: 'Deluxe Cabin 2',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      guests: 2,
      status: 'confirmed',
      totalAmount: 450,
      paymentStatus: 'paid'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      customerPhone: '+254 XXX XXX XXX',
      roomName: 'Standard Cabin 1',
      checkIn: '2024-01-20',
      checkOut: '2024-01-22',
      guests: 2,
      status: 'pending',
      totalAmount: 200,
      paymentStatus: 'pending'
    }
  ])

  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'standard',
    capacity: '',
    price: ''
  })

  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter(r => r.status === 'available').length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    monthlyRevenue: 15420,
    pendingReservations: reservations.filter(r => r.status === 'pending').length,
    totalReservations: reservations.length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500'
      case 'occupied': return 'bg-blue-500'
      case 'maintenance': return 'bg-yellow-500'
      case 'confirmed': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const addRoom = () => {
    if (newRoom.name && newRoom.capacity && newRoom.price) {
      setRooms([...rooms, {
        id: rooms.length + 1,
        name: newRoom.name,
        type: newRoom.type,
        status: 'available',
        capacity: parseInt(newRoom.capacity),
        price: parseInt(newRoom.price)
      }])
      setNewRoom({ name: '', type: 'standard', capacity: '', price: '' })
    }
  }

  const deleteRoom = (id: number) => {
    setRooms(rooms.filter(room => room.id !== id))
  }

  const updateReservationStatus = (id: number, status: string) => {
    setReservations(reservations.map(res => 
      res.id === id ? { ...res, status } : res
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Silos Admin
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="border-gray-300 bg-gray-900/80 text-gray-100 hover:bg-gray-800 hover:border-gray-400 hover:text-white" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Site
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage rooms, reservations, and monitor hotel performance</p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/10 border-white/20">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="rooms" className="data-[state=active]:bg-purple-600">
                <Bed className="h-4 w-4 mr-2" />
                Rooms
              </TabsTrigger>
              <TabsTrigger value="reservations" className="data-[state=active]:bg-purple-600">
                <Calendar className="h-4 w-4 mr-2" />
                Reservations
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-purple-600">
                <DollarSign className="h-4 w-4 mr-2" />
                Payments
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Total Rooms</CardTitle>
                      <Bed className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalRooms}</div>
                      <p className="text-xs text-gray-400">
                        {stats.availableRooms} available, {stats.occupiedRooms} occupied
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Monthly Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                      <p className="text-xs text-gray-400">+12% from last month</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-300">Reservations</CardTitle>
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalReservations}</div>
                      <p className="text-xs text-gray-400">
                        {stats.pendingReservations} pending confirmation
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Recent Reservations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reservations.slice(0, 3).map((reservation) => (
                        <div key={reservation.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <p className="font-medium text-white">{reservation.customerName}</p>
                            <p className="text-sm text-gray-400">{reservation.roomName} • {reservation.checkIn}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(reservation.status)} text-white`}>
                              {reservation.status}
                            </Badge>
                            <p className="text-sm text-gray-400 mt-1">${reservation.totalAmount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Rooms Tab */}
            <TabsContent value="rooms" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Room Management</h2>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Add New Room Form */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Add New Room</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="roomName" className="text-white">Room Name</Label>
                      <Input
                        id="roomName"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="e.g., Deluxe Cabin 3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomType" className="text-white">Room Type</Label>
                      <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="deluxe">Deluxe</SelectItem>
                          <SelectItem value="family">Family Suite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="capacity" className="text-white">Capacity</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={newRoom.capacity}
                          onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="4"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price" className="text-white">Price/Night</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newRoom.price}
                          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="150"
                        />
                      </div>
                    </div>
                    <Button onClick={addRoom} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Add Room
                    </Button>
                  </CardContent>
                </Card>

                {/* Rooms List */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Current Rooms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rooms.map((room) => (
                        <motion.div
                          key={room.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-white">{room.name}</p>
                            <p className="text-sm text-gray-400">
                              {room.type} • {room.capacity} guests • ${room.price}/night
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${getStatusColor(room.status)} text-white`}>
                              {room.status}
                            </Badge>
                            <Button size="sm" variant="outline" className="border-gray-300 bg-gray-900/80 text-gray-100 hover:bg-gray-800 hover:border-gray-400 hover:text-white">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                              onClick={() => deleteRoom(room.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reservations Tab */}
            <TabsContent value="reservations" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Reservation Management</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search reservations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-300 bg-gray-900/80 text-gray-100 hover:bg-gray-800 hover:border-gray-400 hover:text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-gray-300">Customer</th>
                          <th className="text-left py-3 px-4 text-gray-300">Room</th>
                          <th className="text-left py-3 px-4 text-gray-300">Dates</th>
                          <th className="text-left py-3 px-4 text-gray-300">Guests</th>
                          <th className="text-left py-3 px-4 text-gray-300">Amount</th>
                          <th className="text-left py-3 px-4 text-gray-300">Status</th>
                          <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((reservation) => (
                          <motion.tr
                            key={reservation.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-white">{reservation.customerName}</p>
                                <p className="text-sm text-gray-400">{reservation.customerEmail}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-white">{reservation.roomName}</td>
                            <td className="py-3 px-4">
                              <div className="text-sm">
                                <p className="text-white">{reservation.checkIn}</p>
                                <p className="text-gray-400">to {reservation.checkOut}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-white">{reservation.guests}</td>
                            <td className="py-3 px-4 text-white">${reservation.totalAmount}</td>
                            <td className="py-3 px-4">
                              <Badge className={`${getStatusColor(reservation.status)} text-white`}>
                                {reservation.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                {reservation.status === 'pending' && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                                    >
                                      <CheckCircle className="h-3 w-3" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                      onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                                    >
                                      <XCircle className="h-3 w-3" />
                                    </Button>
                                  </>
                                )}
                                <Button size="sm" variant="outline" className="border-gray-300 bg-gray-900/80 text-gray-100 hover:bg-gray-800 hover:border-gray-400 hover:text-white">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Payment Management</h2>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400">${stats.monthlyRevenue.toLocaleString()}</div>
                    <p className="text-sm text-gray-400">This month</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Pending Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-400">
                      ${reservations.filter(r => r.paymentStatus === 'pending').reduce((sum, r) => sum + r.totalAmount, 0)}
                    </div>
                    <p className="text-sm text-gray-400">
                      {reservations.filter(r => r.paymentStatus === 'pending').length} transactions
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">M-Pesa Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400">{reservations.length}</div>
                    <p className="text-sm text-gray-400">Total transactions</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{reservation.customerName}</p>
                          <p className="text-sm text-gray-400">{reservation.roomName} • {reservation.checkIn}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">${reservation.totalAmount}</p>
                          <Badge className={`${reservation.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                            {reservation.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
