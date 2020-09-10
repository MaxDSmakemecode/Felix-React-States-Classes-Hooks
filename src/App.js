import React from "react"
import PersonDetails from "./PersonDetails"

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      id: 2,
      users: [],
    }
  }

  handleClick({ id }) {
    this.setState({
      id,
    })
  }

  // handleClick(user) {
  //   const id = user.id
  //   this.setState({
  //     id,
  //   })
  // }

  componentDidMount() {
    fetch("https://api.github.com/users")
      // 'response' is just the response code like 200 or 300 f.e. in general
      // json() method just retrieves the data and outputs it so result is the data
      .then((response) => response.json())
      .then((result) => {
        this.setState({ users: result, id: result[0].id })
        // the result is the whole users array from above url in fetch
        // console.log(result)
      })
  }

  render() {
    // console.log("thi>>>>", this.state)
    console.log(this.state.id)

    // here users is the result of fetch and to access 'this.setState' in fetch, 'this.state' is needed
    // find then looks for the first item (or 'user') in result.
    // if the id of clicked user is identical to the found id (first found one) then output it. If not make an empty object, so react doesn't throw an error
    const foundUser =
      this.state.users.find((user) => user.id === this.state.id) || {}
    
    const { login, repos_url, followers_url } = foundUser
    /* 
    above code on the left side of the equal sign is destructured from 
    'const login, repos_url, followers_url' 
    but the problem with that would be that you won't be able to write the objects like in PersonDetails component below => react will throw an error 
    */

    return (
      <div>
        {this.state.users.map((user) => {
          // console.log("user", user)
          return <div onClick={() => this.handleClick(user)}>{user.login}</div>
        })}
        <PersonDetails
          headline={login}
          description={repos_url}
          age={followers_url}
        />
      </div>
    )
  }
}

export default App
