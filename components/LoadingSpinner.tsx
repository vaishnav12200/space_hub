interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-[#1dd1f2]/30 rounded-full animate-spin`}></div>
        {/* Inner ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-[#1dd1f2] rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      {text && (
        <p className={`${textSizes[size]} text-gray-400 animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;