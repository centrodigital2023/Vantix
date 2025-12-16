import { Accommodation } from '@/lib/types'

export const generateSampleAccommodations = (): Accommodation[] => {
  return [
    {
      id: 'hotel-cartagena-1',
      name: 'Hotel Boutique Casa del Arzobispado',
      type: 'hotel',
      category: 'Cultural',
      region: 'Caribe',
      city: 'Cartagena',
      department: 'Bolívar',
      description: 'Elegante hotel boutique en el corazón del centro histórico de Cartagena. Ubicado en una casona colonial del siglo XVII completamente restaurada, ofrece una experiencia única que combina historia, lujo y confort moderno. A pocos pasos de la Plaza de Bolívar y la Catedral.',
      images: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 520000,
      rating: 9.2,
      reviewCount: 342,
      featured: true,
      latitude: 10.4236,
      longitude: -75.5450,
      amenities: ['WiFi', 'Aire acondicionado', 'Desayuno incluido', 'Piscina', 'Bar', 'Terraza', 'Room service', 'Conserjería'],
      roomTypes: [
        {
          id: 'room-1',
          name: 'Habitación Deluxe',
          description: 'Habitación espaciosa con cama king size y vista al patio colonial',
          maxGuests: 2,
          bedType: 'Cama King',
          pricePerNight: 520000,
          images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['Aire acondicionado', 'WiFi', 'TV', 'Minibar'],
          available: 3
        },
        {
          id: 'room-2',
          name: 'Suite Junior',
          description: 'Suite con sala de estar separada y balcón privado',
          maxGuests: 2,
          bedType: 'Cama King',
          pricePerNight: 780000,
          images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['Aire acondicionado', 'WiFi', 'TV', 'Minibar', 'Jacuzzi'],
          available: 2
        }
      ],
      policies: {
        checkIn: '15:00 - 22:00',
        checkOut: '11:00',
        cancellation: 'Cancelación gratuita hasta 24 horas antes de la llegada',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 5 664 2345',
        email: 'info@hotelarzobispado.com',
        website: 'https://hotelarzobispado.com'
      },
      availability: {}
    },
    {
      id: 'resort-santa-marta-1',
      name: 'Irotama Resort Santa Marta',
      type: 'resort',
      category: 'Playa',
      region: 'Caribe',
      city: 'Santa Marta',
      department: 'Magdalena',
      description: 'Resort todo incluido frente al mar con amplias instalaciones. Perfecto para familias y parejas que buscan disfrutar del sol, la playa y múltiples actividades recreativas. Cuenta con 3 piscinas, acceso directo a playa privada, spa y programación de entretenimiento.',
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 680000,
      rating: 8.8,
      reviewCount: 1205,
      featured: true,
      latitude: 11.2408,
      longitude: -74.1990,
      amenities: ['WiFi', 'Piscina', 'Playa privada', 'Spa', 'Gimnasio', 'Restaurantes', 'Bar', 'Todo incluido', 'Estacionamiento'],
      roomTypes: [
        {
          id: 'room-3',
          name: 'Habitación Vista Jardín',
          description: 'Amplia habitación con vista a jardines tropicales',
          maxGuests: 3,
          bedType: '2 Camas Dobles',
          pricePerNight: 680000,
          images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['Aire acondicionado', 'WiFi', 'TV', 'Balcón', 'Caja fuerte'],
          available: 8
        },
        {
          id: 'room-4',
          name: 'Suite Vista al Mar',
          description: 'Suite de lujo con vista panorámica al Caribe',
          maxGuests: 4,
          bedType: 'Cama King + Sofá cama',
          pricePerNight: 980000,
          images: ['https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['Aire acondicionado', 'WiFi', 'TV', 'Balcón', 'Jacuzzi', 'Minibar'],
          available: 4
        }
      ],
      policies: {
        checkIn: '15:00',
        checkOut: '12:00',
        cancellation: 'Cancelación gratuita hasta 48 horas antes',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 5 438 4000',
        email: 'reservas@irotama.com'
      },
      availability: {}
    },
    {
      id: 'hostel-medellin-1',
      name: 'El Poblado Hostel Medellín',
      type: 'hostel',
      category: 'Aventura',
      region: 'Andina',
      city: 'Medellín',
      department: 'Antioquia',
      description: 'Hostel moderno y social en El Poblado, el barrio más trendy de Medellín. Perfecto para viajeros jóvenes que buscan conocer gente, disfrutar de la vida nocturna y explorar la ciudad de la eterna primavera. Ambiente internacional con actividades diarias.',
      images: [
        'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/239975/pexels-photo-239975.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 55000,
      rating: 8.6,
      reviewCount: 567,
      featured: false,
      latitude: 6.2092,
      longitude: -75.5677,
      amenities: ['WiFi', 'Cocina compartida', 'Bar', 'Terraza', 'Tours', 'Área social', 'Lockers', 'Lavandería'],
      roomTypes: [
        {
          id: 'room-5',
          name: 'Cama en Dormitorio Compartido',
          description: 'Cama en dormitorio de 6 personas con baño compartido',
          maxGuests: 1,
          bedType: 'Cama individual',
          pricePerNight: 55000,
          images: ['https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Locker', 'Ventilador', 'Enchufes'],
          available: 12
        },
        {
          id: 'room-6',
          name: 'Habitación Privada',
          description: 'Habitación privada con baño compartido',
          maxGuests: 2,
          bedType: 'Cama Doble',
          pricePerNight: 135000,
          images: ['https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Ventilador', 'Escritorio'],
          available: 3
        }
      ],
      policies: {
        checkIn: '14:00 - 23:00',
        checkOut: '11:00',
        cancellation: 'Cancelación gratuita hasta 72 horas antes',
        childrenAllowed: false,
        petsAllowed: false
      },
      contact: {
        phone: '+57 4 311 2345',
        email: 'info@elpobladohostel.com'
      },
      availability: {}
    },
    {
      id: 'cabin-eje-cafetero-1',
      name: 'Cabaña del Café - Finca Cafetera',
      type: 'cabin',
      category: 'Rural',
      region: 'Andina',
      city: 'Salento',
      department: 'Quindío',
      description: 'Acogedora cabaña en medio de una finca cafetera tradicional. Vive la experiencia del café colombiano desde adentro: recorre los cultivos, aprende el proceso y disfruta de la tranquilidad de la montaña. Vista al Valle de Cocora y sus palmas de cera.',
      images: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 320000,
      rating: 9.5,
      reviewCount: 189,
      featured: true,
      latitude: 4.6389,
      longitude: -75.5706,
      amenities: ['WiFi', 'Cocina equipada', 'Chimenea', 'Terraza', 'BBQ', 'Estacionamiento', 'Tour de café', 'Desayuno'],
      roomTypes: [
        {
          id: 'room-7',
          name: 'Cabaña Completa',
          description: 'Cabaña entera con 2 habitaciones, cocina y sala',
          maxGuests: 6,
          bedType: '1 King + 2 Dobles',
          pricePerNight: 320000,
          images: ['https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['Cocina', 'Chimenea', 'WiFi', 'BBQ', 'Terraza'],
          available: 1
        }
      ],
      policies: {
        checkIn: '14:00 - 18:00',
        checkOut: '11:00',
        cancellation: 'Cancelación gratuita hasta 7 días antes',
        childrenAllowed: true,
        petsAllowed: true
      },
      contact: {
        phone: '+57 6 759 3456',
        email: 'reservas@cabanadelcafe.com'
      },
      availability: {}
    },
    {
      id: 'hotel-bogota-1',
      name: 'Hotel Casa Deco',
      type: 'hotel',
      category: 'Negocios',
      region: 'Andina',
      city: 'Bogotá',
      department: 'Cundinamarca',
      description: 'Hotel boutique en la Zona T, ideal para viajeros de negocios y turismo. Combina diseño art deco con tecnología moderna. Ubicación privilegiada cerca de centros empresariales, restaurantes gourmet y vida nocturna.',
      images: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 380000,
      rating: 8.9,
      reviewCount: 423,
      featured: false,
      latitude: 4.6700,
      longitude: -74.0548,
      amenities: ['WiFi', 'Centro de negocios', 'Gimnasio', 'Restaurante', 'Bar', 'Room service', 'Estacionamiento', 'Servicio de lavandería'],
      roomTypes: [
        {
          id: 'room-8',
          name: 'Habitación Ejecutiva',
          description: 'Habitación moderna con escritorio y zona de trabajo',
          maxGuests: 2,
          bedType: 'Cama King',
          pricePerNight: 380000,
          images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Escritorio', 'TV', 'Minibar', 'Caja fuerte'],
          available: 6
        },
        {
          id: 'room-9',
          name: 'Suite Business',
          description: 'Suite con sala de reuniones y oficina privada',
          maxGuests: 2,
          bedType: 'Cama King',
          pricePerNight: 600000,
          images: ['https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Oficina', 'TV', 'Minibar', 'Cafetera Nespresso'],
          available: 2
        }
      ],
      policies: {
        checkIn: '15:00',
        checkOut: '13:00',
        cancellation: 'Cancelación gratuita hasta 24 horas antes',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 1 742 8900',
        email: 'reservas@casadeco.com'
      },
      availability: {}
    },
    {
      id: 'hotel-pasto-1',
      name: 'Hotel Don Saúl',
      type: 'hotel',
      category: 'Cultural',
      region: 'Andina',
      city: 'Pasto',
      department: 'Nariño',
      description: 'Hotel tradicional en el centro de Pasto, cerca del Museo del Carnaval y la Catedral. Ideal para explorar la cultura pastusa y disfrutar de la gastronomía local. Ambiente acogedor con servicio personalizado y habitaciones confortables.',
      images: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 220000,
      rating: 8.7,
      reviewCount: 287,
      featured: false,
      latitude: 1.2136,
      longitude: -77.2811,
      amenities: ['WiFi', 'Restaurante', 'Estacionamiento', 'Room service', 'Bar', 'Recepción 24h'],
      roomTypes: [
        {
          id: 'room-pasto-1',
          name: 'Habitación Estándar',
          description: 'Habitación acogedora con vista a la ciudad',
          maxGuests: 2,
          bedType: 'Cama Doble',
          pricePerNight: 220000,
          images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'TV', 'Baño privado', 'Agua caliente'],
          available: 8
        },
        {
          id: 'room-pasto-2',
          name: 'Suite Ejecutiva',
          description: 'Suite amplia con escritorio y sala de estar',
          maxGuests: 3,
          bedType: 'Cama King',
          pricePerNight: 340000,
          images: ['https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'TV', 'Minibar', 'Escritorio', 'Balcón'],
          available: 4
        }
      ],
      policies: {
        checkIn: '14:00 - 22:00',
        checkOut: '12:00',
        cancellation: 'Cancelación gratuita hasta 24 horas antes',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 2 723 4567',
        email: 'info@hoteldonsaul.com'
      },
      availability: {}
    },
    {
      id: 'hotel-ipiales-1',
      name: 'Hotel Las Lajas',
      type: 'hotel',
      category: 'Religioso',
      region: 'Andina',
      city: 'Ipiales',
      department: 'Nariño',
      description: 'Hotel ubicado a pocos minutos del famoso Santuario de Las Lajas. Perfecto para peregrinos y turistas que visitan este emblemático lugar. Ofrece servicios especiales para tours religiosos y transporte al santuario.',
      images: [
        'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 150000,
      rating: 8.4,
      reviewCount: 412,
      featured: false,
      latitude: 0.8293,
      longitude: -77.6423,
      amenities: ['WiFi', 'Restaurante', 'Estacionamiento', 'Tours', 'Capilla', 'Transporte al santuario'],
      roomTypes: [
        {
          id: 'room-ipiales-1',
          name: 'Habitación Sencilla',
          description: 'Habitación cómoda para descansar',
          maxGuests: 2,
          bedType: 'Cama Doble',
          pricePerNight: 150000,
          images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'TV', 'Baño privado'],
          available: 12
        },
        {
          id: 'room-ipiales-2',
          name: 'Habitación Familiar',
          description: 'Amplia habitación para familias',
          maxGuests: 4,
          bedType: '2 Camas Dobles',
          pricePerNight: 240000,
          images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'TV', 'Baño privado', 'Espacio amplio'],
          available: 6
        }
      ],
      policies: {
        checkIn: '13:00 - 21:00',
        checkOut: '11:00',
        cancellation: 'Cancelación gratuita hasta 48 horas antes',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 2 773 2345',
        email: 'reservas@hotellaslajas.com'
      },
      availability: {}
    },
    {
      id: 'hotel-tumaco-1',
      name: 'Hotel Pacífico Royal',
      type: 'hotel',
      category: 'Playa',
      region: 'Pacífica',
      city: 'Tumaco',
      department: 'Nariño',
      description: 'Hotel frente al mar en el puerto de Tumaco. Disfruta de las playas del Pacífico, gastronomía de mar fresca y la cultura afro del litoral. Ideal para quienes buscan autenticidad y naturaleza.',
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 180000,
      rating: 8.1,
      reviewCount: 198,
      featured: false,
      latitude: 1.8070,
      longitude: -78.7645,
      amenities: ['WiFi', 'Restaurante', 'Playa', 'Bar', 'Tours de pesca', 'Transporte'],
      roomTypes: [
        {
          id: 'room-tumaco-1',
          name: 'Habitación Vista al Mar',
          description: 'Habitación con balcón y vista al Pacífico',
          maxGuests: 2,
          bedType: 'Cama Doble',
          pricePerNight: 180000,
          images: ['https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Ventilador', 'Balcón', 'Vista al mar'],
          available: 10
        },
        {
          id: 'room-tumaco-2',
          name: 'Suite Playa',
          description: 'Suite amplia frente al mar',
          maxGuests: 4,
          bedType: 'Cama King + Sofá cama',
          pricePerNight: 290000,
          images: ['https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Aire acondicionado', 'Balcón amplio', 'Mini cocina'],
          available: 3
        }
      ],
      policies: {
        checkIn: '14:00 - 20:00',
        checkOut: '12:00',
        cancellation: 'Cancelación gratuita hasta 48 horas antes',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 2 727 8900',
        email: 'info@pacifico-royal.com'
      },
      availability: {}
    }
  ]
}
