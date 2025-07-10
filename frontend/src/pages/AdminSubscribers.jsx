import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const { data } = await axios.get("http://localhost:9000/api/subscribers");
        setSubscribers(data);
      } catch (error) {
        console.error("Failed to fetch subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/subscribers/${id}`); // ✅ Fix API path here
      setSubscribers(prev => prev.filter(sub => sub._id !== id));
    } catch (error) {
      console.error("Failed to delete subscriber", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🧾 Newsletter Subscribers</h1>
      {loading ? (
        <p>Loading subscribers...</p>
      ) : subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300">#</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Subscribed At</th>
              <th className="p-3 border border-gray-300">Action</th> {/* ✅ Add Action header */}
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={subscriber._id} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300">{index + 1}</td>
                <td className="p-3 border border-gray-300">{subscriber.email}</td>
                <td className="p-3 border border-gray-300">
                  {new Date(subscriber.subscribedAt).toLocaleString()}
                </td>
                <td className="p-3 border border-gray-300"> {/* ✅ Delete Button Cell */}
                  <button
                    onClick={() => handleDelete(subscriber._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSubscribers;
