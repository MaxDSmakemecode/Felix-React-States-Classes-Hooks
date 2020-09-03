import React, { useState, useEffect } from "react"
import PersonDetails from "./PersonDetails"

function App() {
  const [id, setId] = useState(2)
  const [users, setUsers] = useState([])

  function handleClick({ id }) {
    setId(id)
  }

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((result) => {
        setId(result[0].id)
        setUsers(result)
      })
  }, [])

  const foundUser = users.find((user) => user.id === id) || {}

  const { login, repos_url, followers_url } = foundUser

  return (
    <div>
      {users.map((user, i) => {
        return (
          <div key={i} onClick={() => handleClick(user)}>
            {user.login}
          </div>
        )
      })}
      <PersonDetails
        headline={login}
        description={repos_url}
        age={followers_url}
      />
    </div>
  )
}

export default App
