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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) return;
        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });
        if (error) {
            toast.error(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card, billing_details: { email: user?.email, name: user?.displayName } },
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
            } catch (enrollError) {
                toast.error('Payment successful, but enrollment failed. Contact support.');
            }
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 bg-base-100 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold">Pay with Card</h2>
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            <button type="submit" disabled={!stripe || !clientSecret || processing} className="btn btn-primary w-full mt-6 text-white">
                {processing ? <span className="loading loading-spinner"></span> : `Pay $${classDetails?.price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;