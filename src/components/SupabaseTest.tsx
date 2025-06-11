import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [testData, setTestData] = useState<any>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test 1: Check if we can connect to Supabase
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);

      if (error) {
        throw error;
      }

      setConnectionStatus('success');
      setTestData(data);
    } catch (error: any) {
      setConnectionStatus('error');
      setErrorMessage(error.message || 'Unknown error occurred');
    }
  };

  const testTableAccess = async (tableName: string) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(5);

      if (error) {
        throw error;
      }

      return { success: true, data, count: data?.length || 0 };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const runTableTests = async () => {
    const tables = ['users', 'repositories', 'pull_requests', 'ai_reviews'];
    const results = [];

    for (const table of tables) {
      const result = await testTableAccess(table);
      results.push({ table, ...result });
    }

    console.log('Table access test results:', results);
    return results;
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Supabase Connection Test</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Connection Status:</h3>
        <div className={`p-3 rounded-lg ${
          connectionStatus === 'loading' ? 'bg-yellow-100 text-yellow-800' :
          connectionStatus === 'success' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {connectionStatus === 'loading' && 'Testing connection...'}
          {connectionStatus === 'success' && '✅ Connection successful!'}
          {connectionStatus === 'error' && `❌ Connection failed: ${errorMessage}`}
        </div>
      </div>

      {connectionStatus === 'success' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Environment Variables:</h3>
            <div className="bg-gray-100 p-3 rounded">
              <p><strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
              <p><strong>Supabase Anon Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Test Database Tables:</h3>
            <button
              onClick={runTableTests}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Table Access
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Check the browser console for detailed results
            </p>
          </div>

          {testData && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Test Query Result:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(testData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {connectionStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 p-4 rounded">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Troubleshooting:</h3>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            <li>Check that your .env file is in the project root</li>
            <li>Verify your Supabase URL and Anon Key are correct</li>
            <li>Make sure your Supabase project is active</li>
            <li>Check that your database tables exist</li>
          </ul>
        </div>
      )}
    </div>
  );
} 