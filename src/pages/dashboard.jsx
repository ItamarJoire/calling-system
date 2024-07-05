import { useContext } from "react"
import { AuthContext } from "../contexts/auth"

export function Dashboard(){
  const { logout } = useContext(AuthContext)
  
  async function handleLogout(){
    await logout()
  }

  return(
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair da conta</button>
    </div>
  )
}