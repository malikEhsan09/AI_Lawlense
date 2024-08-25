import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, label, value, onChange, ...props }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        className="text-md peer h-[52px] w-[297px] rounded-md border border-gray-300 bg-transparent px-3 text-black outline-none transition-all focus:border-[#E3A706] active:border-[#E3A706]"
        {...props}
      />
      <label
        htmlFor={label}
        className={`pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 px-2 text-sm text-gray-500 transition-all 
          ${value ? 'top-0 bg-white text-sm' : ''}
          peer-focus:top-0 peer-focus:bg-white peer-focus:text-sm peer-focus:text-[#E3A706]`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
