function Footer() {
  const date = new Date();
  return (
    <footer className="p-4">
      <p className="text-center">Rajwinder &copy; {date.getFullYear()}</p>
    </footer>
  );
}

export default Footer;

