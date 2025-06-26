# 🔧 **Image URL Construction Refactoring - Cody Testing Guide**

## **Step 1: Create Utility Function**

**Prompt:**
```
"I've found duplicated image URL construction logic across multiple components in this codebase. Create a utility function to extract this repeated pattern. The function should take a Game object and return the full image URL, handling the primary image selection and fallback to placeholder. Follow the existing utility patterns in this codebase."
```

**Context Files:**
- `frontend/lib/utils.ts` (for existing utility patterns)
- `frontend/types/index.ts` (for Game and GameImage types)
- `frontend/components/game/GameCard.tsx` (for current pattern example)
- `frontend/components/game/GameDetails.tsx` (for pattern variation)

**Expected Output:** New file `frontend/lib/imageUtils.ts` with `getGameImageUrl()` function

---

## **Step 2: Refactor GameCard Component**

**Prompt:**
```
"Replace the duplicated image URL construction logic in this GameCard component with the new utility function. Remove the manual primaryImage and imageUrl logic and use the extracted utility instead. Keep all other functionality exactly the same."
```

**Context Files:**
- `frontend/components/game/GameCard.tsx`
- `frontend/lib/imageUtils.ts` (from Step 1)
- `frontend/types/index.ts`

**Expected Output:** Updated GameCard.tsx using the utility function instead of inline logic

---

## **Step 3: Refactor GameDetails Component**

**Prompt:**
```
"Replace the image URL construction logic in this GameDetails component with the utility function. Note that this component has a slightly different pattern - it gets the primaryImage object first, then accesses .url. Replace this with the utility function while keeping all other functionality intact."
```

**Context Files:**
- `frontend/components/game/GameDetails.tsx`
- `frontend/lib/imageUtils.ts` (from Step 1)
- `frontend/types/index.ts`

**Expected Output:** Updated GameDetails.tsx using the utility function

---

## **Step 4: Refactor Cart Page**

**Prompt:**
```
"Replace the duplicated image URL construction logic in this cart page component with the utility function. The pattern here is used inside a map function for cart items. Replace the inline logic while maintaining the exact same rendering behavior."
```

**Context Files:**
- `frontend/app/cart/page.tsx`
- `frontend/lib/imageUtils.ts` (from Step 1)
- `frontend/types/index.ts`

**Expected Output:** Updated cart/page.tsx using the utility function

---

## **Step 5: Refactor Checkout Page**

**Prompt:**
```
"Replace the image URL construction logic in this checkout page with the utility function. This is used in the order summary section for displaying cart items. Keep the same functionality while using the extracted utility."
```

**Context Files:**
- `frontend/app/checkout/page.tsx`
- `frontend/lib/imageUtils.ts` (from Step 1)
- `frontend/types/index.ts`

**Expected Output:** Updated checkout/page.tsx using the utility function

---

## **Step 6: Verification and Testing**

**Prompt:**
```
"Search the entire frontend codebase for any remaining instances of the old image URL construction pattern. Look for 'game.images?.find(img => img.isPrimary)' and 'NEXT_PUBLIC_API_URL' used together. Ensure all instances have been replaced with the utility function."
```

**Context Files:**
- All frontend files (search across codebase)
- `frontend/lib/imageUtils.ts` (final version)

**Expected Output:** Confirmation that all instances have been refactored and list any missed files

---

## **🧪 Testing Sequence:**

1. **Start with Step 1** (Create Utility) - Foundation for all other steps
2. **Steps 2-5** (Refactor Components) - Can be done in parallel 
3. **Step 6** (Verification) - Ensure completeness

## **🔍 What to Evaluate:**

- **Consistency**: Does the utility function handle all variations of the pattern?
- **Type Safety**: Does it properly use TypeScript types (Game, GameImage)?
- **Functionality**: Do images still display correctly after refactoring?
- **Import Statements**: Are imports added correctly to each refactored file?
- **Code Reduction**: Has duplicated code been eliminated?
- **Maintainability**: Is the utility function easy to understand and modify?

## **📊 Success Criteria:**

✅ Single utility function created in `lib/imageUtils.ts`  
✅ All 4+ components refactored to use the utility  
✅ Removed 15+ lines of duplicated code  
✅ Images still display correctly across the application  
✅ Proper TypeScript imports and typing maintained  
✅ Consistent fallback behavior to placeholder image  
✅ No remaining instances of old pattern in codebase  

## **🎯 Goal:**

Test whether Cody can successfully identify, extract, and replace duplicated code patterns across multiple files. This validates Cody's ability to perform systematic refactoring while maintaining functionality and following existing code conventions.

## **💡 Key Refactoring Patterns to Identify:**

**Before (Pattern A):**
```tsx
const primaryImage = game.images?.find(img => img.isPrimary)?.url;
const imageUrl = primaryImage 
  ? `${process.env.NEXT_PUBLIC_API_URL}${primaryImage}`
  : '/placeholder-game.jpg';
```

**Before (Pattern B):**
```tsx
const primaryImage = game.images?.find(img => img.isPrimary);
const imageUrl = primaryImage
  ? `${process.env.NEXT_PUBLIC_API_URL}${primaryImage.url}`
  : '/placeholder-game.jpg';
```

**After:**
```tsx
import { getGameImageUrl } from '@/lib/imageUtils';
const imageUrl = getGameImageUrl(game);
```

**Ready to test? Start with Step 1 and evaluate Cody's refactoring capabilities!**
