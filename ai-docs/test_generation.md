# 🧪 **Backend API Unit Tests - Cody Testing Guide**

## **Step 1: Setup Testing Environment**

**Prompt:**
```
"Set up a comprehensive Jest testing environment for this Express.js backend. Create the necessary configuration files, test database setup, and helper utilities for API testing. Include setup for mocking Prisma client, session handling, and proper test isolation."
```

**Context Files:**
- `backend/package.json` (for existing dependencies and scripts)
- `backend/src/server.js` (for Express app structure)
- `backend/src/config/prisma.js` (for database configuration)
- `backend/src/controllers/authController.js` (for session handling patterns)

**Expected Output:** Jest config, test database setup, mocking utilities

---

## **Step 2: Authentication Controller Tests**

**Prompt:**
```
"Create comprehensive unit tests for the authentication controller. Test all endpoints: register, login, logout, and getSession. Include tests for success cases, validation errors, duplicate users, invalid credentials, session management, and error handling. Mock the Prisma client and bcrypt functions."
```

**Context Files:**
- `backend/src/controllers/authController.js`
- `backend/src/utils/encryption.js` (for password hashing)
- `backend/src/utils/logger.js` (for logging patterns)

**Expected Output:** Complete test file `__tests__/controllers/authController.test.js`

---

## **Step 3: Games Controller Tests**

**Prompt:**
```
"Create unit tests for the games controller covering all endpoints: getAllGames, getGameById, getGamesByCategory, searchGames, and addGameReview. Test different scenarios including pagination, filtering, search parameters, rating calculations, missing games, and proper data formatting with the convertGameFields helper function."
```

**Context Files:**
- `backend/src/controllers/gamesController.js`
- `backend/src/services/inventoryService.js` (for inventory operations)
- `backend/prisma/schema.prisma` (for data relationships)

**Expected Output:** Complete test file `__tests__/controllers/gamesController.test.js`

---

## **Step 4: Orders Controller Tests**

**Prompt:**
```
"Create unit tests for the orders controller covering: createOrder, getUserOrders, getOrderById, updateOrderStatus, and getOrderStats. Include tests for order validation, inventory checks, transaction handling, authentication requirements, order status updates, and proper price calculations."
```

**Context Files:**
- `backend/src/controllers/ordersController.js`
- `backend/src/services/inventoryService.js`
- `backend/prisma/schema.prisma` (for order relationships)

**Expected Output:** Complete test file `__tests__/controllers/ordersController.test.js`

---

## **Step 5: Categories Controller Tests**

**Prompt:**
```
"Create unit tests for the categories controller covering getAllCategories, getCategoryBySlug, and getCategoryById. Test successful data retrieval, missing categories, proper error handling, and data formatting consistency."
```

**Context Files:**
- `backend/src/controllers/categoriesController.js`
- `backend/prisma/schema.prisma` (for category structure)

**Expected Output:** Complete test file `__tests__/controllers/categoriesController.test.js`

---

## **Step 6: Users Controller Tests**

**Prompt:**
```
"Create unit tests for the users controller covering getUserProfile, updateUserProfile, changePassword, deleteUserAccount, and getUserStats. Include tests for authentication requirements, data validation, password updates, account deletion, and user statistics calculations."
```

**Context Files:**
- `backend/src/controllers/usersController.js`
- `backend/src/utils/encryption.js` (for password operations)
- `backend/src/utils/logger.js`

**Expected Output:** Complete test file `__tests__/controllers/usersController.test.js`

---

## **Step 7: Integration Test Setup**

**Prompt:**
```
"Create integration tests that test the full API endpoints using supertest. Set up a test Express app instance and create tests that verify the complete request-response cycle for key user flows: user registration/login, game browsing, and order creation."
```

**Context Files:**
- `backend/src/server.js`
- `backend/src/routes/index.js` (for route structure)
- All controller files (for endpoint understanding)

**Expected Output:** Integration test file `__tests__/integration/api.test.js`

---

## **Step 8: Test Utilities and Helpers**

**Prompt:**
```
"Create test utility functions and helper modules to support the unit tests. Include mock data generators for users, games, orders, and categories. Create database seeding utilities for tests and helper functions for common test operations like creating authenticated sessions."
```

**Context Files:**
- `backend/prisma/seed.js` (for data examples)
- `backend/prisma/schema.prisma` (for data structure)
- All controller files (for data requirements)

**Expected Output:** Test utilities in `__tests__/utils/` directory

---

## **🧪 Testing Sequence:**

1. **Step 1** (Setup) - Foundation for all testing
2. **Steps 2-6** (Controller Tests) - Can be done in parallel
3. **Step 7** (Integration Tests) - Requires controller understanding
4. **Step 8** (Utilities) - Supporting infrastructure

## **🔍 What to Evaluate:**

- **Test Coverage**: Do tests cover all controller methods and edge cases?
- **Mocking Strategy**: Are external dependencies (Prisma, bcrypt) properly mocked?
- **Error Scenarios**: Are error conditions and edge cases tested?
- **Data Validation**: Are input validation and sanitization tested?
- **Authentication**: Are session and authentication requirements tested?
- **Database Operations**: Are Prisma operations and transactions tested?
- **Response Formats**: Are API responses properly formatted and consistent?

## **📊 Success Criteria:**

✅ Comprehensive Jest testing environment configured  
✅ All 5 controller modules have complete unit tests  
✅ Authentication and session handling thoroughly tested  
✅ Database operations properly mocked and tested  
✅ Error scenarios and edge cases covered  
✅ Integration tests verify end-to-end API functionality  
✅ Test utilities support efficient test development  
✅ High test coverage (80%+) achieved  

## **🎯 Goal:**

Develop a comprehensive test suite for the backend API that ensures reliability, catches regressions, and validates business logic. This will demonstrate Cody's ability to understand complex backend code, generate thorough test scenarios, and create maintainable test infrastructure.

## **💡 Key Testing Patterns to Include:**

**Controller Testing Pattern:**
```javascript
describe('AuthController', () => {
  describe('register', () => {
    it('should create user with valid data', async () => {
      // Test implementation
    });
    
    it('should return 400 for duplicate email', async () => {
      // Test implementation
    });
    
    it('should handle database errors gracefully', async () => {
      // Test implementation
    });
  });
});
```

**Mocking Pattern:**
```javascript
jest.mock('../config/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  game: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  }
}));
```

**Ready to test? Start with Step 1 and build a comprehensive test suite for your backend APIs!**
