export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <nav>Category navigation</nav>
        {children}
      </body>
    </html>
  );
}
