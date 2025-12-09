import React from 'react';
import SeoHead from '../components/SeoHead';

const Terms = () => {
  return (
    <>
      <SeoHead 
        title="Terms of Service - Mala Mahanadu"
        description="Terms of service and usage guidelines for Mala Mahanadu website and services."
        keywords="Mala Mahanadu, terms of service, terms and conditions, website usage"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Guidelines for using our website and services
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <p className="text-gray-600 leading-relaxed">
                  Welcome to the Mala Mahanadu website. These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms.
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600">
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                  <p className="text-gray-600 mb-4">
                    Mala Mahanadu provides information about our organization, activities, and community services through this website. Our services include:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>Information about community programs and initiatives</li>
                    <li>News and updates about our activities</li>
                    <li>Contact information for district presidents and key persons</li>
                    <li>Donation processing and acknowledgment</li>
                    <li>Complaint submission and tracking</li>
                    <li>Gallery of events and activities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                  <p className="text-gray-600 mb-4">As a user of this website, you agree to:</p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>Provide accurate and truthful information when submitting forms</li>
                    <li>Use the website for legitimate purposes only</li>
                    <li>Respect the privacy and rights of others</li>
                    <li>Not submit false or misleading information</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Not use the website for any illegal or prohibited activities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Content and Information</h2>
                  <p className="text-gray-600 mb-4">
                    While we strive to provide accurate and up-to-date information, we make no warranties about:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>The completeness, accuracy, or reliability of any information</li>
                    <li>The availability or functionality of the website</li>
                    <li>The suitability of information for any particular purpose</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    Users should independently verify any information before making decisions based on it.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Donations and Payments</h2>
                  <p className="text-gray-600 mb-4">Regarding donations:</p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>All donations are voluntary and non-refundable</li>
                    <li>We provide acknowledgment for all donations received</li>
                    <li>Donation details are used for record-keeping and receipt purposes</li>
                    <li>We are not responsible for any errors in payment processing</li>
                    <li>Users must ensure accurate payment information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Complaints and Feedback</h2>
                  <p className="text-gray-600 mb-4">When submitting complaints or feedback:</p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>Users must provide accurate and complete information</li>
                    <li>False or malicious complaints may result in legal action</li>
                    <li>We reserve the right to verify complaint details</li>
                    <li>Complaint resolution timelines may vary based on complexity</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                  <p className="text-gray-600">
                    All content on this website, including text, images, logos, and design elements, is the property of Mala Mahanadu or our content providers and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute our content without prior written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacy</h2>
                  <p className="text-gray-600">
                    Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Website Availability</h2>
                  <p className="text-gray-600">
                    We strive to maintain website availability, but we do not guarantee uninterrupted access. The website may be temporarily unavailable due to maintenance, updates, or technical issues beyond our control.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                  <p className="text-gray-600">
                    Mala Mahanadu shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of this website or any services provided herein.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
                  <p className="text-gray-600">
                    You agree to indemnify and hold Mala Mahanadu harmless from any claims, damages, or expenses arising from your use of this website or violation of these terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications to Terms</h2>
                  <p className="text-gray-600">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this website. Your continued use of the website constitutes acceptance of any modifications.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Termination</h2>
                  <p className="text-gray-600">
                    We reserve the right to terminate or suspend access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
                  <p className="text-gray-600">
                    These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700"><strong>Email:</strong> info@malamahanadu.org</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +91 98765 43210</p>
                    <p className="text-gray-700"><strong>Address:</strong> Hyderabad, Telangana, India</p>
                  </div>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <strong>Last Updated:</strong> December 9, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;
