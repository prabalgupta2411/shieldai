import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TestConnection = () => {
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/test-connection`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Backend connection successful! 🎉');
      console.log('Connection test response:', response.data);
    } catch (error) {
      toast.error('Connection failed: ' + (error.response?.data?.error || error.message));
      console.error('Connection test error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Test API Connection</h3>
      <button
        onClick={testConnection}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </button>
    </div>
  );
};

export default TestConnection; 