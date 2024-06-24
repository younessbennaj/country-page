function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 bg-[#1E1E1E] bg-[url('/hero-image-wr.jpg')] pt-[240px] bg-no-repeat bg-contain">
      <img
        className="absolute top-[120px] w-[175px] left-1/2 transform -translate-x-1/2"
        src="/Logo.svg"
        alt="logo"
      />
      {children}
    </div>
  );
}

export default Layout;
