import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../../store/slices/firebaseSlice";
import axios from "axios";
import { apiClient } from "../../services/apiClient";

const AddressModal = ({ addresses = [], onSelect, onClose }) => {
   const dispatch = useDispatch();
   //    const { user } = useSelector((state) => state.auth);
   const [showAddNew, setShowAddNew] = useState(false);
   const [saving, setSaving] = useState(false);
   const [newAddress, setNewAddress] = useState({
      label: "Home",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
   });

   const handleInputChange = (field, value) => {
      setNewAddress((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   const handleSave = async () => {
      // Validate required fields
      if (
         !newAddress.addressLine1.trim() ||
         !newAddress.city.trim() ||
         !newAddress.state.trim() ||
         !newAddress.pincode.trim()
      ) {
         alert(
            "Please fill all required fields (Address Line 1, City, State, Pincode)"
         );
         return;
      }

      try {
         setSaving(true);

         //using apiClient utility that handles token retrieval
         const response = await apiClient("/api/post/user-details", "POST", {
            addresses: [...addresses, newAddress],
         });

         // Update Redux store
         dispatch(updateUserDetails(response));

         // Select the newly added address
         onSelect(newAddress);

         //  // Get token from firebase auth instance
         //  const currentUser = auth.currentUser;
         //  if (!currentUser) {
         //     throw new Error("User not authenticated");
         //  }

         //  const token = await currentUser.getIdToken();

         //  // Send new address to backend
         //  const response = await axios.post(
         //     "/api/post/user-details",
         //     {
         //        addresses: [...addresses, newAddress], // Add new address to existing ones
         //     },
         //     {
         //        headers: { Authorization: `Bearer ${token}` },
         //     }
         //  );

         //  if (response.data.success) {
         //     // Update Redux store with new user details
         //     dispatch(updateUserDetails(response.data.data));

         //     // Select the newly added address
         //     onSelect(newAddress);
         //  } else {
         //     throw new Error(response.data.message || "Failed to save address");
         //  }
      } catch (error) {
         console.error("Error saving address:", error);
         alert(
            "Failed to save address: " +
               (error.response?.data?.message || error.message)
         );
      } finally {
         setSaving(false);
      }
   };

   const resetForm = () => {
      setNewAddress({
         label: "Home",
         addressLine1: "",
         addressLine2: "",
         city: "",
         state: "",
         pincode: "",
         landmark: "",
      });
      setShowAddNew(false);
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Choose Address</h2>

            {!showAddNew ? (
               <>
                  {/* Show existing addresses */}
                  {addresses && addresses.length > 0 ? (
                     <div className="space-y-2 mb-4">
                        {addresses.map((addr, i) => (
                           <div
                              key={addr._id || i}
                              className="border p-3 rounded mb-2 cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={() => onSelect(addr)}
                           >
                              <p className="font-semibold text-green-600">
                                 {addr.label}
                              </p>
                              <p className="text-sm">{addr.addressLine1}</p>
                              {addr.addressLine2 && (
                                 <p className="text-sm">{addr.addressLine2}</p>
                              )}
                              <p className="text-sm">
                                 {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                              {addr.landmark && (
                                 <p className="text-xs text-gray-500">
                                    Near: {addr.landmark}
                                 </p>
                              )}
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-gray-500 mb-4">
                        No saved addresses found
                     </p>
                  )}

                  <button
                     onClick={() => setShowAddNew(true)}
                     className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                     + Add New Address
                  </button>
               </>
            ) : (
               <>
                  {/* Add new address form */}
                  <div className="space-y-3">
                     <input
                        type="text"
                        placeholder="Label (Home/Office/etc)*"
                        value={newAddress.label}
                        onChange={(e) =>
                           handleInputChange("label", e.target.value)
                        }
                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     <input
                        type="text"
                        placeholder="Address Line 1*"
                        value={newAddress.addressLine1}
                        onChange={(e) =>
                           handleInputChange("addressLine1", e.target.value)
                        }
                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     <input
                        type="text"
                        placeholder="Address Line 2"
                        value={newAddress.addressLine2}
                        onChange={(e) =>
                           handleInputChange("addressLine2", e.target.value)
                        }
                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                     <div className="flex gap-2">
                        <input
                           type="text"
                           placeholder="City*"
                           value={newAddress.city}
                           onChange={(e) =>
                              handleInputChange("city", e.target.value)
                           }
                           className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                           type="text"
                           placeholder="State*"
                           value={newAddress.state}
                           onChange={(e) =>
                              handleInputChange("state", e.target.value)
                           }
                           className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                     <div className="flex gap-2">
                        <input
                           type="text"
                           placeholder="Pincode*"
                           value={newAddress.pincode}
                           onChange={(e) =>
                              handleInputChange("pincode", e.target.value)
                           }
                           className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                           type="text"
                           placeholder="Landmark"
                           value={newAddress.landmark}
                           onChange={(e) =>
                              handleInputChange("landmark", e.target.value)
                           }
                           className="border p-2 flex-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                     <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                     >
                        {saving ? "Saving..." : "Save Address"}
                     </button>
                     <button
                        onClick={resetForm}
                        className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition-colors"
                     >
                        Cancel
                     </button>
                  </div>
               </>
            )}

            <button
               onClick={onClose}
               className="mt-4 w-full border py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
               Close
            </button>
         </div>
      </div>
   );
};

export default AddressModal;

// import { useState } from "react";

// const AddressModal = ({ addresses, onSelect, onClose }) => {
//    const [showAddNew, setShowAddNew] = useState(false);
//    const [newAddress, setNewAddress] = useState({
//       label: "Home",
//       addressLine1: "",
//       city: "",
//       state: "",
//       pincode: "",
//    });

//    const handleSave = () => {
//       if (
//          !newAddress.addressLine1 ||
//          !newAddress.city ||
//          !newAddress.state ||
//          !newAddress.pincode
//       ) {
//          alert("Please fill all required fields");
//          return;
//       }
//       onSelect(newAddress);
//    };

//    return (
//       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//          <div className="bg-white rounded-lg p-6 w-96">
//             <h2 className="text-lg font-bold mb-4">Choose Address</h2>

//             {!showAddNew ? (
//                <>
//                   {addresses.length > 0 ? (
//                      addresses.map((addr, i) => (
//                         <div
//                            key={i}
//                            className="border p-3 rounded mb-2 cursor-pointer hover:bg-gray-100"
//                            onClick={() => onSelect(addr)}
//                         >
//                            <p className="font-semibold">{addr.label}</p>
//                            <p>{addr.addressLine1}</p>
//                            <p>
//                               {addr.city}, {addr.state} - {addr.pincode}
//                            </p>
//                         </div>
//                      ))
//                   ) : (
//                      <p className="text-gray-500 mb-2">No saved addresses</p>
//                   )}
//                   <button
//                      onClick={() => setShowAddNew(true)}
//                      className="w-full bg-blue-600 text-white py-2 rounded-lg"
//                   >
//                      + Add New Address
//                   </button>
//                </>
//             ) : (
//                <>
//                   <input
//                      type="text"
//                      placeholder="Label (Home/Work/etc)"
//                      value={newAddress.label}
//                      onChange={(e) =>
//                         setNewAddress({ ...newAddress, label: e.target.value })
//                      }
//                      className="border p-2 w-full mb-2 rounded"
//                   />
//                   <input
//                      type="text"
//                      placeholder="Address Line 1"
//                      value={newAddress.addressLine1}
//                      onChange={(e) =>
//                         setNewAddress({
//                            ...newAddress,
//                            addressLine1: e.target.value,
//                         })
//                      }
//                      className="border p-2 w-full mb-2 rounded"
//                   />
//                   <input
//                      type="text"
//                      placeholder="City"
//                      value={newAddress.city}
//                      onChange={(e) =>
//                         setNewAddress({ ...newAddress, city: e.target.value })
//                      }
//                      className="border p-2 w-full mb-2 rounded"
//                   />
//                   <input
//                      type="text"
//                      placeholder="State"
//                      value={newAddress.state}
//                      onChange={(e) =>
//                         setNewAddress({ ...newAddress, state: e.target.value })
//                      }
//                      className="border p-2 w-full mb-2 rounded"
//                   />
//                   <input
//                      type="text"
//                      placeholder="Pincode"
//                      value={newAddress.pincode}
//                      onChange={(e) =>
//                         setNewAddress({
//                            ...newAddress,
//                            pincode: e.target.value,
//                         })
//                      }
//                      className="border p-2 w-full mb-2 rounded"
//                   />

//                   <div className="flex gap-2 mt-3">
//                      <button
//                         onClick={handleSave}
//                         className="flex-1 bg-green-600 text-white py-2 rounded-lg"
//                      >
//                         Save
//                      </button>
//                      <button
//                         onClick={() => setShowAddNew(false)}
//                         className="flex-1 border py-2 rounded-lg"
//                      >
//                         Cancel
//                      </button>
//                   </div>
//                </>
//             )}

//             <button
//                onClick={onClose}
//                className="mt-4 w-full border py-2 rounded-lg"
//             >
//                Close
//             </button>
//          </div>
//       </div>
//    );
// };

// export default AddressModal;
