import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Building2 } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Container from '../../components/common/Container';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

type RegisterType = 'customer' | 'admin';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [registerType, setRegisterType] = useState<RegisterType>('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '', // Only for admin registration
    organizationId: '', // Only for admin registration
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <div className="flex space-x-2 mb-6">
                  <Button
                    type="button"
                    variant={registerType === 'customer' ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => setRegisterType('customer')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Customer
                  </Button>
                  <Button
                    type="button"
                    variant={registerType === 'admin' ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => setRegisterType('admin')}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email address
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {registerType === 'admin' && (
                      <>
                        <div>
                          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Organization Name
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building2 className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="organizationName"
                              name="organizationName"
                              type="text"
                              required
                              value={formData.organizationName}
                              onChange={handleInputChange}
                              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                              placeholder="Enter organization name"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="organizationId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Organization ID
                          </label>
                          <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building2 className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="organizationId"
                              name="organizationId"
                              type="text"
                              required
                              value={formData.organizationId}
                              onChange={handleInputChange}
                              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                              placeholder="Enter organization ID"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                          placeholder="Create a password"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>

                  <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};

export default RegisterPage;