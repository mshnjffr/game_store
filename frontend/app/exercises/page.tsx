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
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">Exercise 1</span>
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

        <div className="text-center text-gray-500 mt-8">
          <p>More exercises coming soon...</p>
        </div>
      </div>
    </div>
  );
}
