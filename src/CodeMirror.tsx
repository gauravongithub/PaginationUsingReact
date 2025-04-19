import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ImageFromDetail from './ImageFromDetail'
import PaginationIndex from './paginationIndex'
import './styles.css'

export interface User {
  name: string
  age: number
  gender: string
  username: string
}

const CodeMirror = () => {
  const infiniteScrollingConstant = 4
  const [user, setUser] = useState<User[]>([])
  const [startPage, setStartPage] = useState<number>(1)
  const [visibleItems, setVisibleItems] = useState([] as User[])
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const totalNumberOfUsers = 200
  const totalNumerOfImagesPerRow = 16
  const totalNumberofPages = Math.ceil(
    totalNumberOfUsers / totalNumerOfImagesPerRow
  )

  const fetchUsersData = async (): Promise<User[]> => {
    try {
      const res = await axios.get(
        'https://dummyjson.com/users?limit=' + totalNumberOfUsers
      )
      return res.data.users.map(
        (eachUser: any): User => ({
          name: eachUser.firstName,
          age: eachUser.id,
          gender: eachUser.gender,
          username: eachUser.username
        })
      )
    } catch (ex) {
      console.error(ex)
      return []
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.currentTarget
    if (
      target.clientHeight + target.scrollTop >= target.scrollHeight - 5 &&
      visibleItems.length < totalNumerOfImagesPerRow
    ) {
      setVisibleItems((prev) => [
        ...prev,
        ...user.slice(
          prev.length + startPage - 1,
          prev.length + infiniteScrollingConstant + startPage - 1
        )
      ])
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const finalData = await fetchUsersData()
      setUser(finalData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const finalVisibleUsers = user.slice(
      startPage - 1,
      startPage + infiniteScrollingConstant - 1
    )
    setVisibleItems(finalVisibleUsers)

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [user, startPage])

  return (
    <>
      <div
        style={{ height: 300, overflow: 'auto' }}
        onScroll={(e) => handleScroll(e)}
      >
        <div
        className="scroll-container"
        ref = {scrollRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            justifyContent: 'center',
            overflowX: 'hidden',
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 #f1f1f1'
          }}
        >
          {visibleItems.map((eachUser) => (
            <ImageFromDetail
              key={eachUser.username}
              name={eachUser.name}
              age={eachUser.age}
              gender={eachUser.gender}
              username={eachUser.username}
            />
          ))}
        </div>
      </div>
      <PaginationIndex
        totalSize={totalNumberofPages}
        setStartPage={setStartPage}
        totalNumerOfImagesPerRow={totalNumerOfImagesPerRow}
        setVisibleItems={setVisibleItems}
      />
    </>
  )
}

export default CodeMirror
