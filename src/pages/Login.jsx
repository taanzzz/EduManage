import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify'; 
import { AuthContext } from '../contexts/AuthProvider';


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
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)] px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h1 className="text-3xl font-bold text-center text-primary">Login Now</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
          </div>

          {loginError && <p className="text-error text-center text-sm mt-2">{loginError}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Login'}
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="link link-hover text-primary font-semibold">
              Register here
            </Link>
          </p>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline btn-primary" disabled={loading}>
            <FaGoogle />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;