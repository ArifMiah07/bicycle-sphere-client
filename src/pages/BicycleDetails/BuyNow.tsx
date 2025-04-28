import { useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '@/redux/features/order/orderApi';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

interface BuyNowButtonProps {
  inStock: boolean;
  title: string;
  productId: string;
  quantity: number;
  email: string;
  price: number;
}

const BuyNow = ({ productId, title, quantity, price, inStock }: BuyNowButtonProps) => {
  const navigate = useNavigate();
  const [createOrder] = usePlaceOrderMutation();
  const { user } = useAuth();

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/signIn');
      return;
    }

    try {
      const orderData = {
        product: productId,
        title: title,
        email: user.email,
        quantity,
        totalPrice: quantity * price,
      };

      const res = await createOrder(orderData).unwrap();

      toast.success('Order placed successfully!');

      navigate('/checkout', {
        state: {
          order: res,
          paymentUrl: res.payment.checkout_url,
        },
      });
    } catch (error) {
      console.error('Order failed:', error);
      toast.error('Failed to place order');
    }
  };

  return (
    <Button disabled={inStock} className="flex-1" onClick={handleBuyNow}>
      Buy Now
    </Button>
  );
};

export default BuyNow;
