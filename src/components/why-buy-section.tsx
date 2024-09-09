// components/WhyBuySection.tsx
import { FC } from 'react';
import { FaPhoneAlt, FaComments, FaEnvelope } from 'react-icons/fa'; // Example icons for contact section
import { BsCurrencyDollar, BsCalendar2Event, BsQuestionCircle } from 'react-icons/bs'; // Example icons for reasons

const WhyBuySection: FC = () => {
  return (
    <div className="container mx-auto p-8 space-y-12">
      
      {/* Contact Information Section */}
      <div className="bg-gray-100 p-6 rounded-lg flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">
        <div className="text-center lg:text-left">
          <p className="font-medium">Have a question? We're here to help.</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-primary" />
            <a href="tel:+18887463455" className="text-primary underline">
              +1-888-746-3455
            </a>
            <p className="text-gray-500">Mon-Fri 6 AM - 5 PM PDT</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaComments className="text-primary" />
            <a href="#" className="text-primary underline">
              Live Chat with us
            </a>
            <p className="text-gray-500">Mon-Fri 6 AM - 7 PM PDT</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-primary" />
            <a href="#" className="text-primary underline">
              Send us a message
            </a>
            <p className="text-gray-500">Expect a reply within 2 days</p>
          </div>
        </div>
      </div>

      {/* Why Buy Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Why buy from us?</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reason 1 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <BsCurrencyDollar className="text-4xl text-primary" />
            <h3 className="font-semibold text-lg">Modern Furniture at Fair Prices</h3>
            <p className="text-gray-500">
              Our promise? High-quality furniture at radically lower (and much fairer) prices than comparable retailers.
            </p>
            <a href="#" className="text-primary underline">Learn more</a>
          </div>

          {/* Reason 2 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <BsCalendar2Event className="text-4xl text-primary" />
            <h3 className="font-semibold text-lg">30-Day Satisfaction Guarantee</h3>
            <p className="text-gray-500">
              We’re confident you’ll love your new furniture, but just to make sure, you have 30 days to try it out.
            </p>
            <a href="#" className="text-primary underline">Learn more</a>
          </div>

          {/* Reason 3 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <BsQuestionCircle className="text-4xl text-primary" />
            <h3 className="font-semibold text-lg">We’re Here To Help</h3>
            <p className="text-gray-500">
              If questions arise, our friendly and knowledgeable Customer Care team is just a phone call, chat, or email away.
            </p>
            <a href="#" className="text-primary underline">Contact us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBuySection;
