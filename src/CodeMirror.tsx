import axios from "axios";
import { useEffect, useState } from "react";
import ImageFromDetail from "./ImageFromDetail";
import PaginationIndex from "./paginationIndex";

interface User {
  name: string;
  age: number;
  gender: string;
  username: string;
}

const CodeMirror = () => {
  const [user, setUser] = useState<User[]>([]);
  const [startPage, setStartPage] = useState<number>(1);

  const totalNumberOfUsers = 200;
  const totalNumerOfImagesPerRow = 4;
  const totalNumberofPages = Math.ceil(totalNumberOfUsers / totalNumerOfImagesPerRow);

  const fetchUsersData = async (): Promise<User[]> => {
    try {
      const res = await axios.get("https://dummyjson.com/users?limit=" + totalNumberOfUsers);
      return res.data.users.map((eachUser: any): User => ({
        name: eachUser.firstName,
        age: eachUser.id,
        gender: eachUser.gender,
        username: eachUser.username
      }));
    } catch (ex) {
      console.error(ex);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const finalData = await fetchUsersData();
      setUser(finalData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          justifyContent: "center"
        }}
      >
        {user
          .slice(startPage - 1, startPage + totalNumerOfImagesPerRow - 1)
          .map((eachUser, key) => (
            <ImageFromDetail
              key={eachUser.username} // assuming username is unique; you used "id" before, but "id" isn’t available
              name={eachUser.name}
              age={eachUser.age}
              gender={eachUser.gender}
              username={eachUser.username}
            />
          ))}
      </div>

      <PaginationIndex
        totalSize={totalNumberofPages}
        setStartPage={setStartPage}
        totalNumerOfImagesPerRow={totalNumerOfImagesPerRow}
      />
    </>
  );
};

export default CodeMirror;
