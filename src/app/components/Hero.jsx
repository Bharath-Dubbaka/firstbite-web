import Image from "next/image";

export default function Hero() {
   return (
      <section className="relative min-h-[90vh] bg-white overflow-hidden">
         {/* Background Image */}
         <Image
            src="/hero_five.png"
            alt="Spice Background"
            fill
            className="object-cover object-center z-0 opacity-90 "
            priority
         />

         {/* Overlay Content */}
         <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-60 max-w-4xl mx-auto">
            <div className="flex flex-col-reverse">
               <h1 className="text-5xl md:text-6xl drop-shadow-md font-bold font-signature text-green-900">
                  💝
                  <span className="text-red-500 font-bold ml-[-5px]">
                     @firstbite
                  </span>
               </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl px-10">
                  by
               </p>
               <h2 className="text-5xl md:text-6xl drop-shadow-md font-bold text-green-900  font-signature ">
                  Fresh Flavors
               </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mt-4 max-w-2xl px-10">
               Discover spices, meals, and ingredients rooted in tradition and
               delivered with love.
            </p>
            <button className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 py-3 text-lg rounded-full">
               Explore Plans
            </button>
         </div>
      </section>
   );
}
