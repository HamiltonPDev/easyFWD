export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <nav>category navigation</nav>
        {children}
      </body>
    </html>
  );
}
