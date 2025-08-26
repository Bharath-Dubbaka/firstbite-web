import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddressModal from "./AddressModal";
import { useRouter } from "next/router";
import { auth } from "../services/firebase";

const CheckoutPage = () => {
   const { cart } = useSelector((state) => state);
   const router = useRouter();
   const [selectedAddress, setSelectedAddress] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [deliverTo, setDeliverTo] = useState("me");
   const [otherContact, setOtherContact] = useState({ name: "", phone: "" });

   const handlePlaceOrder = async () => {
      try {
         if (!selectedAddress) {
            alert("Please select a delivery address");
            return;
         }

         const payload = {
            items: cart.items.map((i) => ({
               menuItem: i._id,
               quantity: i.qty,
               price: i.price,
            })),
            deliveryAddress: selectedAddress,
            totalAmount: cart.totalAmount,
            finalAmount: cart.totalAmount,
            paymentMethod: "cod",
            customerNotes:
               deliverTo === "others"
                  ? `Deliver to ${otherContact.name} (${otherContact.phone})`
                  : "",
         };

         // Get token  from firebase auth instance
         const currentUser = auth.currentUser;
         if (!currentUser) {
            throw new Error("User not authenticated");
         }

         const token = await currentUser.getIdToken();
         const { data } = await axios.post("/api/orders", payload, {
            headers: { Authorization: `Bearer ${token}` },
         });

         router.push(`/orders/${data._id}`);
      } catch (error) {
         console.error("Checkout error", error);
         alert("Failed to place order: " + error.message);
      }
   };

   return (
      <div className="max-w-3xl mx-auto p-6">
         <h1 className="text-2xl font-bold mb-4">Checkout</h1>

         {/* Cart summary */}
         <div className="border p-4 rounded-lg mb-4">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            {cart.items.map((item) => (
               <div key={item._id} className="flex justify-between mb-1">
                  <span>
                     {item.name} × {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
               </div>
            ))}
            <div className="font-bold flex justify-between border-t pt-2">
               <span>Total</span>
               <span>₹{cart.totalAmount}</span>
            </div>
         </div>

         {/* Address */}
         <div className="border p-4 rounded-lg mb-4">
            <h2 className="font-semibold mb-2">Delivery Address</h2>
            {selectedAddress ? (
               <div>
                  <p>{selectedAddress.label}</p>
                  <p>{selectedAddress.addressLine1}</p>
                  <p>
                     {selectedAddress.city}, {selectedAddress.state} -{" "}
                     {selectedAddress.pincode}
                  </p>
               </div>
            ) : (
               <p className="text-gray-500">No address selected</p>
            )}
            <button
               onClick={() => setShowModal(true)}
               className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
               Choose Address
            </button>
         </div>

         {/* Deliver to */}
         <div className="border p-4 rounded-lg mb-4">
            <h2 className="font-semibold mb-2">Delivery Options</h2>
            <label className="mr-4">
               <input
                  type="radio"
                  value="me"
                  checked={deliverTo === "me"}
                  onChange={() => setDeliverTo("me")}
               />
               Deliver to me
            </label>
            <label>
               <input
                  type="radio"
                  value="others"
                  checked={deliverTo === "others"}
                  onChange={() => setDeliverTo("others")}
               />
               Deliver to someone else
            </label>

            {deliverTo === "others" && (
               <div className="mt-3">
                  <input
                     type="text"
                     placeholder="Recipient Name"
                     value={otherContact.name}
                     onChange={(e) =>
                        setOtherContact({
                           ...otherContact,
                           name: e.target.value,
                        })
                     }
                     className="border p-2 w-full mb-2 rounded"
                  />
                  <input
                     type="text"
                     placeholder="Recipient Phone"
                     value={otherContact.phone}
                     onChange={(e) =>
                        setOtherContact({
                           ...otherContact,
                           phone: e.target.value,
                        })
                     }
                     className="border p-2 w-full rounded"
                  />
               </div>
            )}
         </div>

         <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 w-full"
         >
            Place Order
         </button>

         {/* Address modal */}
         {showModal && (
            <AddressModal
               addresses={userDetails?.addresses || []}
               onClose={() => setShowModal(false)}
               onSelect={(addr) => {
                  setSelectedAddress(addr);
                  setShowModal(false);
               }}
            />
         )}
      </div>
   );
};

export default CheckoutPage;
