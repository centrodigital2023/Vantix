export interface Municipality {
  name: string
  region: string
  description: string
  attractions: string[]
  activities: string[]
  altitude: string
  climate: string
}

export const narinoMunicipalities: Municipality[] = [
  {
    name: "Pasto",
    region: "Centro",
    description: "Capital del departamento, famosa por su Carnaval de Negros y Blancos",
    attractions: ["Centro Histórico", "Laguna de La Cocha", "Volcán Galeras", "Museo del Oro", "Plaza del Carnaval"],
    activities: ["City tours", "Gastronomía", "Artesanías", "Carnaval"],
    altitude: "2,527 msnm",
    climate: "Templado-frío (8-17°C)"
  },
  {
    name: "Ipiales",
    region: "Ex-Provincia de Obando",
    description: "Ciudad fronteriza con Ecuador, hogar del Santuario de Las Lajas",
    attractions: ["Santuario de Las Lajas", "Puente Internacional Rumichaca", "Laguna Verde", "Centro de Ipiales"],
    activities: ["Peregrinación religiosa", "Comercio", "Fotografía", "Turismo fronterizo"],
    altitude: "2,898 msnm",
    climate: "Frío (5-14°C)"
  },
  {
    name: "Tumaco",
    region: "Costa Pacífica",
    description: "Puerto del Pacífico con playas vírgenes y cultura afro",
    attractions: ["Playa El Morro", "Bocagrande", "Isla del Morro", "Manglares", "Playas vírgenes"],
    activities: ["Playa", "Surf", "Gastronomía de mar", "Avistamiento de ballenas", "Cultura afro"],
    altitude: "2 msnm",
    climate: "Cálido-húmedo (24-30°C)"
  },
  {
    name: "Túquerres",
    region: "Ex-Provincia de Obando",
    description: "Ciudad ganadera con clima cálido y tradición agrícola",
    attractions: ["Parque Principal", "Iglesia de San José", "Fincas cafeteras", "Mirador Atrio"],
    activities: ["Turismo rural", "Agroturismo", "Gastronomía", "Descanso"],
    altitude: "3,053 msnm",
    climate: "Templado (12-18°C)"
  },
  {
    name: "Sandoná",
    region: "Centro",
    description: "Capital artesanal del sombrero pintado a mano",
    attractions: ["Talleres de sombreros", "Iglesia colonial", "Plaza principal", "Miradores"],
    activities: ["Artesanías", "Talleres", "Compras", "Cultura"],
    altitude: "1,820 msnm",
    climate: "Cálido (18-26°C)"
  },
  {
    name: "La Cruz",
    region: "Centro",
    description: "Pueblo tradicional con arquitectura colonial",
    attractions: ["Iglesia colonial", "Parque principal", "Casas de bahareque"],
    activities: ["Turismo cultural", "Fotografía", "Gastronomía"],
    altitude: "1,870 msnm",
    climate: "Templado (16-24°C)"
  },
  {
    name: "Barbacoas",
    region: "Costa Pacífica",
    description: "Pueblo minero en la selva del Pacífico",
    attractions: ["Río Telembí", "Selva", "Minas artesanales", "Cultura afro"],
    activities: ["Ecoturismo", "Ríos", "Cultura", "Aventura"],
    altitude: "60 msnm",
    climate: "Cálido-húmedo (24-30°C)"
  },
  {
    name: "Cumbal",
    region: "Ex-Provincia de Obando",
    description: "Resguardo indígena con volcán y lagunas",
    attractions: ["Volcán Cumbal", "Lagunas de Cumbal", "Cultura Pastos", "Páramos"],
    activities: ["Trekking", "Cultura indígena", "Naturaleza", "Páramos"],
    altitude: "3,100 msnm",
    climate: "Frío de páramo (2-12°C)"
  },
  {
    name: "Ricaurte",
    region: "Ex-Provincia de Obando",
    description: "Pueblo agrícola cerca de Tumaco",
    attractions: ["Termas naturales", "Paisajes rurales", "Fincas"],
    activities: ["Descanso", "Aguas termales", "Turismo rural"],
    altitude: "1,500 msnm",
    climate: "Templado-cálido (18-25°C)"
  },
  {
    name: "Mallama",
    region: "Ex-Provincia de Obando",
    description: "Pueblo de piedra con arquitectura única",
    attractions: ["Piedra de Mallama", "Iglesia colonial", "Paisajes andinos"],
    activities: ["Trekking", "Fotografía", "Cultura"],
    altitude: "2,400 msnm",
    climate: "Templado-frío (10-18°C)"
  }
]

export const narinoRegions = {
  centro: ["Pasto", "Sandoná", "La Cruz", "Buesaco", "Chachagüí"],
  obando: ["Ipiales", "Túquerres", "Cumbal", "Mallama", "Ricaurte"],
  pacifico: ["Tumaco", "Barbacoas", "Francisco Pizarro", "Mosquera", "El Charco"],
  cordillera: ["La Florida", "Nariño", "Tangua", "Yacuanquer"],
  sabana: ["Pupiales", "Gualmatán", "Aldana", "Contadero"]
}

export const topAttractions = [
  {
    name: "Santuario de Las Lajas",
    municipality: "Ipiales",
    description: "Basílica gótica construida sobre un cañón, una de las iglesias más hermosas del mundo",
    type: "Religioso",
    imageKeywords: "Las Lajas sanctuary church canyon Colombia"
  },
  {
    name: "Laguna de La Cocha",
    municipality: "Pasto",
    description: "Segunda laguna más grande de Colombia con la Isla de La Corota",
    type: "Naturaleza",
    imageKeywords: "Laguna Cocha lake Colombia Nariño"
  },
  {
    name: "Volcán Galeras",
    municipality: "Pasto",
    description: "Volcán activo que domina el paisaje de Pasto",
    type: "Naturaleza",
    imageKeywords: "Galeras volcano Colombia Pasto"
  },
  {
    name: "Carnaval de Negros y Blancos",
    municipality: "Pasto",
    description: "Patrimonio de la Humanidad UNESCO, el carnaval más grande del sur de Colombia",
    type: "Cultura",
    imageKeywords: "Carnaval Negros Blancos Pasto Colombia parade"
  },
  {
    name: "Playas de Tumaco",
    municipality: "Tumaco",
    description: "Playas vírgenes del Pacífico con cultura afro",
    type: "Playa",
    imageKeywords: "Tumaco beach Pacific Colombia"
  },
  {
    name: "Volcán Azufral y Laguna Verde",
    municipality: "Túquerres",
    description: "Laguna turquesa dentro del cráter del volcán",
    type: "Naturaleza",
    imageKeywords: "Azufral volcano green lagoon Colombia"
  }
]
