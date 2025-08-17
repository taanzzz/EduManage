import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from './../../contexts/AuthProvider';
import axiosSecure from '../../api/Axios';
import { useTheme } from '../../hooks/useTheme';
import { motion } from 'framer-motion';

const CheckoutForm = ({ classDetails, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'unknown',
                    name: user?.displayName || 'Guest',
                },
            },
        });

        if (confirmError) {
            toast.error(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            try {
                await axiosSecure.post('/api/enrollments/confirm', {
                    classId: classDetails._id,
                    transactionId: paymentIntent.id,
                    userEmail: user.email,
                    price: classDetails.price
                });
                toast.success('🎉 Payment successful & enrolled!');
                navigate('/dashboard/my-enrolled-classes');
            } catch {
                toast.error('Payment succeeded but enrollment failed.');
            }
        }

        setProcessing(false);
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full max-w-xl mx-auto p-8 ${getThemeClasses.cardBackground} rounded-3xl ${getThemeClasses.shadow} border border-base-300/20 space-y-6 transition-all ${hoverGlow}`}
        >
            <h2 className={`text-3xl font-extrabold text-center ${gradientText}`}>
                Complete Your Payment
            </h2>
            <p className={`text-center text-base ${getThemeClasses.secondaryText}`}>
                You're enrolling in: <strong className={getThemeClasses.primaryText}>{classDetails.title}</strong>
            </p>

            <div className={`p-4 rounded-xl border border-dashed ${
                isDark ? 'border-cyan-400 bg-cyan-500/10' : 'border-green-400 bg-green-500/10'
            }`}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: isDark ? '#E5E7EB' : '#1f2937',
                                '::placeholder': { color: isDark ? '#9ca3af' : '#6b7280' },
                            },
                            invalid: { color: '#ef4444' },
                        },
                    }}
                />
            </div>

            <motion.button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full btn rounded-full ${hoverGlow} ${
                    processing
                        ? 'btn-disabled'
                        : isDark
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white'
                }`}
            >
                {processing ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    `Pay $${classDetails?.price || '...'}`
                )}
            </motion.button>
        </motion.form>
    );
};

export default CheckoutForm;