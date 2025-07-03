const dabbaMenu = [
   {
      title: "Comfort Meals",
      items: [
         {
            name: "Pav Bhaji",
            price: 199,
            desc: "Bombay-style bhaji + 2 Pavs + Onions.",
            image: "/lunch_box_two.png",
         },
         {
            name: "Mysore Curd Rice Meal",
            price: 199,
            desc: "Curd-rice + Papad + Pickle + Onions.",
            image: "/lunch_box.png",
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
         },
      ],
   },
];

export default function DabbaMenuAccordion() {
   return (
      <div className="divide-y">
         {dabbaMenu.map((section, i) => (
            <details key={i} className="mb-4 bg-white rounded-2xl shadow" open>
               <summary className="cursor-pointer px-4 py-3 font-semibold text-xl text-green-900 border bg-green-100/30 border-b-green-200/80">
                  {section.title}
               </summary>
               <div className="px-4 pb-4 space-y-4 ">
                  {section.items.map((item) => (
                     <div
                        key={item.name}
                        className="flex justify-between items-center gap-4 px-6"
                     >
                        <div className="text-black">
                           <h4 className="font-bold">{item.name}</h4>
                           <p className="text-sm text-gray-600">{item.desc}</p>
                           <p className="font-semibold mt-1">₹{item.price}</p>
                        </div>
                        <img
                           src={item.image}
                           alt={item.name}
                           className="w-60 h-40 object-cover rounded"
                        />
                     </div>
                  ))}
               </div>
            </details>
         ))}
      </div>
   );
}
