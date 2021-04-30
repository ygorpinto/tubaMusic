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
              dispatch({
                type:"getArtistID",
                payload:data.artists.items[0].id
              });

            console.log(state.artistID);  
          }
      }

      const handleSearch = (e) => {
        e.preventDefault();
        dispatch({
            type:"setQuery",
            payload:e.target.value
        });
      }

      const getPreviousSong = async () => {
        const { data } = await api.get(`artists/${state.artistID}/top-tracks`,{
          headers:{
            Authorization: `Bearer ${state.token}`
          },
          params:{
            market:"BR"
          }
        });
        console.log(data);
        
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
                  {state.data?.artists.items.map(item=>{
                      return (
                        <div 
                        key={item.id}
                        className="item"
                        >
                            <p>{item.name}</p>
                            {item.images[0] ? <img src={item.images[0].url} alt="image"/>
                            :(<img src="https://i.picsum.photos/id/658/200/200.jpg?hmac=f24wxXCkgtH72eZ6mY95KRxTyvEG-_3ysR9z-R0a1QM" alt="ramdom"/>)}
                            <button
                            onClick={getPreviousSong}
                            >Play</button>
                        </div>
                      )})}  

                </div>
            </div>
        </Container>
    )
}