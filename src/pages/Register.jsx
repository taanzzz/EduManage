import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaChalkboardTeacher } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const Register = () => {
  const { register: registerUser, googleSignIn, loading, setLoading } = useContext(AuthContext);
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setRegisterError('');
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const photoURL = `https://api.dicebear.com/7.x/thumbs/svg?seed=${name}`;

    try {
      const result = await registerUser(name, email, photoURL, password);

      const maxWaitTime = 5000;
      const startTime = Date.now();

      const waitForToken = setInterval(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
          clearInterval(waitForToken);
          toast.success(`Account created successfully! Welcome, ${name}!`);
          navigate('/');
        } else if (Date.now() - startTime > maxWaitTime) {
          clearInterval(waitForToken);
          setRegisterError('Registration succeeded but token not received. Please refresh.');
        }
      }, 300);
    } catch (err) {
      console.error(err);
      setRegisterError(err.message || 'Something went wrong during registration.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setRegisterError('');
    googleSignIn()
      .then((result) => {
        toast.success(`Successfully signed in as ${result.user.displayName}!`);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setRegisterError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className={`min-h-screen ${getThemeClasses.pageBackground} flex flex-col lg:flex-row items-center justify-center px-6 py-12 gap-8 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute top-10 left-10 w-60 h-60 ${
            isDark ? 'bg-gradient-to-br from-cyan-500 to-teal-500' : 'bg-gradient-to-br from-green-500 to-emerald-500'
          } opacity-30 blur-2xl rounded-[35%_65%_70%_30%_/_30%_30%_70%_70%]`}
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 20, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute bottom-10 right-10 w-72 h-72 ${
            isDark ? 'bg-gradient-to-tr from-teal-500 to-cyan-500' : 'bg-gradient-to-tr from-emerald-500 to-green-500'
          } opacity-30 blur-2xl rounded-[45%_55%_65%_35%_/_40%_30%_70%_60%]`}
        ></motion.div>
      </div>

      <div className={`w-full max-w-md ${getThemeClasses.cardBackground} ${getThemeClasses.shadow} rounded-2xl p-8 z-10 ${hoverGlow}`}>
        <h2 className={`text-4xl font-extrabold text-center mb-4 ${gradientText}`}>
          Create Your Account
        </h2>
        <p className={`text-center ${getThemeClasses.secondaryText} mb-6`}>
          Join our global community of learners and educators.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className={`label font-medium ${getThemeClasses.primaryText}`}>Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className={`input input-bordered w-full rounded-xl ${getThemeClasses.inputBackground} ${
                errors.name ? 'border-red-500' : ''
              } focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-cyan-400' : 'focus:ring-green-400'}`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className={`label font-medium ${getThemeClasses.primaryText}`}>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className={`input input-bordered w-full rounded-xl ${getThemeClasses.inputBackground} ${
                errors.email ? 'border-red-500' : ''
              } focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-cyan-400' : 'focus:ring-green-400'}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className={`label font-medium ${getThemeClasses.primaryText}`}>Password</label>
            <input
              type="password"
              placeholder="Must be at least 6 characters"
              className={`input input-bordered w-full rounded-xl ${getThemeClasses.inputBackground} ${
                errors.password ? 'border-red-500' : ''
              } focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-cyan-400' : 'focus:ring-green-400'}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className={`label font-medium ${getThemeClasses.primaryText}`}>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-type your password"
              className={`input input-bordered w-full rounded-xl ${getThemeClasses.inputBackground} ${
                errors.confirmPassword ? 'border-red-500' : ''
              } focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-cyan-400' : 'focus:ring-green-400'}`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {registerError && <p className="text-red-500 text-center">{registerError}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`btn w-full text-white font-semibold rounded-full ${hoverGlow} ${
              isDark
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400'
            }`}
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Register'}
          </motion.button>

          <div className={`divider text-sm ${getThemeClasses.secondaryText}`}>or continue with</div>

          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`btn btn-outline w-full rounded-full flex gap-2 items-center justify-center ${getThemeClasses.primaryText} ${hoverGlow}`}
            disabled={loading}
          >
            <FaGoogle />
            Sign in with Google
          </motion.button>

          <p className={`mt-4 text-sm text-center ${getThemeClasses.secondaryText}`}>
            Already have an account?{' '}
            <Link to="/login" className={`${isDark ? 'text-cyan-400' : 'text-green-600'} font-semibold hover:underline`}>
              Login here
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center relative w-full max-w-xl z-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative text-center px-6 z-10"
        >
          <FaChalkboardTeacher className={`text-6xl ${isDark ? 'text-teal-400' : 'text-emerald-600'} mb-4`} />
          <h2 className={`text-3xl font-bold ${gradientText}`}>
            Inspire. Teach. Learn.
          </h2>
          <p className={`mt-3 ${getThemeClasses.secondaryText} max-w-sm mx-auto`}>
            Whether you're starting your journey as a student or educator, this platform is built for growth and collaboration.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;