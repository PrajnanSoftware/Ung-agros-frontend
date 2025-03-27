import React from 'react'
import { FaLock, FaUserShield, FaShoppingCart, FaShieldAlt, FaCookieBite, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const PrivacyPage = () => {
  return (
    <div className='p-4'>
         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Privacy Policy</h1>

            <div className="space-y-6 text-gray-700">
                {/* Introduction */}
                <section>
                <h2 className="text-lg font-semibold">1. Introduction</h2>
                <p>Welcome to <span className="font-bold">Ung Agros</span>! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit <span className="font-bold">ungagros.com</span>.</p>
                </section>

                {/* Information We Collect */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaUserShield /> 2. Information We Collect</h2>
                <ul className="list-disc pl-5">
                    <li><span className="font-bold">Personal Information:</span> Name, email, phone number, billing/shipping address, payment details.</li>
                    <li><span className="font-bold">Order Details:</span> Products purchased, order history, and transaction details.</li>
                    <li><span className="font-bold">Device & Usage Data:</span> IP address, browser type, cookies, and analytics to improve website performance.</li>
                </ul>
                </section>

                {/* How We Use Your Information */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaShoppingCart /> 3. How We Use Your Information</h2>
                <ul className="list-disc pl-5">
                    <li>✅ Process and fulfill orders.</li>
                    <li>✅ Provide customer support.</li>
                    <li>✅ Improve website functionality and user experience.</li>
                    <li>✅ Send promotional emails (only with your consent).</li>
                    <li>✅ Comply with legal requirements.</li>
                </ul>
                </section>

                {/* Data Sharing & Security */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaLock /> 4. Data Sharing & Security</h2>
                <ul className="list-disc pl-5">
                    <li>🔒 <span className="font-bold">We do not sell your data</span> to third parties.</li>
                    <li>💳 Payment transactions are secured with trusted payment gateways (e.g., Razorpay).</li>
                    <li>🔐 We use SSL encryption to protect your data.</li>
                </ul>
                </section>

                {/* Your Rights */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaShieldAlt /> 5. Your Rights</h2>
                <ul className="list-disc pl-5">
                    <li>Access or update your personal data.</li>
                    <li>Opt-out of marketing emails.</li>
                    <li>Request data deletion by contacting <a href="mailto:support@ungagros.com" className="text-primary font-bold">support@ungagros.com</a>.</li>
                </ul>
                </section>

                {/* Cookies Policy */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaCookieBite /> 6. Cookies Policy</h2>
                <p>We use cookies for a better shopping experience. You can disable cookies in your browser settings.</p>
                </section>

                {/* Changes to Policy */}
                <section>
                <h2 className="text-lg font-semibold">7. Changes to This Policy</h2>
                <p>We may update this Privacy Policy. Any changes will be posted on this page.</p>
                </section>

                {/* Contact Us */}
                <section>
                <h2 className="text-lg font-semibold">8. Contact Us</h2>
                <p>For any queries, reach out to:</p>
                <ul className="mt-2">
                    <li className="flex items-center gap-2"><FaEnvelope /> <span className="font-bold">Email:</span> <a href="mailto:support@ungagros.com" className="text-primary">support@ungagros.com</a></li>
                    <li className="flex items-center gap-2"><FaPhoneAlt /> <span className="font-bold">Phone:</span> <a href="tel:+919986636773" className="text-primary">+91 99866 36773</a></li>
                </ul>
                </section>
            </div>
        </div>
    </div>
  )
}

export default PrivacyPage