type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<E> & {
    as?: E;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
    color?: string;
  }
>;

export function Typography<T extends React.ElementType = 'p'>({
  as,
  variant,
  color,
  className = '',
  children,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'p';
  
  // Map variants to appropriate classes
  const variantClasses = {
    h1: 'text-4xl font-bold md:text-5xl',
    h2: 'text-3xl font-bold md:text-4xl',
    h3: 'text-2xl font-bold md:text-3xl',
    h4: 'text-xl font-bold md:text-2xl',
    h5: 'text-lg font-bold md:text-xl',
    h6: 'text-base font-bold md:text-lg',
    body: 'text-base',
    caption: 'text-sm text-gray-600',
  };
  
  const classes = `${variant ? variantClasses[variant] : ''} ${className}`;
  
  return (
    <Component 
      className={classes} 
      style={color ? { color } : undefined} 
      {...props}
    >
      {children}
    </Component>
  );
}

