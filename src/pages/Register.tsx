import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext'; // AuthContext import
import { db } from '@/firebase/firebase.init';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const { createUser } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // console.log('Received values of form: ', values);
    const { email, password } = values; // Extract email and password from form values

    createUser(email, password) // Pass email and password to the createUser function
      .then((result: any) => {
        const user = result.user;

        const userRef = doc(db, 'users', user.uid); // Use Firestore `doc` to get the reference

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
      .catch((error: any) => {
        console.error(error.message);
        toast.error(error.message); // Handle any error that occurs
      });
  };

  return (
    <div className="mx-auto my-16 flex justify-center">
      <Form
        name="register"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item name="name" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Name" />
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
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
            {
              pattern: /^(?=.*[A-Z])/, // At least one uppercase letter
              message: 'Password must contain at least one uppercase letter',
            },
            {
              pattern: /^(?=.*\d)/, // At least one number
              message: 'Password must contain at least one number',
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters long',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register now
          </Button>
          Or <Link to="/signIn">Login Now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
