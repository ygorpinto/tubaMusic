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
        getTokken();
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
    
      const fetchData = async (e) => {
          e.preventDefault();
          if (state.token) {
              const { data } = await api.get('search?',{
                headers:{
                  Authorization: `Bearer ${state.token}`
                },
                params:{
                  query:state.query,
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
          console.log(state.data.artists.items);  
      }

      const handleSearch = (e) => {
        e.preventDefault();
        dispatch({
            type:"setQuery",
            payload:e.target.value
        });
      }
    
    
    return (
        <Container>
            <div className="showData">
                <h1>Tuba Music.</h1>
                <h2>enjoy it</h2>
                <form
                onSubmit={e => fetchData(e)}
                >
                <input
                onChange={e=>handleSearch(e)}
                placeholder={"Search your Music, Artist, Album .."}
                type="text"/>
                </form>
                <div className="data">
                  {state.data.artists.items.map(item=>{
                      return (
                        <p>{item.name}</p>
                      )})}  

                </div>
            </div>
        </Container>
    )
}