import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.init';
import { useLocation } from 'react-router';

const SignIn: React.FC = () => {
  const { loginUser } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values: any) => {
    const { email, password } = values;

    try {
      const result = await loginUser(email, password);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        // console.log('User data from Firestore:', userData);

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
    } catch (error: any) {
      console.error(error.message);
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="mx-auto mt-24 my-16 flex justify-center">
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
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
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          Or <Link to="/signUp">Register Now Bro!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
