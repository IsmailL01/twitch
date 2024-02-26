'use client';

import { Button } from '@/src/components/ui/Button';
import { CheckIcon, Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  value?: string;
}

const CopyButton = (props: CopyButtonProps) => {
  const { value } = props;
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckIcon : Copy;

  return (
    <Button
      className='cursor-pointer'
      onClick={onCopy}
      disabled={!value || isCopied}
      variant='ghost'
      size='sm'
    >
      <Icon />
    </Button>
  );
};

export default CopyButton;
