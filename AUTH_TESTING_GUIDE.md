# Guía de Prueba - Sistema de Autenticación Vantix

## 🧪 Cómo Probar el Sistema

### 1. **Probar como Turista**

#### Opción A: Email/Contraseña
1. Click en **"Iniciar Sesión"** (navbar superior derecha)
2. En la página de autenticación turista:
   - **Para Login**: 
     - Email: `cualquier@email.com`
     - Contraseña: `cualquier contraseña`
     - Click "Iniciar Sesión"
   - **Para Registro**:
     - Click tab "Registrarse"
     - Nombre: `Tu Nombre`
     - Email: `nuevo@email.com`
     - Contraseña: `minimo6` (mínimo 6 caracteres)
     - Confirmar contraseña: `minimo6`
     - Click "Crear Cuenta"

#### Opción B: Google OAuth (Simulado)
1. Click en **"Iniciar Sesión"** (navbar superior derecha)
2. Click el botón **"Continuar con Google"** (botón destacado con logo de Google)
3. Espera 1 segundo (simula autenticación)
4. ¡Listo! Sesión iniciada automáticamente

#### Verificar que funciona:
- ✅ Tu nombre aparece en la navbar (click para ver menú)
- ✅ Puedes acceder a "Mis Reservas"
- ✅ Puedes hacer reservas sin que te pida login
- ✅ Al cerrar sesión, vuelve el botón "Iniciar Sesión"

---

### 2. **Probar como Anfitrión o Prestador**

#### Acceso
1. Scroll al **footer** de la página
2. Busca la sección discreta con links pequeños
3. Click en **"Acceso Anfitriones"**

#### Registro
1. Selecciona tipo de cuenta:
   - 🏠 **Anfitrión**: Para alojamientos (hoteles, hostales)
   - 🚐 **Prestador de Servicios**: Para tours, transporte, experiencias
2. Click en tab **"Registrarse"**
3. Completa el formulario:
   - Nombre: `Mi Hostal Colombia`
   - Teléfono: `+57 300 123 4567`
   - Email: `hostal@negocio.com`
   - Contraseña: `minimo8caracteres` (mínimo 8)
   - Confirmar contraseña: `minimo8caracteres`
4. Click **"Crear Cuenta y Enviar a Verificación"**
5. Verás alerta: "Tu perfil será verificado en 24-48 horas"

#### Login
1. Si ya tienes cuenta, usa tab **"Iniciar Sesión"**
2. Email y contraseña
3. Click **"Acceder a mi Panel"**

#### Verificar que funciona:
- ✅ Sesión iniciada
- ✅ Puedes acceder al panel de gestión
- ⚠️ Alerta visible: Cuenta en verificación (si es nueva)

---

### 3. **Probar como SuperAdmin**

#### Acceso (Muy Discreto)
1. Scroll al **footer**
2. Busca link pequeño: **"Acceso Administrativo"**
3. Click en él

#### Login Paso 1: Credenciales
1. Email: `superadmin@sendai.com`
2. Contraseña: `SuperAdmin2025!`
3. Click "Siguiente"

#### Login Paso 2: 2FA
1. Código 2FA: `123456`
2. Click "Verificar y Acceder"

#### Verificar que funciona:
- ✅ Acceso al panel de SuperAdmin
- ✅ Puede ver todos los usuarios
- ✅ Puede aprobar/rechazar anfitriones y prestadores

---

### 4. **Probar Restricción de Reservas**

#### Escenario: Usuario NO autenticado
1. **NO inicies sesión** (o cierra sesión si ya estás autenticado)
2. Navega a cualquier alojamiento
3. Click en **"Reservar"**
4. 🔴 **Resultado esperado**:
   - Toast: "Inicia sesión para realizar una reserva"
   - Redirige automáticamente a página de login turista
   - Después de login, puedes completar la reserva

#### Escenario: Usuario autenticado
1. **Inicia sesión** como turista
2. Navega a cualquier alojamiento
3. Click en **"Reservar"**
4. ✅ **Resultado esperado**:
   - Abre diálogo de reserva directamente
   - Puedes seleccionar fechas
   - Botón "Continuar" está activo

---

### 5. **Probar Navegación Libre**

#### Verifica que SIN autenticación puedes:
- ✅ Ver página de inicio
- ✅ Explorar destinos
- ✅ Ver categorías (Aventura, Cultura, etc.)
- ✅ Leer blog y artículos
- ✅ Ver detalles de alojamientos
- ✅ Ver precios
- ✅ Generar itinerarios IA
- ✅ Ver todas las páginas del footer
- ❌ **NO puedes**: Reservar (te pide login)

---

## 🎨 Características Visuales a Verificar

### TouristAuth
- [ ] Logo de Vantix visible en el header
- [ ] Botón "Continuar con Google" destacado (logo colorido)
- [ ] Separador "O usa tu email" / "O crea tu cuenta"
- [ ] Iconos en cada campo (Email, Lock, User)
- [ ] Toggle de visibilidad de contraseña (ojo/ojo tachado)
- [ ] Tabs Iniciar Sesión / Registrarse con iconos
- [ ] Links a Términos y Privacidad al final
- [ ] Link cruzado a host auth al final
- [ ] Diseño responsive (prueba en móvil)

### HostAuth
- [ ] Logo de Vantix en header
- [ ] Cards grandes para selección de rol con iconos
- [ ] Hover effect en las cards de rol
- [ ] Card seleccionada destacada con borde azul
- [ ] Alert azul en login (verificación)
- [ ] Alert ámbar en signup (proceso de verificación)
- [ ] Lista de 4 pasos del proceso
- [ ] Link cruzado a tourist auth al final
- [ ] Grid de 2 columnas en campos de contraseña (desktop)

### BookingDialog (cuando NO estás autenticado)
- [ ] Alert ámbar visible: "Inicia sesión para continuar con tu reserva"
- [ ] Botón cambia a "Iniciar Sesión para Reservar" con icono
- [ ] Click en botón redirige a tourist auth

---

## 🔄 Flujos Completos a Probar

### Flujo 1: Registro y Reserva de Turista
1. Usuario nuevo llega al sitio
2. Navega y encuentra alojamiento interesante
3. Click "Reservar" → Redirige a login
4. Click "Continuar con Google" → Login instantáneo
5. Vuelve automáticamente → Completa reserva
6. ✅ Reserva confirmada

### Flujo 2: Anfitrión Registra Propiedad
1. Propietario de hostal llega al sitio
2. Scroll a footer → Click "Acceso Anfitriones"
3. Selecciona "Anfitrión"
4. Registra cuenta nueva
5. Ve alerta: "Cuenta en verificación 24-48h"
6. Puede explorar panel pero no publicar hasta aprobación
7. SuperAdmin aprueba (otro usuario)
8. ✅ Puede publicar propiedades

### Flujo 3: SuperAdmin Aprueba Usuarios
1. Admin accede con credenciales especiales
2. 2FA requerido
3. Ve dashboard con usuarios pendientes
4. Aprueba/rechaza anfitriones y prestadores
5. ✅ Usuarios aprobados pueden publicar

---

## 🐛 Casos Edge a Verificar

1. **Contraseña corta**: 
   - Turista: menos de 6 → Error
   - Host: menos de 8 → Error

2. **Contraseñas no coinciden**:
   - Signup → Error: "Las contraseñas no coinciden"

3. **Campos vacíos**:
   - Cualquier submit → Error: "Completa todos los campos"

4. **SuperAdmin credenciales incorrectas**:
   - Intento 1 → Error
   - Intento 2 → Error
   - Intento 3 → Bloqueo temporal

5. **2FA incorrecto**:
   - Similar a credenciales: 3 intentos max

---

## ✅ Checklist de Funcionalidades

### Autenticación
- [ ] Login turista con email/password funciona
- [ ] Registro turista con email/password funciona
- [ ] Google OAuth button funciona (simulado)
- [ ] Login host/prestador funciona
- [ ] Registro host/prestador funciona
- [ ] Login SuperAdmin con 2FA funciona
- [ ] Cerrar sesión funciona
- [ ] Sesión persiste al recargar página

### Restricciones
- [ ] Reserva sin auth redirige a login
- [ ] Reserva con auth funciona directamente
- [ ] Navegación libre funciona sin auth
- [ ] Panel host requiere auth + verificación
- [ ] Panel admin requiere auth + 2FA

### UI/UX
- [ ] Navbar muestra "Iniciar Sesión" cuando no hay auth
- [ ] Navbar muestra avatar/nombre cuando hay auth
- [ ] Footer tiene links discretos a host y admin auth
- [ ] Todas las páginas de auth son responsive
- [ ] Toasts aparecen en acciones importantes
- [ ] Validación de formularios funciona

---

## 📱 Prueba en Diferentes Dispositivos

1. **Desktop (1920x1080)**: Layout completo, 2 columnas donde aplica
2. **Tablet (768x1024)**: Layout adaptado, algunos elementos en 1 columna
3. **Móvil (375x667)**: Todo en 1 columna, botones full-width

---

## 💡 Tips para Testing

- **Usa DevTools**: Console para ver errores
- **Network Tab**: Ver llamadas KV storage
- **Responsive Mode**: Probar diferentes tamaños
- **Borrar Storage**: Si algo falla, borra localStorage
- **Múltiples Usuarios**: Prueba con diferentes roles
- **Cerrar/Abrir Pestañas**: Verificar persistencia

---

## 🎯 Criterios de Éxito

El sistema funciona correctamente si:

✅ Turistas pueden registrarse fácilmente (email o Google)  
✅ Turistas DEBEN autenticarse para reservar  
✅ Turistas pueden navegar libremente sin auth  
✅ Hosts/Prestadores pueden registrarse con info completa  
✅ Hosts/Prestadores ven alerta de verificación  
✅ SuperAdmin tiene acceso ultra-seguro (2FA)  
✅ UI es clara, intuitiva y responsive  
✅ Feedback visual (toasts) en todas las acciones  
✅ Links de auth están bien ubicados (navbar para turistas, footer para otros)

---

¡El sistema está listo para usar! 🚀
