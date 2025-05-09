import { Link, useNavigate } from 'react-router-dom';
import { GoogleCircleFilled, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebase.init';
import { toast } from 'react-toastify';
import { Eye, EyeClosed, Bike, Facebook } from 'lucide-react';
import { useState } from 'react';


interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { createUser } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const onFinish = (values:RegisterFormValues) => {
    setLoading(true);
    const { email, password, name } = values;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const userRef = doc(db, 'users', user.uid);

        return setDoc(userRef, {
          uid: user.uid,
          name,
          email,
          role: 'customer',
          createdAt: serverTimestamp(),
        });
      })
      .then(() => {
        toast.success('Successfully registered!');
        form.resetFields();
        setTimeout(() => navigate('/'), 900);
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
            <h2 className="mb-4 text-3xl font-bold">Join Our Cycling Community</h2>
            <p className="text-lg">
              Discover amazing bicycles, connect with fellow cyclists, and enjoy exclusive member benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Bike size={36} className="text-blue-600" />
            <h1 className="ml-2 text-2xl font-bold text-blue-600">CycleSphere</h1>
          </div>

          <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mb-8 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/signIn" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>

          {/* Social Sign-up Buttons */}
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

          <Divider className="my-6">or register with email</Divider>

          <Form
            form={form}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Full Name" 
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

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
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  pattern: /^(?=.*[A-Z])/,
                  message: 'Password must contain at least one uppercase letter',
                },
                {
                  pattern: /^(?=.*\d)/,
                  message: 'Password must contain at least one number',
                },
                {
                  min: 8,
                  message: 'Password must be at least 8 characters long',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                type={showPassword ? 'text' : 'password'}
                placeholder="Create Password"
                size="large"
                className="rounded-lg pr-10"
                iconRender={() => null}
                allowClear
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

            <div className="mt-2 text-sm text-gray-600">
              <p>Password must:</p>
              <ul className="ml-4 list-disc">
                <li>Be at least 8 characters long</li>
                <li>Contain at least one uppercase letter</li>
                <li>Contain at least one number</li>
              </ul>
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
                Create Account
              </Button>
            </Form.Item>

            <div className="mt-4 text-center text-sm text-gray-600">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;