import React from 'react';
import SeoHead from '../components/SeoHead';

const PrivacyPolicy = () => {
  return (
    <>
      <SeoHead 
        title="Privacy Policy - Mala Mahanadu"
        description="Privacy policy of Mala Mahanadu organization. Learn how we collect, use, and protect your personal information."
        keywords="Mala Mahanadu, privacy policy, data protection, personal information"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Your privacy is important to us
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <p className="text-gray-600 leading-relaxed">
                  At Mala Mahanadu, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you interact with our website and services.
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
                      <p className="text-gray-600">When you fill out forms on our website, we may collect:</p>
                      <ul className="list-disc list-inside text-gray-600 ml-4">
                        <li>Name and contact details (email, phone number)</li>
                        <li>Address information</li>
                        <li>Donation details and payment information</li>
                        <li>Complaint or inquiry details</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Technical Information</h3>
                      <p className="text-gray-600">We automatically collect certain technical information:</p>
                      <ul className="list-disc list-inside text-gray-600 ml-4">
                        <li>IP address and browser type</li>
                        <li>Device information and operating system</li>
                        <li>Pages visited and time spent on our website</li>
                        <li>Referring website information</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">We use your information to:</p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>Process your donations and provide acknowledgments</li>
                    <li>Respond to your inquiries and complaints</li>
                    <li>Send you updates about our activities and events</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal requirements</li>
                    <li>Prevent fraudulent activities and ensure security</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                  <p className="text-gray-600 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>With service providers who assist us in operating our website</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                    <li>For the purpose of processing donations (with payment processors)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                  <p className="text-gray-600">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers for data storage</li>
                    <li>Regular security audits and updates</li>
                    <li>Access restrictions to personal information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
                  <p className="text-gray-600 mb-4">
                    Our website uses cookies to enhance your experience. Cookies are small files stored on your device that help us:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>Remember your preferences</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Provide personalized content</li>
                    <li>Improve website functionality</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    You can control cookies through your browser settings, but disabling cookies may affect your experience on our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                  <p className="text-gray-600 mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt out of marketing communications</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                  <p className="text-gray-600 mt-4">
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                  <p className="text-gray-600">
                    Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
                  <p className="text-gray-600">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. Please review their privacy policies before providing any personal information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
                  <p className="text-gray-600">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700"><strong>Email:</strong> privacy@malamahanadu.org</p>
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

export default PrivacyPolicy;
