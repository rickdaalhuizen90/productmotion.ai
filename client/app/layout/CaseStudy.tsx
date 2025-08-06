interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function CaseStudy(props: ContainerProps) {
  const { children, className = '' } = props;
  return (
    <main className={`max-w-screen-xl mx-auto w-full px-4 py-32 ${className}`}>
      {children}
    </main>
  );
};
