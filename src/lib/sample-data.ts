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
      pricePerNight: 550000,
      rating: 9.3,
      reviewCount: 387,
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
          pricePerNight: 550000,
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
          pricePerNight: 820000,
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
      pricePerNight: 720000,
      rating: 8.9,
      reviewCount: 1342,
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
          pricePerNight: 720000,
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
          pricePerNight: 1050000,
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
      pricePerNight: 60000,
      rating: 8.7,
      reviewCount: 623,
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
          pricePerNight: 60000,
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
          pricePerNight: 145000,
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
      pricePerNight: 340000,
      rating: 9.6,
      reviewCount: 218,
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
          pricePerNight: 340000,
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
      pricePerNight: 410000,
      rating: 9.0,
      reviewCount: 478,
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
          pricePerNight: 410000,
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
          pricePerNight: 640000,
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
      pricePerNight: 235000,
      rating: 8.8,
      reviewCount: 314,
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
          pricePerNight: 235000,
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
      pricePerNight: 165000,
      rating: 8.5,
      reviewCount: 456,
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
          pricePerNight: 165000,
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
      pricePerNight: 195000,
      rating: 8.3,
      reviewCount: 234,
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
          pricePerNight: 195000,
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
    },
    {
      id: 'spa-villa-de-leyva-1',
      name: 'Spa & Wellness El Santuario',
      type: 'hotel',
      category: 'Bienestar',
      region: 'Andina',
      city: 'Villa de Leyva',
      department: 'Boyacá',
      description: 'Exclusivo hotel spa en las afueras de Villa de Leyva. Especializado en bienestar holístico con tratamientos de spa, yoga, meditación y alimentación consciente. Rodeado de naturaleza y tranquilidad absoluta.',
      images: [
        'https://images.pexels.com/photos/3757949/pexels-photo-3757949.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1634278/pexels-photo-1634278.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 480000,
      rating: 9.4,
      reviewCount: 156,
      featured: true,
      latitude: 5.6339,
      longitude: -73.5256,
      amenities: ['WiFi', 'Spa', 'Yoga', 'Piscina', 'Sauna', 'Masajes', 'Restaurante orgánico', 'Jardines'],
      roomTypes: [
        {
          id: 'room-spa-1',
          name: 'Habitación Zen',
          description: 'Habitación minimalista con vista a los jardines',
          maxGuests: 2,
          bedType: 'Cama King',
          pricePerNight: 480000,
          images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Aromaterapia', 'Terraza privada', 'Baño de lujo'],
          available: 5
        }
      ],
      policies: {
        checkIn: '15:00 - 20:00',
        checkOut: '12:00',
        cancellation: 'Cancelación gratuita hasta 72 horas antes',
        childrenAllowed: false,
        petsAllowed: false
      },
      contact: {
        phone: '+57 8 732 5678',
        email: 'reservas@elsantuario.com'
      },
      availability: {}
    },
    {
      id: 'hostel-cali-1',
      name: 'Viajero Hostel Cali',
      type: 'hostel',
      category: 'Gastronomía',
      region: 'Pacífica',
      city: 'Cali',
      department: 'Valle del Cauca',
      description: 'Hostel vibrante en el corazón de Cali, la capital de la salsa. Ambiente festivo con clases de baile, tours gastronómicos y fiesta en el rooftop. Ideal para conocer la cultura caleña y la mejor comida del Valle.',
      images: [
        'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/239975/pexels-photo-239975.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 48000,
      rating: 8.8,
      reviewCount: 789,
      featured: false,
      latitude: 3.4516,
      longitude: -76.5320,
      amenities: ['WiFi', 'Clases de salsa', 'Bar', 'Cocina', 'Rooftop', 'Tours', 'Lavandería'],
      roomTypes: [
        {
          id: 'room-cali-1',
          name: 'Cama en Dormitorio Mixto',
          description: 'Cama en dormitorio de 8 personas',
          maxGuests: 1,
          bedType: 'Cama individual',
          pricePerNight: 48000,
          images: ['https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Locker', 'Aire acondicionado'],
          available: 16
        }
      ],
      policies: {
        checkIn: '14:00 - 23:00',
        checkOut: '11:00',
        cancellation: 'Cancelación gratuita hasta 48 horas antes',
        childrenAllowed: false,
        petsAllowed: false
      },
      contact: {
        phone: '+57 2 893 4567',
        email: 'cali@viajerohostel.com'
      },
      availability: {}
    },
    {
      id: 'lodge-amazonas-1',
      name: 'Amazon Jungle Lodge',
      type: 'cabin',
      category: 'Naturaleza',
      region: 'Amazonia',
      city: 'Leticia',
      department: 'Amazonas',
      description: 'Lodge ecológico en plena selva amazónica. Experiencia inmersiva con guías nativos, avistamiento de fauna, navegación por el río Amazonas y convivencia con comunidades indígenas. Aventura auténtica en el pulmón del mundo.',
      images: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 280000,
      rating: 9.1,
      reviewCount: 92,
      featured: true,
      latitude: -4.2152,
      longitude: -69.9406,
      amenities: ['Tours selva', 'Comida incluida', 'Guías nativos', 'Transporte fluvial', 'Mosquitero', 'Observación fauna'],
      roomTypes: [
        {
          id: 'room-amazonas-1',
          name: 'Cabaña Selvática',
          description: 'Cabaña rústica con vista al río',
          maxGuests: 2,
          bedType: 'Cama Doble',
          pricePerNight: 280000,
          images: ['https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['Mosquitero', 'Ventilador', 'Baño compartido', 'Hamaca'],
          available: 6
        }
      ],
      policies: {
        checkIn: '12:00 - 18:00',
        checkOut: '10:00',
        cancellation: 'Cancelación gratuita hasta 7 días antes',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 8 592 3456',
        email: 'info@amazonlodge.com'
      },
      availability: {}
    },
    {
      id: 'hotel-san-andres-1',
      name: 'Decameron Aquarium',
      type: 'resort',
      category: 'Playa',
      region: 'Insular',
      city: 'San Andrés',
      department: 'San Andrés y Providencia',
      description: 'Resort todo incluido frente al mar de los siete colores. Buceo, snorkel, deportes acuáticos y entretenimiento para toda la familia. Disfruta del paraíso caribeño con todas las comodidades.',
      images: [
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 850000,
      rating: 8.6,
      reviewCount: 1567,
      featured: true,
      latitude: 12.5847,
      longitude: -81.7006,
      amenities: ['WiFi', 'Todo incluido', 'Playa privada', 'Piscinas', 'Buceo', 'Spa', 'Restaurantes', 'Shows nocturnos'],
      roomTypes: [
        {
          id: 'room-sanandres-1',
          name: 'Habitación Superior Vista Mar',
          description: 'Habitación con balcón y vista al Caribe',
          maxGuests: 3,
          bedType: '2 Camas Dobles',
          pricePerNight: 850000,
          images: ['https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['Aire acondicionado', 'WiFi', 'TV', 'Minibar', 'Balcón'],
          available: 15
        }
      ],
      policies: {
        checkIn: '15:00',
        checkOut: '12:00',
        cancellation: 'Cancelación gratuita hasta 72 horas antes',
        childrenAllowed: true,
        petsAllowed: false
      },
      contact: {
        phone: '+57 8 512 5555',
        email: 'reservas@decameron.com'
      },
      availability: {}
    },
    {
      id: 'hotel-pereira-1',
      name: 'Hotel Movich Pereira',
      type: 'hotel',
      category: 'Negocios',
      region: 'Andina',
      city: 'Pereira',
      department: 'Risaralda',
      description: 'Moderno hotel de negocios en el centro comercial de Pereira. Salas de conferencias, centro de negocios y ubicación estratégica para eventos corporativos. Comodidad y profesionalismo en el eje cafetero.',
      images: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
      ],
      pricePerNight: 360000,
      rating: 8.9,
      reviewCount: 512,
      featured: false,
      latitude: 4.8133,
      longitude: -75.6961,
      amenities: ['WiFi', 'Centro de negocios', 'Salas de conferencias', 'Restaurante', 'Gimnasio', 'Estacionamiento'],
      roomTypes: [
        {
          id: 'room-pereira-1',
          name: 'Habitación Ejecutiva',
          description: 'Habitación con escritorio y zona de trabajo',
          maxGuests: 2,
          bedType: 'Cama King',
          pricePerNight: 360000,
          images: ['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'],
          amenities: ['WiFi', 'Escritorio', 'TV', 'Minibar', 'Cafetera'],
          available: 8
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
        phone: '+57 6 335 5555',
        email: 'pereira@movich.com'
      },
      availability: {}
    }
  ]
}
