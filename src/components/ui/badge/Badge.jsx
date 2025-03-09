export const Badge=({ children, className = "" })=> {
    return (
      <span 
        className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${className}`}
      >
        {children}
      </span>
    );
  }