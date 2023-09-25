import CircleDecoration from '@/assets/vectors/circle-decoration.svg';

const Layout = ({ children }) => (
  <div>
    <CircleDecoration className="fixed start-0 -translate-x-1/4 -translate-y-1/4 scale-90" />
    <CircleDecoration className="fixed bottom-0 end-0 translate-x-1/4 translate-y-1/4 rotate-180" />

    <main className="min-h-d-screen relative z-10 grid place-content-center">{children}</main>
  </div>
);

export default Layout;
