"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { auth } from "../../../services/firebase";
import axios from "axios";

const OrderDetailsPage = () => {
   const params = useParams();
   const router = useRouter();
   const { user } = useSelector((state) => state.auth);
   const [order, setOrder] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const orderId = params.id;

   useEffect(() => {
      if (!user) {
         router.push("/"); // Redirect if not authenticated
         return;
      }

      fetchOrderDetails();
   }, [user, orderId]);

   const fetchOrderDetails = async () => {
      try {
         const currentUser = auth.currentUser;
         if (!currentUser) {
            throw new Error("User not authenticated");
         }

         const token = await currentUser.getIdToken();

         const response = await axios.get(
            `http://localhost:9999/api/orders/${orderId}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         setOrder(response.data);
      } catch (err) {
         console.error("Failed to fetch order:", err);
         setError(
            err.response?.data?.error || err.message || "Failed to load order"
         );
      } finally {
         setLoading(false);
      }
   };

   const getStatusColor = (status) => {
      const colors = {
         placed: "bg-blue-100 text-blue-800",
         confirmed: "bg-yellow-100 text-yellow-800",
         preparing: "bg-orange-100 text-orange-800",
         ready: "bg-purple-100 text-purple-800",
         dispatched: "bg-indigo-100 text-indigo-800",
         delivered: "bg-green-100 text-green-800",
         cancelled: "bg-red-100 text-red-800",
      };
      return colors[status] || "bg-gray-100 text-gray-800";
   };

   const getPaymentStatusColor = (status) => {
      const colors = {
         pending: "bg-yellow-100 text-yellow-800",
         completed: "bg-green-100 text-green-800",
         failed: "bg-red-100 text-red-800",
         refunded: "bg-gray-100 text-gray-800",
      };
      return colors[status] || "bg-gray-100 text-gray-800";
   };

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
               <p className="mt-4 text-gray-600">Loading order details...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <div className="text-red-500 text-6xl mb-4">⚠️</div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Order Not Found
               </h2>
               <p className="text-gray-600 mb-4">{error}</p>
               <button
                  onClick={() => router.push("/")}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
               >
                  Go Home
               </button>
            </div>
         </div>
      );
   }

   if (!order) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <p className="text-gray-600">Order not found</p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-50 py-8 pt-24">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                     <h1 className="text-2xl font-bold text-gray-900">
                        Order Details
                     </h1>
                     <p className="text-gray-600">Order #{order.orderNumber}</p>
                     <p className="text-sm text-gray-500">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                           year: "numeric",
                           month: "long",
                           day: "numeric",
                           hour: "2-digit",
                           minute: "2-digit",
                        })}
                     </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col items-end">
                     <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                           order.orderStatus
                        )}`}
                     >
                        {order.orderStatus.charAt(0).toUpperCase() +
                           order.orderStatus.slice(1)}
                     </span>
                     <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${getPaymentStatusColor(
                           order.paymentStatus
                        )}`}
                     >
                        Payment:{" "}
                        {order.paymentStatus.charAt(0).toUpperCase() +
                           order.paymentStatus.slice(1)}
                     </span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Order Items */}
               <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                     Order Items
                  </h2>
                  <div className="space-y-4">
                     {order.items.map((item, index) => (
                        <div
                           key={index}
                           className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                        >
                           <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                              <span className="text-gray-500">🍽️</span>
                           </div>
                           <div className="flex-1">
                              <h3 className="font-medium text-gray-900">
                                 Menu Item ID: {item.menuItem}
                              </h3>
                              <p className="text-sm text-gray-600">
                                 Quantity: {item.quantity}
                              </p>
                              <p className="text-sm text-gray-600">
                                 Price: ₹{item.price} each
                              </p>
                              {item.specialInstructions && (
                                 <p className="text-sm text-gray-500 italic">
                                    Note: {item.specialInstructions}
                                 </p>
                              )}
                           </div>
                           <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                 ₹{item.price * item.quantity}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4 mt-4">
                     <div className="space-y-2">
                        <div className="flex justify-between">
                           <span className="text-gray-600">Subtotal:</span>
                           <span>₹{order.totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">
                              Delivery Charges:
                           </span>
                           <span>₹{order.deliveryCharges}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Taxes:</span>
                           <span>₹{order.taxes}</span>
                        </div>
                        {order.discountAmount > 0 && (
                           <div className="flex justify-between text-green-600">
                              <span>Discount:</span>
                              <span>-₹{order.discountAmount}</span>
                           </div>
                        )}
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                           <span>Total:</span>
                           <span>₹{order.finalAmount}</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Delivery Information */}
               <div className="space-y-6">
                  {/* Delivery Address */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                     <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Delivery Address
                     </h2>
                     <div className="text-gray-600">
                        <p className="font-medium text-gray-900">
                           {order.deliveryAddress.label || "Address"}
                        </p>
                        <p>{order.deliveryAddress.addressLine1}</p>
                        {order.deliveryAddress.addressLine2 && (
                           <p>{order.deliveryAddress.addressLine2}</p>
                        )}
                        <p>
                           {order.deliveryAddress.city},{" "}
                           {order.deliveryAddress.state}
                        </p>
                        <p>{order.deliveryAddress.pincode}</p>
                        {order.deliveryAddress.landmark && (
                           <p className="text-sm text-gray-500">
                              Near: {order.deliveryAddress.landmark}
                           </p>
                        )}
                     </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                     <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Payment Information
                     </h2>
                     <div className="space-y-2">
                        <div className="flex justify-between">
                           <span className="text-gray-600">
                              Payment Method:
                           </span>
                           <span className="capitalize">
                              {order.paymentMethod.replace("_", " ")}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">
                              Payment Status:
                           </span>
                           <span
                              className={`capitalize ${getPaymentStatusColor(
                                 order.paymentStatus
                              )} px-2 py-1 rounded text-sm`}
                           >
                              {order.paymentStatus}
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Order Timeline */}
                  {order.statusHistory && order.statusHistory.length > 0 && (
                     <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                           Order Timeline
                        </h2>
                        <div className="space-y-3">
                           {order.statusHistory.map((status, index) => (
                              <div
                                 key={index}
                                 className="flex items-start space-x-3"
                              >
                                 <div
                                    className={`w-3 h-3 rounded-full mt-1 ${
                                       getStatusColor(status.status).split(
                                          " "
                                       )[0]
                                    }`}
                                 ></div>
                                 <div className="flex-1">
                                    <p className="font-medium text-gray-900 capitalize">
                                       {status.status}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                       {new Date(
                                          status.timestamp
                                       ).toLocaleString("en-IN")}
                                    </p>
                                    {status.note && (
                                       <p className="text-sm text-gray-500">
                                          {status.note}
                                       </p>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Customer Notes */}
                  {order.customerNotes && (
                     <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                           Special Instructions
                        </h2>
                        <p className="text-gray-600">{order.customerNotes}</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
               <button
                  onClick={() => router.push("/")}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
               >
                  Continue Shopping
               </button>

               {["placed", "confirmed"].includes(order.orderStatus) && (
                  <button
                     onClick={() => {
                        // Add cancel order functionality here
                        alert("Cancel order functionality to be implemented");
                     }}
                     className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                     Cancel Order
                  </button>
               )}

               {order.orderStatus === "delivered" && !order.isReviewed && (
                  <button
                     onClick={() => {
                        // Add review functionality here
                        alert("Review functionality to be implemented");
                     }}
                     className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                     Write Review
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default OrderDetailsPage;
