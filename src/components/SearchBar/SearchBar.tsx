import { useAppDispatch } from '@/redux/hook';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { setSearch } from '@/redux/features/bicycle/bicycleSlice';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  // automatically dispatch when input is cleared
  useEffect(() => {
    if (input.trim() === '') {
      dispatch(setSearch('')); // fetch all again
    }
  }, [input, dispatch]);

  const handleSearch = () => {
    if (input.trim() !== '') {
      dispatch(setSearch(input));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="Search by name, brand or category"
        value={input}
        onChange={handleInputChange}
        className="w-full"
      />
      <Button onClick={handleSearch} className="w-full">
        Search
      </Button>
    </div>
  );
}
