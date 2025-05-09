import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGetSingleBicycleQuery } from '@/redux/api/productApi';
import { Bicycle, TOrder } from '@/types';
import { toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const orderState = location.state?.order;
  const order: TOrder = orderState?.data;
  const orderedProductId = order?.product;

  const { data, isLoading } = useGetSingleBicycleQuery(orderedProductId);
  const orderedProductData: Bicycle = data?.data;
  // console.log(orderedProductData);
  if (!order) {
    return <p className="p-6 mt-24 h-full">No order found. Please try again.</p>;
  }

  const paymentUrl = location.state?.paymentUrl;

  const handlePayment = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      toast.error('Payment URL not available');
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-lg p-6 ">
      <h2 className="mb-4 text-2xl font-semibold">Confirm Your Order</h2>
      <div className="rounded-lg border p-4 shadow">
        <p>
          <strong>Product Name:</strong> {isLoading ? 'Loading...' : orderedProductData?.name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Price:</strong> ${order.totalPrice}
        </p>
      </div>

      <Button className="mt-4 w-full" onClick={handlePayment}>
        Proceed to Payment
      </Button>
    </div>
  );
};

export default Checkout;
