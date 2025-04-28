import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoToSignIn = () => {
    navigate('/'); // Redirects to the sign-in page
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600">Unauthorized</h1>
      <p className="mt-4">You do not have permission to access this page.</p>
      <Button type="primary" className="mt-4" onClick={handleGoToSignIn}>
        Go to Sign In
      </Button>
    </div>
  );
};

export default Unauthorized;
