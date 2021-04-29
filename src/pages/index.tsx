import { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";
import {
  signIn, 
  signOut,
} from 'next-auth/client'
import api from "../utils/api";

export default function Home() {

  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  useEffect(()=>{
      fetchData();
      getTokken();
      console.log(data);  
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
        'Authorization': 'Basic ' + 'ODUyYWU3NWYwNzU0NDFlODllMjA5MDk0MmNhMzQxZDI6Y2E1MzFmNjg3NWY4NDVkN2I5ZTFlODNjZDViYmJkMTU='
      },
    })
      .then((response) => {
        setToken(response.data.access_token);     
      })
      .catch((err) => console.log(err));
    }

  const fetchData = async () => {
      const { data } = await api.get('search?',{
        headers:{
          Authorization: `Bearer ${token}`
        },
        params:{
          query:"David+Bowie",
          offset:"0",
          limit:"20",
          type:"artist"
        }
      })
        
      setData(data);
  }

  
  return (
      <Container>
        <button onClick={()=>signIn()}>Logue aqui</button>
        <button onClick={()=>signOut()}>Desloque</button>
      </Container>
  )
}
