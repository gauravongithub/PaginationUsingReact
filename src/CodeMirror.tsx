import axios from "axios"
import { useEffect, useState } from "react"
import ImageFromDetail from "./ImageFromDetail"
import PaginationIndex from "./paginationIndex"

const CodeMirror = () => {
  const [user, setUser] = useState([])
  const [startPage, setStartPage] = useState(1)
  const totalNumberOfUsers = 200
  const totalNumerOfImagesPerRow = 8
  const totalNumberofPages = Math.ceil(totalNumberOfUsers/totalNumerOfImagesPerRow)


  const fetchUsersData = async() => {
    return await  axios(`https://dummyjson.com/users?limit=${totalNumberOfUsers}`).then(res => (
      res.data.users.map((eachUser: any) => (
        {
          name: eachUser.firstName,
          age: eachUser.id,
          gender: eachUser.gender,
          username: eachUser.username
        }
      )))
    ).catch(ex => console.log(ex))
  }

  useEffect(() => {
    const fetchData = async() => {
      const finalData = await fetchUsersData()
      setUser(finalData)
    }
    fetchData()
  }, [])
  
  return (
    <>
    <div style={{display: 'flex',
      flexWrap: 'wrap',
      gap: '5px',
      justifyContent: 'center'  }}>
      {user.slice(startPage-1, startPage + totalNumerOfImagesPerRow -1).map((eachUsers, key) => {
      return <ImageFromDetail
        key={eachUsers.id}  
        name = {eachUsers.name}
        age = {eachUsers.age} 
        gender =  {eachUsers.gender} 
        username = {eachUsers.username} />
    })}
    </div>
    <PaginationIndex totalSize = {totalNumberofPages} setStartPage = {setStartPage} totalNumerOfImagesPerRow = {totalNumerOfImagesPerRow}/>
     </>
  )
}

export default CodeMirror