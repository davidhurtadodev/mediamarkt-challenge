import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import AsideSection from './AsideSection';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const asideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );

  return (
    <div
      className={`px-5 pt-12  min-h-screen ${
        asideState.isVisible ? 'overflow-y-hidden' : ''
      }`}
    >
      {children}
      <AsideSection />
    </div>
  );
}
