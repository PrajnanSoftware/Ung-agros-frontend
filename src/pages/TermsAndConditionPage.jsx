import React from 'react'
import { FaTruck, FaSyncAlt, FaShieldAlt, FaGavel, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const TermsAndConditionPage = () => {
  return (
    <div className='p-4'>
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Terms & Conditions</h1>

            <div className="space-y-6 text-gray-700">
                {/* Introduction */}
                <section>
                <h2 className="text-lg font-semibold">1. Introduction</h2>
                <p>By using <span className="font-bold">ungagros.com</span>, you agree to these Terms & Conditions. If you do not agree, please do not use our website.</p>
                </section>

                {/* Orders & Payments */}
                <section>
                <h2 className="text-lg font-semibold">2. Orders & Payments</h2>
                <ul className="list-disc pl-5">
                    <li>Orders are processed only after full payment.</li>
                    <li>Prices are subject to change without prior notice.</li>
                    <li>If an order is canceled, a refund will be processed as per our <span className="font-bold">Refund Policy</span>.</li>
                </ul>
                </section>

                {/* Shipping & Delivery */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaTruck /> 3. Shipping & Delivery</h2>
                <ul className="list-disc pl-5">
                    <li>We offer delivery across India. Estimated delivery time is <span className="font-bold">3-5 business days</span>.</li>
                    <li>📦 Tracking details will be provided via email/SMS.</li>
                </ul>
                </section>

                {/* Returns & Refunds */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaSyncAlt /> 4. Returns & Refunds</h2>
                <ul className="list-disc pl-5">
                    <li>Returns are accepted within <span className="font-bold">7 days</span> of delivery.</li>
                    <li>Products must be unused and in original packaging.</li>
                    <li>Refunds will be processed within <span className="font-bold">5-10 business days</span> after product inspection.</li>
                </ul>
                </section>

                {/* Warranty & Liability */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaShieldAlt /> 5. Warranty & Liability</h2>
                <ul className="list-disc pl-5">
                    <li>We provide manufacturer warranties on eligible products.</li>
                    <li>We are not liable for damages due to improper use.</li>
                </ul>
                </section>

                {/* User Conduct */}
                <section>
                <h2 className="text-lg font-semibold flex items-center gap-2"><FaGavel /> 6. User Conduct</h2>
                <ul className="list-disc pl-5">
                    <li>You agree not to misuse our website or services.</li>
                    <li>Any fraudulent transactions will be reported to legal authorities.</li>
                </ul>
                </section>

                {/* Governing Law */}
                <section>
                <h2 className="text-lg font-semibold">7. Governing Law</h2>
                <p>These Terms & Conditions are governed by the laws of <span className="font-bold">India</span>.</p>
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

export default TermsAndConditionPage