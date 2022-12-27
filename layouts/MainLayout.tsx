import { ReactNode } from 'react';
import Header from '@/components/Header';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="mt-8">{children}</main>
    </div>
  );
}
