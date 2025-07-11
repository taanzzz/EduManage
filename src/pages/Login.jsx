import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaUserGraduate } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';
import { motion } from 'framer-motion';

const Login = () => {
  const { login, googleSignIn, loading, setLoading } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoginError('');
    login(data.email, data.password)
      .then((result) => {
        toast.success(`Welcome back, ${result.user.displayName || 'User'}!`);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setLoginError('Invalid email or password. Please try again.');
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setLoginError('');
    googleSignIn()
      .then((result) => {
        toast.success(`Successfully signed in as ${result.user.displayName}!`);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setLoginError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex flex-col lg:flex-row items-center justify-center px-6 py-12 gap-8 relative overflow-hidden">
      
      {/* Left: Login Form */}
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 z-10">
        <h2 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Login to Your Account
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          Empower your learning or teaching journey by logging in.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className={`input input-bordered w-full rounded-xl ${errors.email ? 'input-error' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full rounded-xl ${errors.password ? 'input-error' : ''}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
          </div>

          {loginError && <p className="text-error text-center text-sm">{loginError}</p>}

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full mt-4"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>

          <div className="divider text-sm text-base-content/60">or continue with</div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full rounded-full flex gap-2 items-center justify-center"
            disabled={loading}
          >
            <FaGoogle />
            Continue with Google
          </button>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>

      {/* Right: Animated Aesthetic Shapes */}
      <div className="hidden lg:flex flex-col items-center justify-center relative w-full max-w-xl z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-br from-primary to-accent opacity-30 blur-2xl rounded-[35%_65%_70%_30%_/_30%_30%_70%_70%]"
        ></motion.div>

        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 20, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-tr from-secondary via-primary to-accent opacity-30 blur-2xl rounded-[45%_55%_65%_35%_/_40%_30%_70%_60%]"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative text-center px-6 z-10"
        >
          <FaUserGraduate className="text-6xl text-primary mb-4" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back, Achiever!
          </h2>
          <p className="mt-3 text-base-content/70 max-w-sm mx-auto">
            Continue your journey of teaching, learning, and growth with EduManage.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
