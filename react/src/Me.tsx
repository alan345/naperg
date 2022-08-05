import React from "react"
import { gql, useQuery } from "@apollo/client"
import { PostsContext } from "./Context"

export const QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`

const Me: React.FC = () => {
  const { data } = useQuery(QUERY)
  const context = React.useContext(PostsContext)

  React.useEffect(() => {
    console.log("me")
    if (data?.me?.id) {
      context.updateUser(data.me)
    }
  }, [data])

  return null
}

export default Me;
