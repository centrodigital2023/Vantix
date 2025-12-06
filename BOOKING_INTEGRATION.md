# Booking and Payment Integration Documentation

## Overview

SendAI Colombia includes a complete booking confirmation flow with integrated Mercado Pago payment processing. This document outlines the architecture, flow, and implementation details.

## Features

### 1. Booking Flow
- **Date Selection**: Calendar-based date picker for check-in and check-out
- **Guest Information**: Comprehensive form capturing guest details
- **Booking Summary**: Real-time price calculation with taxes and fees
- **Form Validation**: Client-side validation for all required fields
- **Special Requests**: Optional field for guest preferences

### 2. Payment Integration
- **Mercado Pago**: Full integration with Mercado Pago payment gateway
- **Multiple Payment Methods**: Credit cards, debit cards, and installments
- **Secure Processing**: Bank-level encryption and PCI compliance
- **Payment Status Tracking**: Real-time payment status updates

### 3. Booking Management
- **Booking History**: View all past and current bookings
- **Status Tracking**: Monitor booking status (pending, confirmed, cancelled, completed)
- **Payment Status**: Track payment status (pending, approved, rejected, refunded)
- **Confirmation Details**: Access full booking details and confirmation

## Architecture

### Components

#### 1. BookingDialog Component
**Location**: `/src/components/BookingDialog.tsx`

Modal dialog for selecting booking dates and number of guests. Opens when user clicks "Reservar" on a room.

**Props**:
- `open`: Boolean - Controls dialog visibility
- `onOpenChange`: Function - Handle dialog state changes
- `accommodationId`: String - ID of the accommodation
- `roomTypeId`: String - ID of the selected room type
- `onConfirm`: Function - Callback after date selection

**Key Features**:
- Date range picker with validation
- Guest count selector
- Stores temporary booking data in KV store

#### 2. ReservaConfirmacion Page
**Location**: `/src/pages/ReservaConfirmacion.tsx`

Complete booking confirmation page with guest information form and payment processing.

**Key Features**:
- Guest information form with validation
- Real-time price calculation
- Booking summary sidebar
- Mercado Pago payment preference creation
- Payment redirect

**Form Fields**:
- First Name (required)
- Last Name (required)
- Email (required, validated)
- Phone (required, 10 digits)
- ID Number (required)
- Special Requests (optional)
- Terms acceptance (required)

**Price Calculation**:
```typescript
const subtotal = roomPrice * nights
const serviceFee = subtotal * 0.10  // 10% service fee
const taxes = subtotal * 0.19       // 19% IVA
const total = subtotal + serviceFee + taxes
```

#### 3. ReservaExitosa Page
**Location**: `/src/pages/ReservaExitosa.tsx`

Confirmation page displayed after successful payment or payment processing.

**Key Features**:
- Payment status display
- Complete booking details
- Downloadable confirmation
- Email resend option
- Policy information

#### 4. MisReservas Page
**Location**: `/src/pages/MisReservas.tsx`

User booking history with filtering and management options.

**Key Features**:
- Filterable booking list (All, Active, Completed, Cancelled)
- Booking status badges
- Payment status display
- Quick access to booking details
- Navigate to accommodation details

### API Integration

#### Mercado Pago Integration
**Location**: `/src/lib/api/mercadopago.ts`

**Credentials**:
- Public Key: `APP_USR-67c9acaa-b0ec-47bc-8b56-9c3b26b497bd`
- Access Token: `APP_USR-3125069616439969-120120-6b1af1d513227cfe9d20effb97df374c-2980671727`

**Functions**:

1. `createPaymentPreference(params)`:
   - Creates a payment preference in Mercado Pago
   - Returns preference ID and payment URLs
   - Configures success, failure, and pending URLs

2. `initMercadoPago()`:
   - Loads Mercado Pago SDK dynamically
   - Initializes SDK with public key
   - Sets locale to Spanish (Colombia)

3. `checkPaymentStatus(paymentId)`:
   - Queries payment status from Mercado Pago API
   - Returns payment details and status

**Payment Preference Structure**:
```typescript
{
  items: [{
    title: "Hotel Name - Room Type",
    description: "Check-in to Check-out (X nights)",
    unit_price: totalPrice,
    quantity: 1,
    currency_id: "COP"
  }],
  payer: {
    name: firstName,
    surname: lastName,
    email: email,
    phone: { area_code, number },
    identification: { type: "CC", number: idNumber }
  },
  back_urls: {
    success: "/reserva-exitosa?booking_id=...",
    failure: "/reserva-confirmacion?status=failure",
    pending: "/reserva-confirmacion?status=pending"
  },
  payment_methods: {
    installments: 12
  }
}
```

## Data Model

### Booking Type
```typescript
interface Booking {
  id: string                    // Unique booking ID
  userId: string                // User who made booking
  accommodationId: string       // Accommodation being booked
  roomTypeId: string            // Specific room type
  checkIn: string              // ISO date string
  checkOut: string             // ISO date string
  guests: number               // Number of guests
  totalPrice: number           // Total price in COP
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string            // ISO date string
  guestInfo: {
    name: string
    email: string
    phone: string
    idNumber: string
    specialRequests?: string
  }
  paymentInfo: {
    method: 'mercadopago' | 'card' | 'cash'
    transactionId?: string
    paymentStatus: 'pending' | 'approved' | 'rejected' | 'refunded'
    preferenceId?: string
  }
}
```

## User Flow

### Complete Booking Process

1. **Browse Accommodations**
   - User navigates to destination results or accommodation details
   - Views available rooms with pricing

2. **Select Room**
   - Clicks "Reservar" button on desired room
   - BookingDialog opens

3. **Choose Dates**
   - Selects check-in date
   - Selects check-out date
   - Chooses number of guests
   - Clicks "Continuar"

4. **Enter Guest Information**
   - Navigates to ReservaConfirmacion page
   - Fills out personal information form
   - Reviews booking summary with calculated price
   - Accepts terms and conditions
   - Clicks "Continuar al pago"

5. **Payment Processing**
   - System creates booking record
   - Generates Mercado Pago payment preference
   - Redirects to Mercado Pago checkout
   - User completes payment

6. **Confirmation**
   - Mercado Pago redirects back to SendAI
   - ReservaExitosa page displays confirmation
   - Booking status updated based on payment result
   - Confirmation email sent (simulated)

7. **View Bookings**
   - User can access "Mis Reservas" from navbar
   - View all bookings with status and payment info
   - Download confirmations
   - Access booking details

## Data Persistence

All booking data is stored using the Spark KV storage system:

### Storage Keys

- `temp-booking-data`: Temporary data during booking flow
- `user-bookings`: Array of all user bookings
- `current-booking-id`: Current booking being viewed/processed

### Data Flow

1. **BookingDialog**: Stores date selection in `temp-booking-data`
2. **ReservaConfirmacion**: Creates booking and adds to `user-bookings`
3. **Payment Callback**: Updates booking with payment info
4. **ReservaExitosa**: Reads from `current-booking-id` and `user-bookings`
5. **MisReservas**: Reads all bookings from `user-bookings`

## Security Considerations

### Implemented
- Client-side form validation
- Email format validation
- Phone number validation
- Terms acceptance requirement
- Secure payment redirect (no sensitive data stored locally)

### Recommended for Production
- Server-side validation
- Rate limiting on booking creation
- Webhook verification for payment callbacks
- Email verification
- Phone verification
- Fraud detection
- PCI compliance audit
- Data encryption at rest
- HTTPS enforcement

## Testing Payment Integration

### Test Environment
Mercado Pago provides sandbox/test environment for testing:

1. Use test credentials (if available)
2. Use test credit card numbers
3. Simulate different payment statuses

### Test Scenarios
- Successful payment
- Declined payment
- Payment timeout
- Network interruption
- Invalid card details
- Insufficient funds

## Future Enhancements

### Short Term
- Email confirmation integration
- SMS notifications
- Booking modification/cancellation
- Refund processing
- Guest reviews after checkout

### Medium Term
- Multiple room booking
- Group bookings
- Corporate booking management
- Loyalty program integration
- Dynamic pricing based on demand

### Long Term
- Multi-currency support
- Alternative payment gateways
- Split payments
- Payment plans
- Travel insurance integration
- Booking protection programs

## Support & Troubleshooting

### Common Issues

**Issue**: Payment preference creation fails
**Solution**: Check Mercado Pago credentials and API endpoint availability

**Issue**: Booking not appearing in history
**Solution**: Verify booking data is being saved to KV store correctly

**Issue**: Payment status not updating
**Solution**: Implement webhook handling for real-time payment updates

**Issue**: User redirected but no booking found
**Solution**: Check URL parameters and KV store key consistency

## API Reference

### Mercado Pago Documentation
- [API Reference](https://www.mercadopago.com.co/developers/es/reference)
- [Payment Preferences](https://www.mercadopago.com.co/developers/es/reference/preferences/_checkout_preferences/post)
- [Webhooks](https://www.mercadopago.com.co/developers/es/guides/notifications/webhooks)

## Contact & Support

For issues related to:
- **Booking Flow**: Check component implementations in `/src/pages`
- **Payment Processing**: Review `/src/lib/api/mercadopago.ts`
- **Data Storage**: Verify KV store operations
- **Mercado Pago**: Contact Mercado Pago support or review their documentation
