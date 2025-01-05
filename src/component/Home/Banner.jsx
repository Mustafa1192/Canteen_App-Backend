import React, { useEffect, useRef } from "react";

const banners = [
  {
    id: 1,
    title: "Beverage",
    image: "https://i.pinimg.com/736x/7c/63/e1/7c63e1f06d4e142aca9ee139ad3e9657.jpg",
  },
  {
    id: 2,
    title: "South Indian",
    image: "https://i.pinimg.com/736x/5c/4f/63/5c4f63f5c7726b46230e590530375797.jpg",
  },
  {
    id: 3,
    title: "Fried Rice",
    image: "https://i.pinimg.com/736x/08/d3/07/08d3073b3b7ea78cad1abe305de54718.jpg",
  },
];

const Banner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Auto-scroll logic
    const interval = setInterval(() => {
      if (bannerRef.current) {
        bannerRef.current.scrollLeft += bannerRef.current.offsetWidth;
        if (
          bannerRef.current.scrollLeft >=
          bannerRef.current.scrollWidth - bannerRef.current.offsetWidth
        ) {
          bannerRef.current.scrollLeft = 0; // Reset to the start
        }
      }
    }, 5000); // Scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5">
      <div
        ref={bannerRef}
        className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-hidden scroll-smooth"
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative min-w-full md:min-w-0 md:w-auto rounded-lg overflow-hidden"
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-80 object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">{banner.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
