interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'white';
  animated?: boolean;
  onClick?: () => void;
}

const Card = ({ children, className = '', glowColor = 'blue', animated = false, onClick }: CardProps) => {
  const glowClasses = {
    blue: 'hover:shadow-[0_0_30px_rgba(29,209,242,0.3)] border-[#1dd1f2]/20',
    purple: 'hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] border-[#8a2be2]/20',
    white: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border-white/20'
  };

  return (
    <div 
      className={`
        bg-gradient-to-br from-[#16213e]/50 to-[#040b1e]/80 
        backdrop-blur-sm border rounded-lg p-6 
        transition-all duration-300 hover:scale-105
        ${glowClasses[glowColor]}
        ${animated ? 'floating-element' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;