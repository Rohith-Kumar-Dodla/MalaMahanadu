import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Chennaiah",
      role: "National President",
      content: "Our strength lies in unity and collective action. Together, we are building a future where every member of the Mala community can achieve their full potential and contribute to the nation's progress.",
      rating: 5
    },
    {
      name: "Narendra",
      role: "Community Leader",
      content: "Education is the key to empowerment. We must ensure that our children have access to quality education and opportunities that will enable them to break barriers and reach new heights.",
      rating: 5
    },
    {
      name: "Gopal",
      role: "Social Activist",
      content: "Social justice and equality are not just ideals, they are rights we must fight for every day. Our community's progress depends on our commitment to these fundamental values.",
      rating: 5
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
            Our People Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Hear from our community leaders and members about their experiences and vision for the Mala community
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg relative">
                <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-500 rounded-full flex items-center justify-center">
                    <FaQuoteLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {testimonial.content}
                </p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                    <span className="text-gold-600 font-bold text-sm sm:text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
