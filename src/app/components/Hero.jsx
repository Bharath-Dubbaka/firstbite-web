import Image from "next/image";

export default function Hero() {
   return (
      <section className="bg-[#FFF8F0] w-full">
         <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-6">
               <Image
                  src="/logo-fresh.svg"
                  alt="HelloFresh Logo"
                  width={130}
                  height={40}
                  className="mb-4"
               />

               <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                  Americans <span className="text-green-600">#1 Choice</span>
                  <br /> for Home Cooking
               </h1>

               <ul className="text-lg space-y-2 font-medium">
                  <li>✓ 3-Min Ready Made Meals</li>
                  <li>✓ Low-Mess Prep & Bake Meal Kits</li>
                  <li>✓ Easy 15-Min Recipes</li>
                  <li>
                     <strong>✓ Pause or cancel anytime</strong>
                  </li>
               </ul>

               <button className="bg-black text-white text-lg px-6 py-3 rounded hover:bg-gray-800">
                  See Pricing & Plans
               </button>
            </div>

            {/* Right images */}
            <div className="relative grid grid-cols-2 gap-4 justify-center items-center">
               <Image
                  src="/lunch_box.png"
                  alt="Ready Meal Pack"
                  width={260}
                  height={180}
                  className="rounded-lg shadow-xl"
               />
               <div className="flex flex-col gap-4">
                  <Image
                     src="/lunch_box_two.png"
                     alt="Meal Box"
                     width={280}
                     height={220}
                     className="rounded-xl shadow-md"
                  />
                  <Image
                     src="/lunch_box_two.png"
                     alt="Salad Bowl"
                     width={260}
                     height={180}
                     className="rounded-xl shadow-md"
                  />
               </div>
            </div>
         </div>

         <div className="bg-white px-6 py-10 grid md:grid-cols-2 max-w-6xl mx-auto gap-6 items-center">
            <Image
               src="/hero_five.png"
               alt="HelloFresh Delivery Box"
               width={280}
               height={280}
            />
            <div>
               <h2 className="text-2xl font-bold mb-4">
                  Enjoy Easy Dinner in{" "}
                  <span className="text-green-600">1, 2, 3</span>
               </h2>
               <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>
                     <strong>Choose your Plan:</strong> Customize your box to
                     fit your needs: select number of people, how many recipes,
                     and your meal preferences
                  </li>
                  {/* You can expand with 2 & 3 if needed */}
               </ol>
            </div>
         </div>
      </section>
   );
}
