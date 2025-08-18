"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderManagementPage() {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const API_BASE_URL = "http://localhost:9999/api/admin/orders";

   const fetchOrders = async () => {
      setLoading(true);
      try {
         const token = localStorage.getItem("adminToken");
         const response = await axios.get(API_BASE_URL, {
            headers: { Authorization: `Bearer ${token}` },
         });
         setOrders(response.data.data);
      } catch (err) {
         setError("Failed to fetch orders.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchOrders();
   }, []);

   const handleStatusChange = async (orderId, newStatus) => {
      try {
         const token = localStorage.getItem("adminToken");
         await axios.put(`${API_BASE_URL}/${orderId}/status`, 
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
         );
         fetchOrders(); // Refresh data
      } catch (err) {
         setError("Failed to update order status.");
      }
   };

   const statusOptions = ["placed", "confirmed", "preparing", "out-for-delivery", "delivered", "cancelled"];

   return (
      <div>
         <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>
         
         {loading && <p>Loading orders...</p>}
         {error && <p className="text-red-500">{error}</p>}
         
         <div className="bg-white rounded-lg shadow-md p-4">
             <div className="overflow-x-auto">
                 <table className="min-w-full">
                     <thead className="bg-gray-50">
                         <tr>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                         </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                         {orders.map(order => (
                             <tr key={order._id}>
                                 <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                                 <td className="px-6 py-4 text-sm text-gray-500">{order.userId.name}</td>
                                 <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                 <td className="px-6 py-4 text-sm text-gray-500">₹{order.finalAmount}</td>
                                 <td className="px-6 py-4 text-sm">
                                     <select 
                                         value={order.orderStatus} 
                                         onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                         className="p-1 border rounded-md text-xs"
                                     >
                                         {statusOptions.map(status => (
                                             <option key={status} value={status}>{status.replace('-', ' ')}</option>
                                         ))}
                                     </select>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
         </div>
      </div>
   );
}