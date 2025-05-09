import { Link, useNavigate } from 'react-router-dom';
import { GoogleCircleFilled, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.init';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { Eye, EyeClosed, Bike, Facebook, UserCircle, ShieldCheck } from 'lucide-react';

const SignIn = () => {
  const { loginUser } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Fill in credentials when buttons are clicked
  const fillUserCredentials = () => {
    form.setFieldsValue({
      email: 'user@example.com',
      password: 'User1234'
    });
  };

  const fillAdminCredentials = () => {
    form.setFieldsValue({
      email: 'shakib@bd.com',
      password: 'Skb#0009'
    });
  };

  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        toast.success('Successfully signed in!');
        form.resetFields();

        setTimeout(() => {
          if (userData.role?.toLowerCase() === 'admin') {
            navigate('/admin/dashboard');
          } else if (userData.role?.toLowerCase() === 'customer') {
            const from = location.state?.from?.pathname || '/user/udashboard';
            navigate(from);
          } else {
            navigate('/');
          }
        }, 1500);
      } else {
        toast.error('User role not found.');
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-24 min-h-screen bg-gray-50">
      {/* Left Panel - Image and Brand */}
      <div className="hidden w-1/2 bg-blue-600 lg:block">
        <div className="flex h-full flex-col items-center justify-center p-12 text-white">
          <div className="mb-8 flex items-center">
            <Bike size={48} />
            <h1 className="ml-4 text-4xl font-bold">CycleSphere</h1>
          </div>
          {/* <img 
            src="../assets/cycling-illustration.svg" 
            alt="Cycling Illustration" 
            className="mb-8 w-3/4"
          /> */}
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Welcome Back!</h2>
            <p className="text-lg">
              Sign in to access your account, track orders, and continue your cycling journey.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Bike size={36} className="text-blue-600" />
            <h1 className="ml-2 text-2xl font-bold text-blue-600">CycleSphere</h1>
          </div>

          <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mb-8 text-center text-gray-600">
            Don't have an account yet?{' '}
            <Link to="/signUp" className="font-medium text-blue-600 hover:text-blue-500">
              Register Now Bro!
            </Link>
          </p>

          {/* Quick Login Buttons */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button 
              onClick={fillUserCredentials}
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <UserCircle className="mr-2 h-5 w-5 text-blue-500" />
              <span>User Credentials</span>
            </button>
            <button 
              onClick={fillAdminCredentials}
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ShieldCheck className="mr-2 h-5 w-5 text-green-600" />
              <span>Admin Credentials</span>
            </button>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <GoogleCircleFilled className="mr-2 h-5 w-5 text-red-500" />
              <span>Google</span>
            </button>
            <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              <Facebook className="mr-2 h-5 w-5 text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          <Divider className="my-6">or sign in with email</Divider>

          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />} 
                placeholder="Email Address" 
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                size="large" 
                className="rounded-lg pr-10"
                iconRender={() => null}
                suffix={
                  <span
                    onClick={handlePasswordToggle}
                    className="flex cursor-pointer items-center text-gray-500"
                  >
                    {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                  </span>
                }
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </Form.Item>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Form.Item className="mt-6">
              <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="h-12 rounded-lg bg-blue-600 text-lg font-semibold hover:bg-blue-700"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Having trouble signing in?{' '}
              <Link to="/contact" className="font-medium text-blue-600 hover:text-blue-500">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;