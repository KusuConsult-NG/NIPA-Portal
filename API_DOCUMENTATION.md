# NIPA Portal Backend API

## Authentication Endpoints

### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+234 803 123 4567",
  "password": "securepassword",
  "cohort": "SEC 42",
  "profession": "Engineer"
}
```

**Response:** 
```json
{
  "success": true,
  "message": "Registration successful",
  "user": { ...user object },
  "token": "jwt-token"
}
```

### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { ...user object },
  "token": "jwt-token"
}
```

### POST /api/auth/logout
Logout and clear authentication cookie.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /api/auth/me
Get current authenticated user information.

**Headers:** `Authorization: Bearer {token}` or cookie

**Response:**
```json
{
  "success": true,
  "user": { ...user object }
}
```

---

## Members Endpoints

### GET /api/members
Get list of members with filtering.

**Query Parameters:**
- `search` - Search by name, profession, or location
- `cohort` - Filter by cohort (e.g., "SEC 42")
- `status` - Filter by status  ("active" or "inactive")
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)

**Response:**
```json
{
  "success": true,
  "members": [...],
  "total": 100,
  "page": 1,
  "limit": 50
}
```

### GET /api/members/[id]
Get specific member by ID.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "member": { ...member object }
}
```

### PATCH /api/members/[id]
Update member profile.

**Auth:** Required (own profile or admin)

**Request Body:**
```json
{
  "name": "Updated Name",
  "phone": "+234 803 999 9999",
  "profession": "Updated Profession",
  "location": "Updated Location"
}
```

---

## Events Endpoints

### GET /api/events
Get list of events.

**Query Parameters:**
- `status` - Filter by status ("upcoming", "past", "all")

**Response:**
```json
{
  "success": true,
  "events": [...],
  "total": 10
}
```

### POST /api/events
Create new event.

**Auth:** Admin only

**Request Body:**
```json
{
  "title": "Event Title",
  "description": "Event description",
  "date": "2024-12-01",
  "time": "10:00 AM",
  "location": "Abuja",
  "type": "summit",
  "capacity": 500
}
```

### POST /api/events/[id]/register
Register for an event.

**Auth:** Required

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered for event",
  "eventId": "event_123",
  "registeredCount": 50
}
```

### DELETE /api/events/[id]/register
Unregister from an event.

**Auth:** Required

---

## Payments Endpoints

### GET /api/payments
Get payment history.

**Auth:** Required

**Query Parameters:**
- `memberId` - Filter by member ID (admins only)

**Response:**
```json
{
  "success": true,
  "payments": [...],
  "total": 25
}
```

### POST /api/payments
Create new payment.

**Auth:** Required

**Request Body:**
```json
{
  "amount": 5000,
  "description": "Monthly Dues - January 2024",
  "category": "dues"
}
```

---

## Announcements Endpoints

### GET /api/announcements
Get list of announcements.

**Response:**
```json
{
  "success": true,
  "announcements": [...],
  "total": 15
}
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "Error Type",
  "message": "Human-readable error message"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Server Error

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests using either:

1. **Cookie:** Automatically set by login/signup
2. **Header:** `Authorization: Bearer {your-token}`

Tokens expire after 7 days.
