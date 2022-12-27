import { useStore } from '@/utils/store';

const LoadingBar = () => {
  const { isLoading } = useStore();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 z-50 h-3 w-screen animate-pulse bg-sky-700" />
  );
};

export default LoadingBar;
