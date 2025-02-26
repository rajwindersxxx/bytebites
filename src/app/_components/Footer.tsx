function Footer() {
  const date = new Date();
  return (
    <div className="p-4">
      <p className="text-center">Rajwinder &copy; {date.getFullYear()}</p>
    </div>
  )
}

export default Footer
