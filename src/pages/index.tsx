import Container from "../components/Container/Container";
import {
  signIn, 
  useSession,
} from 'next-auth/client'
import { useRouter } from 'next/router'


export default function Home() {

  const [session,loading] = useSession();
  const router = useRouter();

  if(session){
    router.push('/home')
  }
  
  return (
      <Container>
        <div className="buttons">
        <button onClick={()=>signIn()}>Entre com sua conta Spotify.
        <img src="https://cdn.iconscout.com/icon/free/png-512/spotify-11-432546.png" alt="spotfyicon"/>
        </button>
        </div>
      </Container>
  )
}
