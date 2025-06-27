export default function ExercisesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Coding Exercises</h1>
        <p className="text-gray-600 mb-8">
          Practical exercises to improve your development skills using AI coding assistants.
        </p>

        {/* Exercise 1: Code Understanding with AI Assistants */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-sm">Exercise 1</span>
            <h2 className="text-xl font-semibold">Code Understanding with Cody</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-gray-600">
              Learn to effectively use Cody for understanding existing codebases.
            </p>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📁 Key Files to Include as Context</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Backend Files:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <code>backend/prisma/schema.prisma</code></li>
                      <li>• <code>backend/src/server.js</code></li>
                      <li>• <code>backend/src/controllers/gamesController.js</code></li>
                      <li>• <code>backend/src/controllers/authController.js</code></li>
                      <li>• <code>backend/src/controllers/ordersController.js</code></li>
                      <li>• <code>backend/src/routes/index.js</code></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Frontend Files:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <code>frontend/app/page.tsx</code> (homepage)</li>
                      <li>• <code>frontend/app/games/page.tsx</code></li>
                      <li>• <code>frontend/app/checkout/page.tsx</code></li>
                      <li>• <code>frontend/lib/api.ts</code></li>
                      <li>• <code>frontend/components/layout/Navigation.tsx</code></li>
                      <li>• <code>package.json</code> (both root and frontend)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">💬 Example Prompts for Cody</h3>
              <div className="space-y-3">
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h4 className="font-medium text-blue-900 mb-1">Architecture Overview</h4>
                  <p className="text-blue-800 text-sm italic mb-2">"Analyze the overall architecture of this application. What are the main layers and how do they communicate?"</p>
                  <p className="text-xs text-blue-600">Include: server.js, schema.prisma, api.ts, package.json files</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h4 className="font-medium text-green-900 mb-1">Data Flow Analysis</h4>
                  <p className="text-green-800 text-sm italic mb-2">"Trace the data flow from when a user adds a game to cart until the order is completed. What happens at each step?"</p>
                  <p className="text-xs text-green-600">Include: checkout/page.tsx, checkout/success/page.tsx, ordersController.js, schema.prisma, api.ts</p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                  <h4 className="font-medium text-purple-900 mb-1">Authentication System</h4>
                  <p className="text-purple-800 text-sm italic mb-2">"How does user authentication work in this app? What are the security measures in place?"</p>
                  <p className="text-xs text-purple-600">Include: authController.js, server.js, middleware/auth.js, Navigation.tsx, api.ts</p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h4 className="font-medium text-orange-900 mb-1">Database Schema Understanding</h4>
                  <p className="text-orange-800 text-sm italic mb-2">"Explain the database relationships and why they're designed this way. What business logic do they represent?"</p>
                  <p className="text-xs text-orange-600">Include: schema.prisma, seed.js</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h4 className="font-medium text-red-900 mb-1">API Design Analysis</h4>
                  <p className="text-red-800 text-sm italic mb-2">"Analyze the REST API design. Are there any inconsistencies or areas for improvement?"</p>
                  <p className="text-xs text-red-600">Include: All controller files, routes/index.js, api.ts</p>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
                  <h4 className="font-medium text-gray-900 mb-1">Code Quality Assessment</h4>
                  <p className="text-gray-800 text-sm italic mb-2">"Review this component/controller for code quality, potential bugs, and improvement suggestions."</p>
                  <p className="text-xs text-gray-600">Include: Any specific file you want to review</p>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Exercise 2: Code Generation with AI Assistants */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-sm">Exercise 2</span>
            <h2 className="text-xl font-semibold">Code Generation with Cody</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-gray-600">
              Learn to effectively use Cody for generating new features by implementing a complete wishlist system.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="font-semibold text-blue-900 mb-2">🎯 Goal</h3>
              <p className="text-blue-800 text-sm">
                Implement a complete wishlist feature from scratch using step-by-step Cody prompts. This tests whether Cody can generate production-ready code by following existing patterns.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📋 Implementation Steps</h3>
              <div className="space-y-3">
                
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                  <h4 className="font-medium text-purple-900 mb-1">Step 1: Database Schema Design</h4>
                  <p className="text-purple-800 text-sm italic mb-2">"I need to add a wishlist feature to this e-commerce game application. Based on the existing database schema and patterns, create a Prisma schema for the Wishlist model with proper relationships and constraints."</p>
                  <p className="text-xs text-purple-600">Include: schema.prisma, seed.js</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h4 className="font-medium text-blue-900 mb-1">Step 2: Backend API Endpoints</h4>
                  <p className="text-blue-800 text-sm italic mb-2">"Create RESTful API endpoints for wishlist management (get user wishlist, add game to wishlist, remove from wishlist). Follow the existing controller patterns and error handling conventions."</p>
                  <p className="text-xs text-blue-600">Include: gamesController.js, ordersController.js, routes/index.js, config/prisma.js</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h4 className="font-medium text-green-900 mb-1">Step 3: Frontend API Client</h4>
                  <p className="text-green-800 text-sm italic mb-2">"Create SIMPLE API client methods for wishlist operations. Use existing patterns and Game type. IMPORTANT: Only create basic CRUD operations that match the backend endpoints exactly."</p>
                  <p className="text-xs text-green-600">Include: lib/api.ts, types/index.ts, wishlistController.js (from Step 2)</p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h4 className="font-medium text-orange-900 mb-1">Step 4: Wishlist Page Component</h4>
                  <p className="text-orange-800 text-sm italic mb-2">"Create a wishlist page component. CRITICAL: Use exact image pattern game.images?.find(img =&gt; img.isPrimary)?.url, use existing Game type, handle API failures gracefully."</p>
                  <p className="text-xs text-orange-600">Include: games/page.tsx, components/game/GameCard.tsx, cart/page.tsx (for image patterns)</p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h4 className="font-medium text-red-900 mb-1">Steps 5-8: Integration & Testing</h4>
                  <p className="text-red-800 text-sm italic mb-2">Add wishlist buttons to game cards, integrate navigation, create database migration, and test the complete feature.</p>
                  <p className="text-xs text-red-600">Include: Navigation.tsx, ui/button.tsx, existing component patterns</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">📖 Detailed Guide</h3>
              <p className="text-yellow-800 text-sm">
                For complete step-by-step prompts, context files, and testing criteria, see: 
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs mx-1">ai-docs/wishlist_implementation.md</code>
              </p>
            </div>
          </div>
        </div>

        {/* Exercise 3: Refactoring with AI Assistants */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-sm">Exercise 3</span>
            <h2 className="text-xl font-semibold">Refactoring with Cody</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-gray-600">
              Learn to use Cody for systematic refactoring by extracting duplicated image URL construction logic into a reusable utility function.
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
              <h3 className="font-semibold text-orange-900 mb-2">🎯 Goal</h3>
              <p className="text-orange-800 text-sm">
                Extract repeated image URL construction pattern found in 5+ components into a single utility function. This demonstrates systematic code cleanup and DRY principles.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔍 Duplicated Pattern to Refactor</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-600 mb-2">Found in GameCard, GameDetails, Cart, and Checkout components:</p>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`const primaryImage = game.images?.find(img => img.isPrimary)?.url;
const imageUrl = primaryImage 
  ? \`\${process.env.NEXT_PUBLIC_API_URL}\${primaryImage}\`
  : '/placeholder-game.jpg';`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📋 Refactoring Steps</h3>
              <div className="space-y-3">
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h4 className="font-medium text-blue-900 mb-1">Step 1: Create Utility Function</h4>
                  <p className="text-blue-800 text-sm italic mb-2">"I've found duplicated image URL construction logic across multiple components. Create a utility function that takes a Game object and returns the full image URL, handling primary image selection and fallback."</p>
                  <p className="text-xs text-blue-600">Include: lib/utils.ts, types/index.ts, components/game/GameCard.tsx</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h4 className="font-medium text-green-900 mb-1">Step 2: Refactor GameCard Component</h4>
                  <p className="text-green-800 text-sm italic mb-2">"Replace the duplicated image URL construction logic in GameCard with the new utility function. Remove the manual primaryImage and imageUrl logic."</p>
                  <p className="text-xs text-green-600">Include: components/game/GameCard.tsx, lib/imageUtils.ts (from Step 1)</p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                  <h4 className="font-medium text-purple-900 mb-1">Step 3: Refactor GameDetails Component</h4>
                  <p className="text-purple-800 text-sm italic mb-2">"Replace the image URL construction in GameDetails. Note: this component has a slightly different pattern - it gets primaryImage object first, then accesses .url."</p>
                  <p className="text-xs text-purple-600">Include: components/game/GameDetails.tsx, lib/imageUtils.ts</p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h4 className="font-medium text-yellow-900 mb-1">Steps 4-6: Refactor Cart, Checkout &amp; Verify</h4>
                  <p className="text-yellow-800 text-sm italic mb-2">Replace the pattern in cart and checkout pages, then search the codebase for any remaining instances to ensure complete refactoring.</p>
                  <p className="text-xs text-yellow-600">Include: app/cart/page.tsx, app/checkout/page.tsx, search entire frontend</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✨ Expected Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="font-medium mb-2">Before:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 15+ lines of duplicated code</li>
                    <li>• 5+ components with same logic</li>
                    <li>• Manual image URL construction</li>
                    <li>• Inconsistent fallback handling</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="font-medium mb-2">After:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Single utility function</li>
                    <li>• One line: getGameImageUrl(game)</li>
                    <li>• Consistent behavior everywhere</li>
                    <li>• Easy to maintain and modify</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">📖 Detailed Guide</h3>
              <p className="text-yellow-800 text-sm">
                For complete step-by-step prompts, context files, and testing criteria, see: 
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs mx-1">ai-docs/image_refactoring.md</code>
              </p>
            </div>
          </div>
        </div>

        {/* Exercise 4: Backend Testing with AI Assistants */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-sm">Exercise 4</span>
            <h2 className="text-xl font-semibold">Backend Testing with Cody</h2>
          </div>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-gray-600">
              Learn to use Cody for generating comprehensive unit tests for backend API controllers with proper mocking and error handling.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
              <h3 className="font-semibold text-purple-900 mb-2">🎯 Goal</h3>
              <p className="text-purple-800 text-sm">
                Create focused unit tests for backend controllers using Jest and Prisma mocking. Demonstrates systematic testing approach with proper error scenarios and response validation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📋 Testing Steps</h3>
              <div className="space-y-3">
                
                <div className="bg-gray-50 border-l-4 border-gray-400 p-4">
                  <h4 className="font-medium text-gray-900 mb-1">Step 1: Setup Testing Environment</h4>
                  <p className="text-gray-800 text-sm italic mb-2">"Set up a basic Jest testing environment for this Express.js backend. Create Jest configuration file and simple Prisma client mocking. No database setup needed - just mock the Prisma client."</p>
                  <p className="text-xs text-gray-600">Include: package.json, src/config/prisma.js</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h4 className="font-medium text-blue-900 mb-1">Step 2: Orders Controller Tests</h4>
                  <p className="text-blue-800 text-sm italic mb-2">"Create unit tests for the orders controller covering createOrder, getUserOrders, and getOrderById. Focus on testing successful operations, basic validation, and error handling."</p>
                  <p className="text-xs text-blue-600">Include: controllers/ordersController.js, prisma/schema.prisma</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h4 className="font-medium text-green-900 mb-1">Step 3: Users Controller Tests</h4>
                  <p className="text-green-800 text-sm italic mb-2">"Create unit tests for the users controller covering getUserProfile, updateUserProfile, and getUserStats. Focus on basic functionality testing, simple validation, and error scenarios."</p>
                  <p className="text-xs text-green-600">Include: controllers/usersController.js, utils/logger.js</p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h4 className="font-medium text-yellow-900 mb-1">Step 4: Test Utilities</h4>
                  <p className="text-yellow-800 text-sm italic mb-2">"Create simple test utility functions to support the unit tests. Include basic mock data generators for orders and users. Keep utilities minimal and focused."</p>
                  <p className="text-xs text-yellow-600">Include: prisma/seed.js, prisma/schema.prisma</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">📖 Detailed Guide</h3>
              <p className="text-yellow-800 text-sm">
                For complete step-by-step prompts, context files, and testing patterns, see: 
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs mx-1">ai-docs/test_generation.md</code>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8">
          <p>More exercises coming soon...</p>
        </div>
      </div>
    </div>
  );
}
