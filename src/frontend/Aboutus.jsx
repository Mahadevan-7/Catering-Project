import React from 'react';
import WhatsAppContact from './WhatsAppContact';

const Aboutus = () => {
    return (
        <div className="aboutus-container">
            <WhatsAppContact />
            <h1 className='Banner about-title'>About Us</h1>

            <h3 className='Banner about-subtitle'>
                <b>Welcome to Silver Spoon Catering</b> — where taste meets elegance!
            </h3>

            <p className='abt about-desc'>
                "We specialize in offering top-quality catering services for all your special occasions — weddings, parties, corporate events, and more.
                With a wide variety of delicious dishes, professional service, and timely delivery, we ensure your events are truly memorable."
            </p>

            <div className='abt about-desc'>
                <p>At Silver Spoon, we believe that great food brings people together. Our easy-to-use website lets you:</p>
            </div>

            <div className="about-features">
                <p>• Explore our menu and services</p>
                <p>• Make inquiries or bookings</p>
                <p>• Stay updated with our latest offerings</p>
            </div>
        </div>
    );
}

export default Aboutus;
