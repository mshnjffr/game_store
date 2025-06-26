# 🧪 **Backend API Unit Tests - Cody Testing Guide**

## **Step 1: Setup Testing Environment**

**Prompt:**
```
"Set up a basic Jest testing environment for this Express.js backend. Create Jest configuration file and simple Prisma client mocking. No database setup needed - just mock the Prisma client for unit testing controllers."
```

**Context Files:**
- `backend/package.json` (for existing dependencies and scripts)
- `backend/src/config/prisma.js` (for understanding Prisma usage patterns)

**Expected Output:** Jest config file and Prisma mocking utilities (no database setup)

---

## **Step 2: Orders Controller Tests**

**Prompt:**
```
"Create unit tests for the orders controller covering the main endpoints: createOrder, getUserOrders, and getOrderById. Focus on testing successful operations, basic validation, and error handling. Mock Prisma client responses and keep tests straightforward."
```

**Context Files:**
- `backend/src/controllers/ordersController.js`
- `backend/prisma/schema.prisma` (for order structure)

**Expected Output:** Test file `__tests__/controllers/ordersController.test.js`

---

## **Step 3: Categories Controller Tests**

**Prompt:**
```
"Create unit tests for the categories controller covering getAllCategories, getCategoryBySlug, and getCategoryById. Test successful data retrieval, missing categories, and basic error handling. Keep tests simple and focused."
```

**Context Files:**
- `backend/src/controllers/categoriesController.js`
- `backend/prisma/schema.prisma` (for category structure)

**Expected Output:** Test file `__tests__/controllers/categoriesController.test.js`

---

## **Step 4: Users Controller Tests**

**Prompt:**
```
"Create unit tests for the users controller covering getUserProfile, updateUserProfile, and getUserStats. Focus on basic functionality testing, simple validation, and error scenarios. Mock database responses appropriately."
```

**Context Files:**
- `backend/src/controllers/usersController.js`
- `backend/src/utils/logger.js` (for logging patterns)

**Expected Output:** Test file `__tests__/controllers/usersController.test.js`

---

## **Step 5: Test Utilities**

**Prompt:**
```
"Create simple test utility functions to support the unit tests. Include basic mock data generators for orders, categories, and users. Keep utilities minimal and focused on the essential test data needed."
```

**Context Files:**
- `backend/prisma/seed.js` (for data examples)
- `backend/prisma/schema.prisma` (for data structure)

**Expected Output:** Test utilities in `__tests__/utils/mockData.js`

---

## **🧪 Testing Sequence:**

1. **Step 1** (Setup) - Foundation for testing
2. **Steps 2-4** (Controller Tests) - Can be done in parallel  
3. **Step 5** (Utilities) - Supporting helpers

## **🔍 What to Evaluate:**

- **Basic Coverage**: Do tests cover main controller methods?
- **Mocking**: Are Prisma operations properly mocked?
- **Error Handling**: Are basic error scenarios tested?
- **Response Format**: Are API responses correctly structured?

## **📊 Success Criteria:**

✅ Jest testing environment configured and working  
✅ 3 controller modules have unit tests (Orders, Categories, Users)  
✅ Database operations properly mocked  
✅ Basic error scenarios and success cases covered  
✅ Test utilities support efficient test development  

## **🎯 Goal:**

Create focused unit tests for key backend controllers to ensure basic functionality and error handling work correctly. This demonstrates Cody's ability to understand backend code structure and generate practical test scenarios quickly.

## **💡 Key Testing Patterns to Include:**

**Controller Testing Pattern:**
```javascript
describe('OrdersController', () => {
  describe('createOrder', () => {
    it('should create order with valid data', async () => {
      // Test implementation
    });
    
    it('should return 400 for invalid data', async () => {
      // Test implementation
    });
    
    it('should handle database errors', async () => {
      // Test implementation
    });
  });
});
```

**Mocking Pattern:**
```javascript
jest.mock('../config/prisma', () => ({
  order: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  category: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  }
}));
```

**Ready to test? Start with Step 1 and build focused unit tests for your backend APIs!**
