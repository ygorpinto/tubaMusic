import Container from "../components/Container/Container";
import {
  signIn, 
  signOut,
} from 'next-auth/client'


export default function Home() {

  
  
  return (
      <Container>
        <button onClick={()=>signIn()}>Logue aqui</button>
        <button onClick={()=>signOut()}>Desloque</button>
      </Container>
  )
}
