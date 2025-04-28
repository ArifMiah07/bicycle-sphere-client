// src/components/BicycleCard/BCard.tsx
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Bicycle } from '@/types';

const BCard = ({ bicycle }: { bicycle: Bicycle }) => {
  const { name, brand, model, price, category, _id } = bicycle;

  return (
    <Card className="h-fit w-full rounded-2xl p-4 shadow-md">
      <CardContent className="space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p>Brand: {brand}</p>
        <p>Model: {model}</p>
        <p>Category: {category}</p>
        <p className="font-semibold text-green-600">${price}</p>
        <Link to={`/bicycles/${_id}`}>
          <Button className="mt-3 w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BCard;
