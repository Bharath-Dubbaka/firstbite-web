import Image from "next/image";

const cafeMenu = [
   {
      section: "Quick Bites",
      items: [
         { name: "Masala Chai", price: 60, image: "/cafe/coffee.jpg" },
         { name: "Cold Coffee", price: 90, image: "/cafe/fries.jpg" },
         { name: "Veg Puff", price: 70, image: "/cafe/latte.jpg" },
         { name: "Choco Lava Cake", price: 109, image: "/cafe/pancakes.jpg" },
         { name: "Paneer Sandwich", price: 139, image: "/cafe/fries.jpg" },
         { name: "Masala Chai", price: 60, image: "/cafe/coffee.jpg" },
         { name: "Cold Coffee", price: 90, image: "/cafe/fries.jpg" },
         { name: "Veg Puff", price: 70, image: "/cafe/latte.jpg" },
         { name: "Choco Lava Cake", price: 109, image: "/cafe/pancakes.jpg" },
         { name: "Paneer Sandwich", price: 139, image: "/cafe/fries.jpg" },
      ],
   },
   {
      section: "Hot & Cold Beverages",
      items: [
         { name: "Masala Chai", price: 60, image: "/cafe/coffee.jpg" },
         { name: "Cold Coffee", price: 90, image: "/cafe/fries.jpg" },
         { name: "Veg Puff", price: 70, image: "/cafe/latte.jpg" },
         { name: "Choco Lava Cake", price: 109, image: "/cafe/pancakes.jpg" },
         { name: "Paneer Sandwich", price: 139, image: "/cafe/fries.jpg" },
         { name: "Masala Chai", price: 60, image: "/cafe/coffee.jpg" },
         { name: "Cold Coffee", price: 90, image: "/cafe/fries.jpg" },
         { name: "Veg Puff", price: 70, image: "/cafe/latte.jpg" },
         { name: "Choco Lava Cake", price: 109, image: "/cafe/pancakes.jpg" },
         { name: "Paneer Sandwich", price: 139, image: "/cafe/fries.jpg" },
      ],
   },
   {
      section: "Desserts",
      items: [
         { name: "Masala Chai", price: 60, image: "/cafe/coffee.jpg" },
         { name: "Cold Coffee", price: 90, image: "/cafe/fries.jpg" },
         { name: "Veg Puff", price: 70, image: "/cafe/latte.jpg" },
         { name: "Choco Lava Cake", price: 109, image: "/cafe/pancakes.jpg" },
         { name: "Paneer Sandwich", price: 139, image: "/cafe/fries.jpg" },
         { name: "Masala Chai", price: 60, image: "/cafe/coffee.jpg" },
         { name: "Cold Coffee", price: 90, image: "/cafe/fries.jpg" },
         { name: "Veg Puff", price: 70, image: "/cafe/latte.jpg" },
         { name: "Choco Lava Cake", price: 109, image: "/cafe/pancakes.jpg" },
         { name: "Paneer Sandwich", price: 139, image: "/cafe/fries.jpg" },
      ],
   },
];

export default function CafeMenuCarousel() {
   return (
      <div className="space-y-10 mt-8 text-black">
         {cafeMenu.map((group, idx) => (
            <div key={idx}>
               <h3 className="text-2xl font-bold mb-4 text-green-800">
                  {group.section}
               </h3>
               <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {group.items.map((item, i) => (
                     <div
                        key={i}
                        className="min-w-[250px] bg-white border border-gray-200 rounded-xl shadow-sm p-4"
                     >
                        <img
                           src={item.image}
                           alt={item.name}
                           className="w-full h-48 object-cover rounded-md mb-3"
                        />
                        <h4 className="font-medium text-lg">{item.name}</h4>
                        <p className="text-green-700 font-semibold">
                           ₹{item.price}
                        </p>
                        <button className="mt-2 w-full bg-green-700 text-white py-1.5 rounded-full text-sm">
                           Add
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         ))}
      </div>
   );
}
