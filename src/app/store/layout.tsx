export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <nav>Store navigation</nav>
        {children}
      </body>
    </html>
  );
}
