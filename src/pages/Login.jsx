import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaUserGraduate } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const Login = () => {
  const { login, googleSignIn, loading, setLoading, resetPassword } = useContext(AuthContext);
  const { isDark, getThemeClasses, gradientText, hoverGlow } = useTheme();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError('');
    try {
      const result = await login(data.email, data.password);

      const maxWaitTime = 5000;
      const startTime = Date.now();

      const waitForToken = setInterval(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
          clearInterval(waitForToken);
          toast.success(`Welcome back, ${result.user.displayName || 'User'}!`);
          navigate(from, { replace: true });
        } else if (Date.now() - startTime > maxWaitTime) {
          clearInterval(waitForToken);
          setLoginError('Login succeeded but token not received. Please refresh.');
        }
      }, 300);
    } catch (err) {
      console.error(err);
      setLoginError('Invalid email or password. Please try again.');
      setLoading(false);
    }
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

  const handleForgetPassword = async () => {
    const email = getValues('email');
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      await resetPassword(email);
      toast.success(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
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
          Login to Your Account
        </h2>
        <p className={`text-center ${getThemeClasses.secondaryText} mb-6`}>
          Empower your learning or teaching journey by logging in.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="••••••••"
              className={`input input-bordered w-full rounded-xl ${getThemeClasses.inputBackground} ${
                errors.password ? 'border-red-500' : ''
              } focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-cyan-400' : 'focus:ring-green-400'}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <p className="text-sm text-right mt-1">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-green-600 hover:text-green-500'} hover:underline`}
                onClick={handleForgetPassword}
              >
                Forgot Password?
              </motion.button>
            </p>
          </div>

          {loginError && <p className="text-red-500 text-center text-sm">{loginError}</p>}

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
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
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
            Continue with Google
          </motion.button>

          <p className={`mt-4 text-sm text-center ${getThemeClasses.secondaryText}`}>
            Don't have an account?{' '}
            <Link to="/register" className={`${isDark ? 'text-cyan-400' : 'text-green-600'} font-semibold hover:underline`}>
              Register here
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
          <FaUserGraduate className={`text-6xl ${isDark ? 'text-cyan-400' : 'text-green-600'} mb-4`} />
          <h2 className={`text-3xl font-bold ${gradientText}`}>
            Welcome Back, Achiever!
          </h2>
          <p className={`mt-3 ${getThemeClasses.secondaryText} max-w-sm mx-auto`}>
            Continue your journey of teaching, learning, and growth with EduManage.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;