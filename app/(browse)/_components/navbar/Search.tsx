'use client';

import qs from 'query-string';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { X, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { term: value },
      },
      {
        skipEmptyString: true,
      }
    );
    router.push(url);
  };

  const onClear = () => {
    setValue('');
  };

  return (
    <form
      className='relative w-full lg:w-[400px] flex items-center'
      onSubmit={onSubmit}
    >
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
        placeholder='Search'
      />
      {value && (
        <X
          className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition'
          onClick={onClear}
        />
      )}
      <Button
        className='rounded-l-none'
        type='submit'
        size='sm'
        variant='secondary'
      >
        <SearchIcon className='h-5 w-5 text-muted-foreground' />
      </Button>
    </form>
  );
};

export { Search };
