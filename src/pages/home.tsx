import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";
import { Context } from "../utils/context";
import Container from "../components/Container/Container";

export default function Home () {
    
    const {
        state,
        dispatch
      } = useContext(Context);
    
      useEffect(()=>{
        // fetchData();
        // getTokken();
        //     console.log(state.data);  
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
            dispatch({
            type:"getToken",
            payload:response.data.access_token});     
          })
          .catch((err) => console.log(err));
        }
    
      const fetchData = async () => {
          const { data } = await api.get('search?',{
            headers:{
              Authorization: `Bearer ${state.token}`
            },
            params:{
              query:"David+Bowie",
              offset:"0",
              limit:"20",
              type:"artist"
            }
          })
            
          dispatch({
            type:"getData",
            payload:data
          });
      }
    
    
    return (
        <Container>
            <div className="showData">
                <h1>Tuba Music.</h1>
                <h2>enjoy it</h2>
                <input 
                placeholder={"Search your Music, Artist, Album .."}
                type="text"/>
            </div>
        </Container>
    )
}