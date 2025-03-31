interface props {
  className?: string
}
function MiniSpinner({className = 'mx-auto'}: props) {
  return (
    <div className={`miniSpinner ${className}`}></div>
  )
}

export default MiniSpinner
