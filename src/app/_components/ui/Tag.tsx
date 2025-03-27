interface props {
  color: string;
  item: {name: string}
}
function Tag({color , item}: props) {
  return (
    <p className={`p-2 ${color} text-center rounded-md`}>
    {item.name}
  </p>
  )
}

export default Tag
