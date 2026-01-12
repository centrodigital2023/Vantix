# PRESTADORES DE SERVICIOS - SENDAI S.A.S.

## 🎯 OBJETIVO DEL MÓDULO

Permitir que prestadores de servicios turísticos:
- Publiquen servicios (Transporte • Tours • Atracciones • Experiencias • Guías)
- Reciban reservas y pagos
- Cumplan normativa legal colombiana
- Sean optimizados por IA

**Sin que SENDAI asuma responsabilidad operativa.**

---

## 🧭 ROLES Y PERMISOS

| Rol | Permisos |
|-----|----------|
| **Turista** | Explorar sin registro / Reservar con registro |
| **Prestador** | Crear y gestionar servicios |
| **SuperAdmin** | Aprobar, auditar, suspender |

---

## 📋 CATEGORÍAS DE SERVICIO

Selector obligatorio (cards visuales):

1. 🚐 **Transporte turístico**
2. 🗺️ **Tours guiados**
3. 🎢 **Atracciones**
4. 🌿 **Experiencias** (café, caminatas, cultura)
5. 🧑‍🏫 **Guías turísticos**
6. 🍽️ **Gastronomía turística**

La IA ajusta formularios según categoría seleccionada.

---

## 🔐 FLUJO DE REGISTRO DEL PRESTADOR

1. ✔ Puede explorar sin registrarse
2. 🚫 Para publicar → **registro obligatorio**
3. 🔐 Login: Google / Email
4. 📄 Firma contrato SENDAI (igual que alojamientos)

---

## 📝 FORMULARIO INTELIGENTE DE SERVICIO (MULTISTEP)

### PASO 1 – DATOS GENERALES
- Nombre del servicio
- Categoría (selector visual)
- Ubicación (mapa interactivo)
- Zona de cobertura
- 🧠 **IA sugiere**: títulos atractivos + SEO local

### PASO 2 – DESCRIPCIÓN
- Qué incluye
- Duración
- Nivel físico
- Idiomas disponibles
- Público objetivo
- ➡️ **Botón**: "Generar descripción con IA"

### PASO 3 – LOGÍSTICA ESPECÍFICA (DINÁMICA)

#### 🚐 Transporte
- Tipo de vehículo
- Capacidad
- Rutas
- Horarios
- **Seguro obligatorio**

#### 🗺️ Tours / Guías
- Itinerario detallado
- Punto de encuentro
- Máx. personas
- Certificación del guía

#### 🌿 Experiencias / Atracciones
- Edad mínima
- Riesgos
- Equipos incluidos
- Normas de seguridad

🧠 **IA valida coherencia operativa**

### PASO 4 – PRECIOS Y DISPONIBILIDAD
- Precio por persona / grupo
- Fechas disponibles
- Política de cancelación
- Descuentos

🧠 **IA sugiere**:
- Precio dinámico
- Ajuste por demanda y clima
- Eventos locales

### PASO 5 – SERVICIOS DE GASTRONOMÍA 🍽️
(Si aplica)
- Tipo de experiencia culinaria
- Manipulación de alimentos
- Menú
- Certificación sanitaria

### PASO 6 – DOCUMENTACIÓN LEGAL ⚖️
- 📄 Documento de identidad o RUT
- 📄 Cámara de Comercio (si empresa)
- 📄 RNT (opcional – recomendado)
- 📄 Licencias / seguros (según servicio)

🧠 **IA**:
- Valida formato
- Verifica legibilidad
- Detecta inconsistencias

📌 Sin documentos → estado "En revisión"

### PASO 7 – CONTRATO Y FIRMA DIGITAL
- ✔ Contrato de Intermediación SENDAI
- ✔ Check de responsabilidad exclusiva
- ✔ Firma electrónica
- ✔ Registro IP, fecha, hash

---

## 📊 ESTADOS DEL SERVICIO

| Estado | Descripción |
|--------|-------------|
| **Borrador** | No visible para turistas |
| **En revisión** | SuperAdmin + IA analizando |
| **Activo** | Visible y vendible |
| **Suspendido** | Riesgo / quejas |
| **Eliminado** | Incumplimiento grave |

---

## 🎛️ PANEL DEL PRESTADOR

### Dashboard
- Reservas pendientes
- Ingresos del mes
- Rating promedio
- Alertas críticas

### Gestión
- Editar servicio
- Abrir/cerrar fechas
- Ajustar precios
- Mensajes de clientes

### IA Asistente
**Pregunta**: "¿Cómo mejorar mis reservas esta semana?"
**IA responde con**:
- Diagnóstico claro
- Acciones prioritarias
- Botones rápidos

---

## 💳 RESERVAS Y PAGOS

- ✅ Pago retenido por SENDAI
- ✅ Liberación post-servicio
- ✅ Comisión automática
- 🚫 SENDAI no garantiza ingresos

---

## 🚨 QUEJAS Y SEGURIDAD

### El turista puede:
- ⭐ Calificar servicio
- 📢 Reportar incidente

### IA detecta:
- Riesgo recurrente
- Prestadores peligrosos
- Patrones de fraude

### SuperAdmin puede:
- ⏸️ Suspender
- 🚫 Bloquear
- ⚖️ Escalar legalmente

---

## 🔗 INTEGRACIÓN CON ITINERARIO IA

Los servicios:
- Se recomiendan automáticamente según perfil
- Se agrupan en paquetes inteligentes
- Se ajustan al clima y temporada
- Se optimizan por ubicación

---

## 🛡️ PROTECCIÓN LEGAL DE SENDAI

✔ Cláusula de intermediación
✔ Logs completos e inmutables
✔ Firma electrónica válida
✔ Auditoría IA continua
✔ **No responsabilidad operativa**

---

## 💬 FRASE GUÍA DEL PRESTADOR

> **"SENDAI conecta, tú ejecutas. Nosotros optimizamos con inteligencia artificial."**

---

## 📄 CONTRATO DE INTERMEDIACIÓN INCLUIDO

Ver documento completo en: `CONTRATO_PRESTADORES.md`

- Firma digital obligatoria
- Validación IA de documentos
- Almacenamiento seguro en Supabase
- Hash SHA-256 para trazabilidad

---

## 🧠 IA VALIDADORA DE DOCUMENTOS

### Prompt del sistema:
```
Actúas como auditor legal-turístico colombiano. 
Tu objetivo es proteger a Sendai S.A.S. como intermediario digital.

TAREAS:
1. Verificar legibilidad del documento
2. Detectar inconsistencias
3. Clasificar riesgo: 🟢 BAJO | 🟡 MEDIO | 🔴 ALTO
4. Validar cumplimiento Ley 2068 de 2020
5. Determinar si Sendai puede activar el servicio

SALIDA JSON:
{
  "documento": "RUT / RNT / Cámara de Comercio",
  "legible": true,
  "coherente": true,
  "vigente": true,
  "riesgo_legal": "BAJO",
  "observaciones": "Documento válido y consistente",
  "accion_recomendada": "APROBAR",
  "nota_sendai": "Sendai actúa solo como intermediario"
}
```

---

## 🗄️ MODELO DE BASE DE DATOS

### Tabla: `service_providers`
- id (uuid)
- user_id (FK)
- business_name
- document_type
- document_number
- phone
- email
- status (active/suspended/blocked)
- created_at

### Tabla: `services`
- id (uuid)
- provider_id (FK)
- category (transport/tour/attraction/experience/guide/gastronomy)
- name
- description
- location
- capacity
- price_per_person
- status (draft/review/active/suspended)
- ai_optimized (boolean)
- created_at

### Tabla: `service_bookings`
- id (uuid)
- service_id (FK)
- tourist_id (FK)
- booking_date
- number_of_people
- total_price
- payment_status
- service_status (pending/confirmed/completed/cancelled)

### Tabla: `service_documents`
- id (uuid)
- provider_id (FK)
- document_type (rut/rnt/license/insurance)
- file_url
- ai_validation_json
- status (approved/review/rejected)
- verified_at

### Tabla: `service_contracts`
- id (uuid)
- provider_id (FK)
- contract_version
- accepted (boolean)
- accepted_at
- ip_address
- signature_hash
- pdf_url

### Tabla: `service_complaints`
- id (uuid)
- service_id (FK)
- tourist_id (FK)
- complaint_type
- description
- severity (low/medium/high/critical)
- status (open/investigating/resolved/escalated)
- created_at

---

## 🎨 DISEÑO UX RECOMENDADO

### Colores temáticos por categoría:
- 🚐 Transporte: `oklch(0.60 0.15 220)` (azul)
- 🗺️ Tours: `oklch(0.55 0.12 155)` (verde)
- 🎢 Atracciones: `oklch(0.65 0.18 25)` (naranja)
- 🌿 Experiencias: `oklch(0.58 0.13 145)` (verde esmeralda)
- 🧑‍🏫 Guías: `oklch(0.52 0.14 265)` (púrpura)
- 🍽️ Gastronomía: `oklch(0.62 0.16 50)` (amarillo cálido)

### Componentes clave:
1. `ServiceCategorySelector` - Cards grandes con íconos
2. `ServiceRegistrationWizard` - Stepper multistep
3. `ServiceCard` - Tarjetas de servicio con IA badges
4. `ProviderDashboard` - Panel control prestador
5. `ServiceBookingFlow` - Flujo de reserva
6. `AIServiceOptimizer` - Asistente IA integrado

---

## 🚀 IMPLEMENTACIÓN TÉCNICA

### Stack:
- **Frontend**: React + TypeScript + Tailwind
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **IA**: OpenAI API (GPT-4)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Payments**: MercadoPago (Colombia)

### Hooks clave:
- `useServiceRegistration()` - Manejo formulario
- `useProviderDashboard()` - Métricas prestador
- `useAIOptimization()` - Sugerencias IA
- `useServiceBooking()` - Reservas

---

## ✅ CRITERIOS DE ÉXITO

1. ✅ Prestador registra servicio en < 10 minutos
2. ✅ IA valida documentos en < 30 segundos
3. ✅ SuperAdmin aprueba/rechaza en < 24 horas
4. ✅ Turista reserva en < 3 clics
5. ✅ 0 responsabilidad legal para SENDAI
6. ✅ Trazabilidad completa de contratos
7. ✅ Cumplimiento normativa colombiana 2026

---

**Última actualización**: 2025
**Versión**: 1.0
**Estado**: Implementación en progreso
