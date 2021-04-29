import { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";
import {
  signIn, 
  signOut,
  useSession
} from 'next-auth/client'
import api from "../utils/api";

export default function Home() {

  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [session,loading] = useSession();


  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  useEffect(()=>{
    if (session) {
      fetchData();
      getTokken();
      console.log(data);
      
    }
  },[])

  async function getTokken() {
    const urlSpotify = "https://accounts.spotify.com/api/token";
    await axios({
      method: "post",
      url: urlSpotify,
      data: "grant_type=client_credentials",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.CLIENT_ID, // User ID
        password: process.env.CLIENT_SECRET,  // User Secret
      },
    })
      .then((response) => {
        console.log(response);
        
      })
      .catch((err) => console.log(err));
    }

  const fetchData = async () => {
    if (session) {
      const { data } = await api.get('tracks/2TpxZ7JUBn3uw46aR7qd6V',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
        
      setData(data);
    }
  }

  
  return (
      <Container>
        <button onClick={()=>signIn()}>Logue aqui</button>
        <button onClick={()=>signOut()}>Desloque</button>
      </Container>
  )
}
