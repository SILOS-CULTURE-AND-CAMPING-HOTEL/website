'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { MapPin, Phone, Mail, Users, Calendar, CreditCard, ChevronRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Silos Hotel
            </motion.div>
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Experience</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link href="#cabins" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Luxury Cabins</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Premium accommodation with modern amenities
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#activities" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Adventures</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Ziplining, canopy walks, and more
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#booking" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:text-purple-400 transition-colors">
                      Booking
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#contact" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 hover:text-purple-400 transition-colors">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link href="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-6 text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            Silos Culture
            <br />
            <span className="text-4xl md:text-6xl">& Camping Hotel</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto"
          >
            Experience luxury in nature with our premium cabins, thrilling adventures, 
            and unforgettable cultural immersion in the heart of wilderness
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4" asChild>
              <Link href="/booking">
                Reserve Your Escape
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 bg-gray-900/80 text-gray-100 hover:bg-gray-800 hover:border-gray-400 hover:text-white text-lg px-8 py-4" asChild>
              <Link href="#activities">
                Explore Activities
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section id="activities" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Premium Experiences
            </h2>
            <p className="text-xl text-gray-400">Discover our curated collection of adventures and amenities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Luxury Cabins",
                description: "Premium accommodation with modern amenities and stunning views",
                icon: "🏡",
                features: ["AC & Heating", "Mini Kitchen", "Private Bathroom", "Balcony View"]
              },
              {
                title: "Gourmet Restaurant",
                description: "Exquisite dining experience with local and international cuisine",
                icon: "🍽️",
                features: ["Fine Dining", "Local Cuisine", "Bar Service", "Room Service"]
              },
              {
                title: "Adventure Ziplining",
                description: "Thrilling zipline experience through the forest canopy",
                icon: "🌲",
                features: ["6 Ziplines", "Safety Equipment", "Guided Tours", "Photo Package"]
              },
              {
                title: "Canopy Bridge Walk",
                description: "Scenic treetop walkway with breathtaking views",
                icon: "🌉",
                features: ["300m Bridge", "Wildlife Viewing", "Sunset Tours", "Photography"]
              },
              {
                title: "Swimming Pools",
                description: "Relaxing pools for both adults and children",
                icon: "🏊",
                features: ["Adult Pool", "Kids Pool", "Pool Bar", "Lounge Areas"]
              },
              {
                title: "Kids Adventure Zone",
                description: "Exciting activities for children of all ages",
                icon: "🎈",
                features: ["Bouncing Castle", "Swings", "Camel Rides", "Quad Bikes"]
              },
              {
                title: "Archery Range",
                description: "Test your skills at our professional archery facility",
                icon: "🏹",
                features: ["Professional Equipment", "Instruction", "Targets", "Competition"]
              },
              {
                title: "Nature Trails",
                description: "Guided hiking through pristine wilderness",
                icon: "🥾",
                features: ["Marked Trails", "Wildlife Viewing", "Camping Sites", "Night Walks"]
              },
              {
                title: "Animal Orphanage",
                description: "Visit our sanctuary for rescued wildlife",
                icon: "🐊",
                features: ["Crocodiles", "Peacocks", "Quails", "Educational Tours"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    <CardDescription className="text-gray-300">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Info Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Adventure?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book online for exclusive deals or walk in for immediate availability. 
              Your perfect escape awaits!
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">Online Booking</h3>
                <p className="text-gray-400">Reserve your cabin and pre-order meals</p>
              </div>
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">Walk-in Welcome</h3>
                <p className="text-gray-400">Subject to availability</p>
              </div>
              <div className="text-center">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold mb-2">M-Pesa Payment</h3>
                <p className="text-gray-400">Secure and convenient payment</p>
              </div>
            </div>
            
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4" asChild>
              <Link href="/booking">
                Start Your Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-400">We&apos;re here to make your stay unforgettable</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <MapPin className="h-8 w-8 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-400">Silos Culture & Camping Hotel<br/>Wilderness Reserve</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Phone className="h-8 w-8 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-400">+254 XXX XXX XXX<br/>+254 XXX XXX XXX</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Mail className="h-8 w-8 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-400">info@siloshotel.com<br/>reservations@siloshotel.com</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Silos Hotel
              </h3>
              <p className="text-gray-400">
                Your premium destination for culture, adventure, and relaxation in nature.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#cabins" className="hover:text-purple-400 transition-colors">Cabins</Link></li>
                <li><Link href="#activities" className="hover:text-purple-400 transition-colors">Activities</Link></li>
                <li><Link href="/booking" className="hover:text-purple-400 transition-colors">Booking</Link></li>
                <li><Link href="#contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Restaurant</li>
                <li>Adventure Sports</li>
                <li>Wildlife Tours</li>
                <li>Event Hosting</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Operating Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Restaurant: 6AM - 10PM</li>
                <li>Activities: 8AM - 6PM</li>
                <li>Reception: 24/7</li>
                <li>Emergency: 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Silos Culture & Camping Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
