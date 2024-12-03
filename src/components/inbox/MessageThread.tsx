@@ .. @@
           value={input}
           onChange={(e) => setInput(e.target.value)}
-          placeholder="Type your message..."
+          placeholder="Tapez votre message..."
           className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
         />
         <button
           type="submit"
           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
         >
           <Send className="h-4 w-4" />
-          Send Message
+          {t.inbox.compose}
         </button>