
const ImageFromDetail = ({name, age, gender, username}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '300px', width: '300px', background: '#53a8b6', marginBottom: '2px', border: '1px solid #53a8b5' }}>
        <p color="white">{name}</p>
        <p>{age}</p>
        <p>{gender}</p>
        <p>{username}</p>
    </div>
  )
}

export default ImageFromDetail