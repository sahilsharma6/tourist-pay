# TouristPay API Documentation

Base URL: `http://localhost:5000/api`

## Authentication (`/auth`)

### 1. Signup
- **URL:** `/auth/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passportNumber": "A1234567",
    "nationality": "US"
  }
  ```
- **Response:** `201 Created`
  - Returns `success: true`, `message`, and `data` (including token). Also sets `token` cookie.

### 2. Login
- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** `200 OK`
  - Returns token in response and sets `token` cookie.

### 3. Get Current User (Me)
- **URL:** `/auth/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>` or Cookie
- **Response:** `200 OK`

### 4. Logout
- **URL:** `/auth/logout`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>` or Cookie
- **Response:** `200 OK` (clears cookie)

---

## KYC Flow (`/kyc`)
*Requires Authentication*

### 1. Upload Passport
- **URL:** `/kyc/passport`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Body:** form-data with key `document` (type: file, image/jpeg, image/png)
- **Response:** `200 OK`

### 2. Upload Visa
- **URL:** `/kyc/visa`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Body:** form-data with key `document`
- **Response:** `200 OK`

### 3. Upload Selfie
- **URL:** `/kyc/selfie`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Body:** form-data with key `document`
- **Response:** `200 OK`

### 4. Submit KYC
- **URL:** `/kyc/submit`
- **Method:** `POST`
- **Description:** Verifies that passport, visa, and selfie exist, then updates status to `reviewing`.
- **Response:** `200 OK`

### 5. Get KYC Status
- **URL:** `/kyc/status`
- **Method:** `GET`
- **Response:** `200 OK` returns `kycStatus` and `isVerified`.

---

## Admin Features (`/admin`)
*Requires Authentication & Admin Role (`role: 'admin'`)*

### 1. Get All Users
- **URL:** `/admin/users`
- **Method:** `GET`
- **Response:** `200 OK`

### 2. Get Pending KYC Users
- **URL:** `/admin/kyc/pending`
- **Method:** `GET`
- **Response:** `200 OK`

### 3. Approve KYC
- **URL:** `/admin/kyc/:id/approve`
- **Method:** `PUT`
- **Response:** `200 OK`

### 4. Reject KYC
- **URL:** `/admin/kyc/:id/reject`
- **Method:** `PUT`
- **Response:** `200 OK`
