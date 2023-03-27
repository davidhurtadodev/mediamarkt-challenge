import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const asideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );

  return (
    <div
      className={`px-5 pt-12  h-full ${
        asideState.isVisible ? 'overflow-y-hidden' : ''
      }`}
    >
      <main>{children}</main>
    </div>
  );
}
