interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

import Link from 'next/link';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  href, 
  disabled = false 
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#1dd1f2] to-[#8a2be2] text-white hover:from-[#1bb8d1] hover:to-[#7a24c4] focus:ring-[#1dd1f2] shadow-lg hover:shadow-[0_0_30px_rgba(29,209,242,0.5)]',
    secondary: 'bg-[#16213e] border-2 border-[#1dd1f2] text-[#1dd1f2] hover:bg-[#1dd1f2] hover:text-[#040b1e] focus:ring-[#1dd1f2]',
    ghost: 'text-[#1dd1f2] hover:bg-[#1dd1f2]/10 focus:ring-[#1dd1f2]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;