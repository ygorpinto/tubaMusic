import axios from "axios";
import { useState } from "react";
import Container from "../components/Container";
import api from "../utils/api";

export default function Home() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const query = "?"
    const { data } = await api.get(`search?q=${query}`)
    setData(data);
  }

  fetchData();

  console.log(data);
  

  return (
      <Container>
        
      </Container>
  )
}
