import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;