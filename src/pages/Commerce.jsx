import React from 'react';
import { FaShoppingCart, FaCreditCard, FaTags } from 'react-icons/fa';

const Commerce = () => {
    return (
        <div className="bg-base-100 min-h-screen py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h1 className="text-5xl font-extrabold">E-commerce Tools</h1>
                <p className="text-xl text-base-content/70 mt-4">Seamlessly sell your courses with our integrated tools.</p>
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="card bg-base-200 p-8 shadow-lg"><FaShoppingCart className="text-4xl text-primary mx-auto mb-4" /><h3 className="text-2xl font-bold">Easy Checkout</h3></div>
                    <div className="card bg-base-200 p-8 shadow-lg"><FaCreditCard className="text-4xl text-primary mx-auto mb-4" /><h3 className="text-2xl font-bold">Secure Payments</h3></div>
                    <div className="card bg-base-200 p-8 shadow-lg"><FaTags className="text-4xl text-primary mx-auto mb-4" /><h3 className="text-2xl font-bold">Coupons & Discounts</h3></div>
                </div>
            </div>
        </div>
    );
};
export default Commerce;