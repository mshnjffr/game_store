# 🧪 **Wishlist Feature - Cody Testing Guide**

## **Step 1: Database Schema Design**

**Prompt:**
```
"I need to add a wishlist feature to this e-commerce game application. Users should be able to add/remove games from their wishlist. Based on the existing database schema and patterns, create a Prisma schema for the Wishlist model with proper relationships and constraints."
```

**Context Files:**
- `backend/prisma/schema.prisma`
- `backend/prisma/seed.js`

**Expected Output:** Wishlist model definition with relationships

---

## **Step 2: Backend API Endpoints**

**Prompt:**
```
"Create RESTful API endpoints for wishlist management (get user wishlist, add game to wishlist, remove from wishlist). Follow the existing controller patterns and error handling conventions in this codebase."
```

**Context Files:**
- `backend/src/controllers/gamesController.js`
- `backend/src/controllers/ordersController.js`
- `backend/src/routes/index.js`
- `backend/src/config/prisma.js`

**Expected Output:** Complete wishlistController.js with CRUD operations

---

## **Step 3: Backend Route Integration**

**Prompt:**
```
"Add the wishlist routes to the main routes file, following the existing routing patterns and middleware usage."
```

**Context Files:**
- `backend/src/routes/index.js`
- `backend/src/controllers/wishlistController.js` (from Step 2)

**Expected Output:** Updated routes with wishlist endpoints

---

## **Step 4: Frontend API Client**

**Prompt:**
```
"Create SIMPLE API client methods for wishlist operations (get, add, remove) following the existing API patterns and error handling. Use the exact same structure as existing API methods (authApi, gamesApi, ordersApi). IMPORTANT: Only create basic CRUD operations that match the backend endpoints exactly. Do not create advanced methods like getStats() unless they exist in the backend. Use existing Game type from the codebase."
```

**Context Files:**
- `frontend/lib/api.ts`
- `frontend/types/index.ts`
- `backend/src/controllers/wishlistController.js` (from Step 2)

**Expected Output:** Simple wishlist API methods in api.ts (only basic CRUD, no stats methods)

---

## **Step 5: Wishlist Page Component**

**Prompt:**
```
"Create a simple wishlist page component that displays the user's wishlist with game cards and remove buttons. CRITICAL REQUIREMENTS: 
1. Use EXACT image pattern from existing code: game.images?.find(img => img.isPrimary)?.url (NOT game.images?.[0]?.url)
2. Do NOT create custom types like WishlistItem or WishlistStats - use existing Game type
3. Only call API methods that actually exist - no wishlistApi.getStats() unless backend provides it
4. Use console.log for feedback (no toast libraries)
5. Follow existing page structure and component patterns exactly
6. Handle missing/failed API calls gracefully with proper error checking"
```

**Context Files:**
- `frontend/app/games/page.tsx`
- `frontend/app/account/page.tsx`
- `frontend/components/ui/card.tsx`
- `frontend/lib/api.ts` (updated from Step 4)
- `frontend/lib/utils.ts`
- `frontend/types/index.ts`
- `frontend/components/game/GameCard.tsx` (for correct image patterns)
- `frontend/app/cart/page.tsx` (for image pattern reference)

**Expected Output:** Simple wishlist page using existing patterns, correct image handling, no custom types

---

## **Step 6: Add to Wishlist Button**

**Prompt:**
```
"Add simple 'Add to Wishlist' buttons to the game cards. The button should call the wishlist API and provide user feedback via console.log (do not use toast libraries). Follow existing button patterns and styling exactly. Keep it simple - just add/remove functionality."
```

**Context Files:**
- `frontend/app/games/page.tsx`
- `frontend/components/ui/button.tsx`
- `frontend/lib/api.ts` (updated)
- `frontend/lib/utils.ts`

**Expected Output:** Game cards with simple wishlist buttons using existing patterns

---

## **Step 7: Navigation Integration**

**Prompt:**
```
"Add a 'Wishlist' link to the navigation menu, following the existing navigation patterns and authentication checks."
```

**Context Files:**
- `frontend/components/layout/Navigation.tsx`

**Expected Output:** Updated navigation with wishlist link

---

## **Step 8: Database Migration**

**Prompt:**
```
"Create a Prisma migration command and update the seed file to include sample wishlist data for testing."
```

**Context Files:**
- `backend/prisma/schema.prisma` (updated from Step 1)
- `backend/prisma/seed.js`

**Expected Output:** Migration command and updated seed data

---

## **🧪 Testing Sequence:**

1. **Start with Step 1** (Database) - Most foundational
2. **Move to Steps 2-3** (Backend API) - Build the data layer
3. **Then Steps 4-7** (Frontend) - Build the user interface
4. **Finish with Step 8** (Migration) - Make it deployable

## **🔍 What to Evaluate:**

- **Consistency**: Does generated code follow existing patterns exactly?
- **No External Dependencies**: Does it avoid importing libraries not already in the project?
- **Type Safety**: Does it use existing types instead of creating new ones?
- **Image Handling**: Does it use correct image pattern (isPrimary) not array index?
- **API Calls**: Does it only call methods that exist in the backend?
- **Error Handling**: Does it handle API failures gracefully without breaking?
- **Simplicity**: Is the code simple and focused rather than over-engineered?

## **📊 Success Criteria:**

✅ Database schema follows existing relationship patterns  
✅ API endpoints match existing controller structure exactly  
✅ Frontend components use ONLY existing UI library and patterns  
✅ Images use correct pattern: `game.images?.find(img => img.isPrimary)?.url`  
✅ No external dependencies or toast libraries imported  
✅ Uses existing Game type, no custom type creation  
✅ Only calls API methods that exist in backend (no getStats() unless implemented)  
✅ Graceful error handling for missing/failed API calls  
✅ Simple console.log feedback instead of complex notifications  

## **🎯 Goal:**

Test whether Cody can generate a complete, production-ready feature by following existing patterns and conventions in the codebase. This will validate the effectiveness of the prompts and file selections for Exercise 2: Code Generation with Cody.

**Ready to test? Start with Step 1 and evaluate Cody's performance at each step!**
