import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AuthContext } from './../../contexts/AuthProvider';
import axiosSecure from '../../api/Axios';

const CheckoutForm = ({ classDetails, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

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
        <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-xl mx-auto p-8 bg-white dark:bg-base-200 rounded-3xl shadow-2xl border border-base-300 space-y-6 transition-all"
        >
            <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Complete Your Payment
            </h2>
            <p className="text-center text-base text-base-content/70">
                You're enrolling in: <strong className="text-base-content">{classDetails.title}</strong>
            </p>

            <div className="p-4 rounded-xl border border-dashed border-primary bg-base-100/50 dark:bg-base-300/40">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#1f2937',
                                '::placeholder': { color: '#9ca3af' },
                            },
                            invalid: { color: '#ef4444' },
                        },
                    }}
                />
            </div>

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className={`w-full btn btn-primary rounded-full shadow-md transition duration-300 hover:shadow-lg ${
                    processing ? 'btn-disabled' : ''
                }`}
            >
                {processing ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    `Pay $${classDetails?.price || '...'}`
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
