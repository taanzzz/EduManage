import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import CheckoutForm from './payment/CheckoutForm';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import axiosSecure from '../api/Axios';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const { id: classId } = useParams();

    
    const { data: classDetails, isLoading: isClassLoading } = useQuery({
        queryKey: ['classForPayment', classId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/classes/${classId}`);
            return res.data;
        },
        enabled: !!classId, 
    });

    
    const { data: clientSecret, isLoading: isSecretLoading } = useQuery({
        queryKey: ['paymentIntent', classId],
        queryFn: async () => {
            const res = await axiosSecure.post('/api/payments/create-payment-intent', { classId });
            return res.data.clientSecret;
        },
        
    });

    if (isClassLoading || isSecretLoading) {
        return <LoadingSpinner />;
    }

    if (!classDetails || !clientSecret) {
        return <div className="text-center py-20 text-xl font-bold">Failed to load payment details. Please try again.</div>
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">Secure Payment</h1>
                <p className="text-center text-lg mb-8">For: <span className="font-bold text-primary">{classDetails?.title}</span></p>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm classId={classId} classDetails={classDetails} clientSecret={clientSecret} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;