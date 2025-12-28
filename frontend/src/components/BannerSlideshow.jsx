import React, { useEffect, useState } from 'react';

// Banners data from assets/banner directory
const banners = [
  {
    id: 1,
    image: '/assets/banner/banner-1.jpg',
    alt: 'Mala Mahanadu Event 1',
    link: '/gallery',
    caption: 'Empowering the Mala Community',
  },
  {
    id: 2,
    image: '/assets/banner/banner-2.jpg',
    alt: 'Mala Mahanadu Event 2',
    link: '/about',
    caption: 'Social Justice and Progress',
  },
  {
    id: 3,
    image: '/assets/banner/banner-3.jpg',
    alt: 'Mala Mahanadu Event 3',
    link: '/donations',
    caption: 'Support Our Initiatives',
  },
  {
    id: 4,
    image: '/assets/banner/banner-4.jpg',
    alt: 'Mala Mahanadu Event 4',
    link: '/gallery',
    caption: 'Unity and Empowerment',
  },
  {
    id: 5,
    image: '/assets/banner/banner-5.jpg',
    alt: 'Mala Mahanadu Event 5',
    link: '/gallery',
    caption: 'Community Development',
  },
  {
    id: 6,
    image: '/assets/banner/banner-6.jpg',
    alt: 'Mala Mahanadu Event 6',
    link: '/gallery',
    caption: 'Building a Better Future',
  },
  {
    id: 7,
    image: '/assets/banner/banner-7.jpg',
    alt: 'Mala Mahanadu Event 7',
    link: '/gallery',
    caption: 'Together We Rise',
  },
  {
    id: 8,
    image: '/assets/banner/banner-8.jpg',
    alt: 'Mala Mahanadu Event 8',
    link: '/gallery',
    caption: 'Celebrating Our Heritage',
  },
  {
    id: 9,
    image: '/assets/banner/banner-9.jpg',
    alt: 'Mala Mahanadu Event 9',
    link: '/gallery',
    caption: 'Strength in Unity',
  },
  {
    id: 10,
    image: '/assets/banner/banner-10.jpg',
    alt: 'Mala Mahanadu Event 10',
    link: '/gallery',
    caption: 'Advancing Together',
  },
  {
    id: 11,
    image: '/assets/banner/banner-11.jpg',
    alt: 'Mala Mahanadu Event 11',
    link: '/gallery',
    caption: 'Promoting Social Justice',
  },
  {
    id: 12,
    image: '/assets/banner/banner-12.jpg',
    alt: 'Mala Mahanadu Event 12',
    link: '/gallery',
    caption: 'Community Gatherings',
  },
  {
    id: 13,
    image: '/assets/banner/banner-13.jpg',
    alt: 'Mala Mahanadu Event 13',
    link: '/gallery',
    caption: 'Educational Initiatives',
  },
  {
    id: 14,
    image: '/assets/banner/banner-14.jpg',
    alt: 'Mala Mahanadu Event 14',
    link: '/gallery',
    caption: 'Cultural Celebrations',
  },
  {
    id: 15,
    image: '/assets/banner/banner-15.jpg',
    alt: 'Mala Mahanadu Event 15',
    link: '/gallery',
    caption: 'Leadership and Vision',
  },
  {
    id: 16,
    image: '/assets/banner/banner-16.jpg',
    alt: 'Mala Mahanadu Event 16',
    link: '/gallery',
    caption: 'Serving Our Community',
  },
  {
    id: 17,
    image: '/assets/banner/banner-17.jpg',
    alt: 'Mala Mahanadu Event 17',
    link: '/gallery',
    caption: 'Making a Difference',
  },
];

const BannerSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
      {banners.map((banner, idx) => (
        <a
          key={banner.id}
          href={banner.link}
          className={`block transition-opacity duration-700 ease-in-out absolute inset-0 w-full h-full ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          aria-label={banner.caption}
        >
          <img
            src={banner.image}
            alt={banner.alt}
            className="w-full h-48 xs:h-56 sm:h-64 object-cover object-center"
            onError={e => { e.target.src = '/assets/gallery/default-banner.jpg'; }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-center py-2 px-4 text-sm xs:text-base font-semibold">
            {banner.caption}
          </div>
        </a>
      ))}
      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${current === idx ? 'bg-gold-500' : 'bg-gray-300'} transition-colors duration-200`}
            aria-label={`Go to banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlideshow;
