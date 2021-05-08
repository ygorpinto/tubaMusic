import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import api from "../utils/api";
import { Context } from "../utils/context";
import Container from "../components/Container/Container";
import Player from "../components/Player/Player";

export default function Home () {
    
    const {
        state,
        dispatch
      } = useContext(Context);
    
      useEffect(()=>{
        getTokken();
      },[])

      useEffect(()=>{
        play();
      },[state.isPlaying])

      useEffect(()=>{
        handleArtistTrack();
        console.log(state.isArtistTrack);
        
      },[state.artistTrack])

      const audioRef = useRef(null);
    
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

            console.log(state.data);  
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
        dispatch({
          type:"getArtistTrack",
          payload:data.tracks[0].preview_url
        })
        dispatch({
          type:"setIsPlaying",
          payload:!state.isPlaying
        })
        console.log(data);
        console.log(state.artistTrack);
      }
    
      const play = () => {
        if (!audioRef.current) {
            return;
        }
        if (state.isPlaying) {
          audioRef.current.play()
        } else {
          audioRef.current.pause()
        }
      }
    
      const handleArtistTrack = () => {
        dispatch({
          type:"setIsArtistTrack",
          payload: state.artistTrack ? true : false
        })
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
                  <audio
                  autoPlay
                  src={state.artistTrack}
                  ref={audioRef}
                  />
                  <div className="item">
                            <p>{state.data?.artists.items[0].name}</p>
                            {state.data?.artists.items[0].images[0] ? <img src={state.data?.artists.items[0].images[0].url} alt="image"/>
                            :(<img src="https://i.picsum.photos/id/658/200/200.jpg?hmac=f24wxXCkgtH72eZ6mY95KRxTyvEG-_3ysR9z-R0a1QM" alt="ramdom"/>)}
                              <button
                              onClick={getPreviousSong}
                              >{!state.isPlaying ? (
                                <img 
                                src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-play-icon-png-image_695746.jpg" alt="play"/>
                              ) : (
                                <img 
                                src="https://w7.pngwing.com/pngs/879/589/png-transparent-pause-logo-computer-icons-button-media-player-pause-button-rectangle-black-internet-thumbnail.png" alt="play"/>
                              ) }</button>
                    </div>
                </div>
                <Player/>
            </div>
        </Container>
    )
}