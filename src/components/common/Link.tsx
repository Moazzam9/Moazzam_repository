import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ to, children, className = '', onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Update the URL without refreshing the page
    window.history.pushState({}, '', to);
    
    // Dispatch a navigation event that our app can listen for
    window.dispatchEvent(new CustomEvent('navigation', { detail: { path: to } }));
    
    if (onClick) onClick();
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};