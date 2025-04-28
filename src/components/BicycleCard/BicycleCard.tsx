import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Bicycle } from '@/types';

export default function BicycleCard({ bicycle }: { bicycle: Bicycle }) {
  const { img, name, brand, model, price, category, _id } = bicycle;

  return (
    <div className="mx-auto max-w-xs space-y-2 rounded-2xl border bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:max-w-sm md:max-w-md lg:max-w-lg">
      <img src={img} alt={name} className="h-48 w-full rounded-lg object-cover" />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">
        {brand} — {model}
      </p>
      <p className="text-lg font-medium text-green-600">${price}</p>
      <p className="text-sm text-gray-500 capitalize">Category: {category}</p>

      <Link to={`/bicycles/${_id}`}>
        <Button className="mt-3 w-full">View Details</Button>
      </Link>
    </div>
  );
}
