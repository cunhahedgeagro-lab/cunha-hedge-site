import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo SVG */}
      <div className={`${sizeClasses[size]} relative`}>
        <Image
          src="/images/logo.svg"
          alt="Cunha Hedge Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Texto da Logo */}
      {showText && (
        <div>
          <div className={`font-bold ${textSizeClasses[size]} text-foreground`}>
            Cunha Hedge
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Crédito Rural e Hedge Pecuário
          </div>
        </div>
      )}
    </div>
  );
}
