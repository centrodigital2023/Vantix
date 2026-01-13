export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  readTime: number
  tags: string[]
}

export interface Article {
  id: string
  title: string
  subtitle: string
  content: string
  image: string
  author: string
  date: string
  category: string
  readTime: number
  tags: string[]
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  source: string
  category: string
}

const blogTopics = [
  { category: 'Guías', theme: 'destinos turísticos colombianos', focus: 'guía práctica de viaje' },
  { category: 'Gastronomía', theme: 'comida colombiana y experiencias culinarias', focus: 'restaurantes y platos típicos' },
  { category: 'Aventura', theme: 'actividades extremas y deportes de aventura en Colombia', focus: 'experiencias de adrenalina' },
  { category: 'Cultura', theme: 'patrimonio cultural y tradiciones colombianas', focus: 'historia y costumbres locales' },
  { category: 'Naturaleza', theme: 'parques naturales y ecoturismo en Colombia', focus: 'biodiversidad y conservación' },
  { category: 'Tips', theme: 'consejos prácticos para viajar por Colombia', focus: 'ahorro y planificación' },
  { category: 'Familia', theme: 'viajes en familia por Colombia', focus: 'actividades para niños' },
  { category: 'Bienestar', theme: 'turismo de bienestar y spa en Colombia', focus: 'relajación y salud' }
]

const articleTopics = [
  { category: 'Guías de Destinos', focus: 'información detallada de lugares turísticos' },
  { category: 'Tips de Viaje', focus: 'consejos prácticos de viajeros experimentados' },
  { category: 'Crónicas de Viajeros', focus: 'historias personales de viajes' },
  { category: 'Fotografía de Viajes', focus: 'técnicas y lugares fotogénicos' },
  { category: 'Cultura Local', focus: 'tradiciones y costumbres regionales' },
  { category: 'Viajes Sustentables', focus: 'turismo responsable y ecológico' }
]

const newsTopics = [
  { category: 'Actualidad Nacional', focus: 'políticas y desarrollo turístico en Colombia' },
  { category: 'Tendencias de Viaje', focus: 'nuevos comportamientos y preferencias de viajeros' },
  { category: 'Nuevas Rutas y Vuelos', focus: 'aerolíneas y conectividad aérea' },
  { category: 'Destinos en Foco', focus: 'lugares emergentes en el turismo colombiano' },
  { category: 'Normativas y Requisitos', focus: 'regulaciones y documentación de viaje' },
  { category: 'Eventos y Ferias', focus: 'actividades del sector turístico' }
]

const colombianCities = [
  'Bogotá', 'Medellín', 'Cali', 'Cartagena', 'Barranquilla', 'Santa Marta',
  'San Andrés', 'Villa de Leyva', 'Salento', 'Guatapé', 'Pasto', 'Popayán',
  'Manizales', 'Pereira', 'Bucaramanga', 'Cúcuta', 'Valledupar', 'Barichara'
]

const authors = [
  'Laura Martínez', 'Carlos Gómez', 'Ana Rodríguez', 'Juan Pérez',
  'María García', 'Diego López', 'Sofía Torres', 'Andrés Ramírez',
  'Camila Sánchez', 'Daniel Herrera', 'Valentina Cruz', 'Santiago Morales'
]

export async function generateBlogPosts(count: number = 12): Promise<BlogPost[]> {
  const posts: BlogPost[] = []
  
  for (let i = 0; i < count; i++) {
    const topic = blogTopics[i % blogTopics.length]
    const city = colombianCities[Math.floor(Math.random() * colombianCities.length)]
    
    const prompt = window.spark.llmPrompt`Genera un artículo de blog sobre turismo en Colombia. 
    
Tema: ${topic.theme}
Categoría: ${topic.category}
Enfoque: ${topic.focus}
Ciudad o destino: ${city}

El artículo debe:
1. Tener un título atractivo y específico (máximo 80 caracteres)
2. Un extracto de 120-150 caracteres que enganche al lector
3. Contenido completo de 800-1000 palabras dividido en secciones
4. Tono inspirador pero práctico, como si lo escribiera un viajero experimentado
5. Incluir consejos específicos y recomendaciones reales
6. 5 tags relacionados con el contenido

Responde en formato JSON con esta estructura:
{
  "title": "título del artículo",
  "excerpt": "extracto breve",
  "content": "contenido completo en formato markdown con secciones ## y párrafos",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`

    try {
      const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const parsed = JSON.parse(result)
      
      posts.push({
        id: `blog-${Date.now()}-${i}`,
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        image: `https://images.unsplash.com/photo-${getRandomUnsplashId()}?w=1200&h=600&fit=crop`,
        author: authors[Math.floor(Math.random() * authors.length)],
        date: getRandomDate(),
        category: topic.category,
        readTime: Math.floor(Math.random() * 8) + 5,
        tags: parsed.tags
      })
    } catch (error) {
      console.error('Error generating blog post:', error)
    }
  }
  
  return posts
}

export async function generateArticles(count: number = 12): Promise<Article[]> {
  const articles: Article[] = []
  
  for (let i = 0; i < count; i++) {
    const topic = articleTopics[i % articleTopics.length]
    const city = colombianCities[Math.floor(Math.random() * colombianCities.length)]
    
    const prompt = window.spark.llmPrompt`Genera un artículo profundo sobre viajes en Colombia.

Categoría: ${topic.category}
Enfoque: ${topic.focus}
Destino: ${city}

El artículo debe:
1. Título impactante (máximo 80 caracteres)
2. Subtítulo descriptivo (máximo 120 caracteres)
3. Contenido extenso de 1200-1500 palabras con secciones claras
4. Tono narrativo y personal, como una historia de viajero
5. Información práctica mezclada con anécdotas
6. 5 tags relacionados

Responde en formato JSON:
{
  "title": "título principal",
  "subtitle": "subtítulo descriptivo",
  "content": "contenido completo en markdown con secciones ##",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`

    try {
      const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const parsed = JSON.parse(result)
      
      articles.push({
        id: `article-${Date.now()}-${i}`,
        title: parsed.title,
        subtitle: parsed.subtitle,
        content: parsed.content,
        image: `https://images.unsplash.com/photo-${getRandomUnsplashId()}?w=1200&h=800&fit=crop`,
        author: authors[Math.floor(Math.random() * authors.length)],
        date: getRandomDate(),
        category: topic.category,
        readTime: Math.floor(Math.random() * 12) + 8,
        tags: parsed.tags
      })
    } catch (error) {
      console.error('Error generating article:', error)
    }
  }
  
  return articles
}

export async function generateNews(count: number = 10): Promise<NewsItem[]> {
  const news: NewsItem[] = []
  
  for (let i = 0; i < count; i++) {
    const topic = newsTopics[i % newsTopics.length]
    
    const prompt = window.spark.llmPrompt`Genera una noticia actual sobre turismo en Colombia.

Categoría: ${topic.category}
Enfoque: ${topic.focus}

La noticia debe:
1. Título periodístico conciso (máximo 100 caracteres)
2. Extracto de 150 caracteres
3. Contenido de 400-600 palabras estilo periodístico
4. Información objetiva y actual
5. Datos y cifras cuando sea relevante

Responde en formato JSON:
{
  "title": "título de la noticia",
  "excerpt": "extracto breve",
  "content": "contenido completo en markdown"
}`

    try {
      const result = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const parsed = JSON.parse(result)
      
      news.push({
        id: `news-${Date.now()}-${i}`,
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        image: `https://images.unsplash.com/photo-${getRandomUnsplashId()}?w=1200&h=600&fit=crop`,
        date: getRecentDate(),
        source: 'SendAI Turismo',
        category: topic.category
      })
    } catch (error) {
      console.error('Error generating news:', error)
    }
  }
  
  return news
}

function getRandomUnsplashId(): string {
  const colombiaPhotoIds = [
    '1589394815804-964ed0be2eb5',
    '1495474472287-4d71bcdd2085',
    '1527004013197-933c4bb611b3',
    '1519677100203-a0e668c92439',
    '1506905925346-21bda4d32df4',
    '1548013146-72479d38ed46',
    '1564507592333-c60657eea523',
    '1476514525535-07fb3b4ae5f1',
    '1518548419970-58e3b4079ab2',
    '1551918120-9739cb430c6d'
  ]
  return colombiaPhotoIds[Math.floor(Math.random() * colombiaPhotoIds.length)]
}

function getRandomDate(): string {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const month = months[Math.floor(Math.random() * 3) + 9]
  const day = Math.floor(Math.random() * 28) + 1
  return `${day} de ${month}, 2024`
}

function getRecentDate(): string {
  const daysAgo = Math.floor(Math.random() * 30)
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`
}
