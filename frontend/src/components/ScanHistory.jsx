import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScanHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/filescan/history`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setHistory(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching scan history');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Scan History</h2>
      
      {history.length === 0 ? (
        <p className="text-gray-500">No scan history available</p>
      ) : (
        <div className="space-y-4">
          {history.map((scan, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{scan.fileName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(scan.scanDate).toLocaleString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${scan.isInfected ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {scan.isInfected ? 'Infected' : 'Clean'}
                </span>
              </div>
              
              {scan.viruses && scan.viruses.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Detected Viruses:</p>
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {scan.viruses.map((virus, vIndex) => (
                      <li key={vIndex}>{virus}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScanHistory; 