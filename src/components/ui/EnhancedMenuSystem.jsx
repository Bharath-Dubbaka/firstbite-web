import React, { useState } from "react";
import {
   Plus,
   ShoppingCart,
   Star,
   Clock,
   Flame,
   Coffee,
   Utensils,
} from "lucide-react";

// Enhanced menu data with better variety
const cafeMenu = [
   {
      section: "Quick Bites",
      icon: <Coffee className="w-5 h-5" />,
      items: [
         {
            name: "Veg Puff",
            price: 70,
            image: "/cafe/latte.jpg",
            rating: 4.2,
            time: "10 min",
            spicy: 2,
         },
         {
            name: "Choco Lava Cake",
            price: 109,
            image: "/cafe/pancakes.jpg",
            rating: 4.7,
            time: "8 min",
            spicy: 0,
         },
         {
            name: "Paneer Sandwich",
            price: 139,
            image: "/cafe/fries.jpg",
            rating: 4.4,
            time: "12 min",
            spicy: 1,
         },
         {
            name: "Masala Chai",
            price: 60,
            image: "/cafe/coffee.jpg",
            rating: 4.5,
            time: "5 min",
            spicy: 1,
         },
         {
            name: "Cold Coffee",
            price: 90,
            image: "/cafe/fries.jpg",
            rating: 4.3,
            time: "3 min",
            spicy: 0,
         },
      ],
   },
   {
      section: "Hot & Cold Beverages",
      icon: <Coffee className="w-5 h-5" />,
      items: [
         {
            name: "Masala Chai",
            price: 60,
            image: "/cafe/pancakes.jpg",
            rating: 4.5,
            time: "5 min",
            spicy: 1,
         },
         {
            name: "Cold Coffee",
            price: 90,
            image: "/cafe/fries.jpg",
            rating: 4.3,
            time: "3 min",
            spicy: 0,
         },
         {
            name: "Green Tea",
            price: 50,
            image: "/cafe/latte.jpg",
            rating: 4.1,
            time: "4 min",
            spicy: 0,
         },
         {
            name: "Mango Lassi",
            price: 80,
            image: "/cafe/coffee.jpg",
            rating: 4.6,
            time: "5 min",
            spicy: 0,
         },
         {
            name: "Green Tea2",
            price: 50,
            image: "/cafe/latte.jpg",
            rating: 4.1,
            time: "4 min",
            spicy: 0,
         },
         {
            name: "Mango Lassi3",
            price: 80,
            image: "/cafe/coffee.jpg",
            rating: 4.6,
            time: "5 min",
            spicy: 0,
         },
      ],
   },
   {
      section: "Breakfasts",
      icon: <Utensils className="w-5 h-5" />,
      items: [
         {
            name: "Poha",
            price: 80,
            image: "/cafe/coffee.jpg",
            rating: 4.3,
            time: "15 min",
            spicy: 2,
         },
         {
            name: "Upma",
            price: 70,
            image: "/cafe/pancakes.jpg",
            rating: 4.2,
            time: "12 min",
            spicy: 1,
         },
         {
            name: "Aloo Paratha",
            price: 120,
            image: "/cafe/latte.jpg",
            rating: 4.6,
            time: "18 min",
            spicy: 2,
         },
         {
            name: "Idli Sambar",
            price: 90,
            image: "/cafe/fries.jpg",
            rating: 4.4,
            time: "10 min",
            spicy: 1,
         },
      ],
   },
   {
      section: "Desserts",
      icon: <Star className="w-5 h-5" />,
      items: [
         {
            name: "Gulab Jamun",
            price: 80,
            image: "/cafe/coffee.jpg",
            rating: 4.8,
            time: "2 min",
            spicy: 0,
         },
         {
            name: "Ras Malai",
            price: 90,
            image: "/cafe/fries.jpg",
            rating: 4.7,
            time: "2 min",
            spicy: 0,
         },
         {
            name: "Chocolate Brownie",
            price: 120,
            image: "/cafe/latte.jpg",
            rating: 4.5,
            time: "3 min",
            spicy: 0,
         },
         {
            name: "Kulfi",
            price: 60,
            image: "/cafe/pancakes.jpg",
            rating: 4.4,
            time: "1 min",
            spicy: 0,
         },
      ],
   },
];

const dabbaMenu = [
   {
      title: "Comfort Meals",
      items: [
         {
            name: "Pav Bhaji",
            price: 199,
            desc: "Bombay-style bhaji + 2 Pavs + Onions.",
            image: "/lunch_box_two.png",
            rating: 4.6,
            servings: "2-3",
            spicy: 3,
         },
         {
            name: "Mysore Curd Rice Meal",
            price: 199,
            desc: "Curd-rice + Papad + Pickle + Onions.",
            image: "/lunch_box.png",
            rating: 4.4,
            servings: "1-2",
            spicy: 1,
         },
      ],
   },
   {
      title: "Thali Combos",
      items: [
         {
            name: "North Indian Thali",
            price: 249,
            desc: "Roti + Rice + Dal + Sabzi + Salad.",
            image: "/lunch_box_two.png",
            rating: 4.7,
            servings: "2-3",
            spicy: 2,
         },
      ],
   },
];

function SpicyIndicator({ level }) {
   return (
      <div className="flex items-center gap-1">
         {[...Array(3)].map((_, i) => (
            <Flame
               key={i}
               className={`w-3 h-3 ${
                  i < level ? "text-red-500" : "text-gray-300"
               }`}
               fill={i < level ? "currentColor" : "none"}
            />
         ))}
      </div>
   );
}

function MenuCard({ item, onAdd, type = "cafe" }) {
   const [isAdding, setIsAdding] = useState(false);

   const handleAdd = () => {
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 600);
      onAdd(item);
   };

   if (type === "dabba") {
      return (
         <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
            <div className="flex flex-col md:flex-row">
               <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-3">
                     <h4 className="font-bold text-xl text-gray-800 group-hover:text-green-700 transition-colors">
                        {item.name}
                     </h4>
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{item.rating}</span>
                     </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                     {item.desc}
                  </p>

                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-green-700">
                           ₹{item.price}
                        </span>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                           <span className="flex items-center gap-1">
                              <Utensils className="w-4 h-4" />
                              {item.servings}
                           </span>
                           <SpicyIndicator level={item.spicy} />
                        </div>
                     </div>

                     <button
                        onClick={handleAdd}
                        disabled={isAdding}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                           isAdding
                              ? "bg-green-500 text-white scale-95"
                              : "bg-green-600 hover:bg-green-700 text-white hover:scale-105"
                        }`}
                     >
                        {isAdding ? (
                           <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Adding...
                           </>
                        ) : (
                           <>
                              <Plus className="w-4 h-4" />
                              Add
                           </>
                        )}
                     </button>
                  </div>
               </div>

               <div className="md:w-1/3 relative">
                  <img
                     src={item.image}
                     alt={item.name}
                     className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                     {item.servings} servings
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-w-[280px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
         <div className="relative">
            <img
               src={item.image}
               alt={item.name}
               className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-sm">
               <Star className="w-3 h-3 text-yellow-500 fill-current" />
               <span className="font-medium text-gray-700">{item.rating}</span>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm flex items-center gap-1">
               <Clock className="w-3 h-3" />
               {item.time}
            </div>
         </div>

         <div className="p-5">
            <div className="flex items-start justify-between mb-3">
               <h4 className="font-semibold text-lg text-gray-800 group-hover:text-green-700 transition-colors">
                  {item.name}
               </h4>
               <SpicyIndicator level={item.spicy} />
            </div>

            <div className="flex items-center justify-between">
               <span className="text-xl font-bold text-green-700">
                  ₹{item.price}
               </span>
               <button
                  onClick={handleAdd}
                  disabled={isAdding}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                     isAdding
                        ? "bg-green-500 text-white scale-95"
                        : "bg-green-600 hover:bg-green-700 text-white hover:scale-105"
                  }`}
               >
                  {isAdding ? (
                     <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Adding...
                     </>
                  ) : (
                     <>
                        <Plus className="w-4 h-4" />
                        Add
                     </>
                  )}
               </button>
            </div>
         </div>
      </div>
   );
}

export default function EnhancedMenuSystem() {
   const [activeMenu, setActiveMenu] = useState("cafe");
   const [cart, setCart] = useState([]);

   const addToCart = (item) => {
      setCart((prev) => [...prev, item]);
   };

   return (
      <section className="bg-gradient-to-br from-gray-50 to-white pt-16 pb-20 px-4">
         <div className="max-w-7xl mx-auto">
            {/* Menu Toggle */}
            <div className="flex justify-center gap-2 mb-12">
               <button
                  onClick={() => setActiveMenu("cafe")}
                  className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                     activeMenu === "cafe"
                        ? "bg-green-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
               >
                  <Coffee className="w-5 h-5" />
                  Café Menu
               </button>
               <button
                  onClick={() => setActiveMenu("dabba")}
                  className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                     activeMenu === "dabba"
                        ? "bg-green-600 text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
               >
                  <Utensils className="w-5 h-5" />
                  Dabba Menu
               </button>
            </div>

            {/* Cart Indicator */}
            {cart.length > 0 && (
               <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">{cart.length} items</span>
               </div>
            )}

            {/* Menu Content */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
               {activeMenu === "cafe" ? (
                  <div className="space-y-16">
                     {cafeMenu.map((group, idx) => (
                        <div key={idx} className="group">
                           <div className="flex items-center gap-3 mb-8">
                              <div className="p-3 bg-green-100 rounded-xl text-green-700">
                                 {group.icon}
                              </div>
                              <h3 className="text-3xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                                 {group.section}
                              </h3>
                           </div>

                           <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
                              {group.items.map((item, i) => (
                                 <MenuCard
                                    key={i}
                                    item={item}
                                    onAdd={addToCart}
                                 />
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="space-y-8">
                     {dabbaMenu.map((section, i) => (
                        <div
                           key={i}
                           className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
                        >
                           <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                              <h3 className="text-2xl font-bold text-green-800 flex items-center gap-3">
                                 <Utensils className="w-6 h-6" />
                                 {section.title}
                              </h3>
                           </div>

                           <div className="p-6 space-y-6">
                              {section.items.map((item, j) => (
                                 <MenuCard
                                    key={j}
                                    item={item}
                                    onAdd={addToCart}
                                    type="dabba"
                                 />
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
