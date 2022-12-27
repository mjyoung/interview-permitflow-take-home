import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

export default function SectionCard({ children, title }: Props) {
  return (
    <div className="card">
      <h4 className="mb-4 text-xl">{title}</h4>
      {children}
    </div>
  );
}
