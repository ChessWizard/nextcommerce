import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PasswordInput = ({
    name,
    isRequired = true
}:
{
    name: string,
    isRequired?: boolean
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        name={name}
        className="w-full pr-10"
        required={isRequired}
      />
      <button
        type="button"
        onClick={() => setShowPassword(prev => !prev)}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
