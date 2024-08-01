import { forwardRef } from 'react';
import { Props } from './typings';

const Input = forwardRef<HTMLInputElement, Props>(({
  onChange,
  placeholder,
  value,
  label,
  Icon,
  type = 'text',
  name = '',
  onBlur,
  onFocus = () => {}
}, ref) => {
  return (
    <div className="w-full flex items-center bg-white border rounded-xl overflow-hidden">
      {Icon && <Icon className="ml-2" />}
      {label && <label className="block mb-2 text-sm font-medium text-black">{label}</label>}
      <input
        ref={ref}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        type={type}
        className="w-full p-2.5 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});

export default Input;