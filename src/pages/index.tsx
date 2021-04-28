import { useState } from "react";
import Container from "../components/Container";
import api from "../utils/api";
import {
  signIn, 
  signOut
} from 'next-auth/client'

export default function Home() {

  const [data, setData] = useState([]);

  const fetchData = async () => {

  }

  // fetchData();

  console.log(data);
  

  return (
      <Container>
      </Container>
  )
}
