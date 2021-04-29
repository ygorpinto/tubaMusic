import styled from 'styled-components'

export const ContainerStyles = styled.div`

/* Estilo geral */

height:100vh;
width:100%;
display:flex;
align-items:center;
justify-content:center;
background:url("https://i.pinimg.com/originals/99/8e/05/998e055aba57c24138220937cc5166ab.gif");
background-position:center;
background-size:cover;

/* pagina pré login */

.buttons {
    width:25rem;
    height:15rem;
    background:rgba(0,0,0,0.1);
    backdrop-filter:blur(5px);
    border-radius:1rem;
    box-shadow: 3px 3px rgba(0,0,0,0.15);

    display:flex;
    align-items:center;
    justify-content:center;

    button {
        height:3rem;
        border:none;
        background-color:#000000;
        box-shadow:rgba(0,0,0,0,5);
        border-radius:0.4rem;
        font-family: 'Montserrat', sans-serif;
        color:#fff;

        display:flex;
        align-items:center;
        justify-content:center;

        img {
            height:2rem;
            width:2rem;
            margin-left:1rem;
        }

        &:hover {
            background-color:#4f4949;
        }
    }
}

/* Estilização dos components pós login */

.showData {
    width:80%;
    height:80vh;
    background:rgba(0,0,0,0.1);
    backdrop-filter:blur(5px);
    border-radius:1rem;
    box-shadow: 3px 3px rgba(0,0,0,0.15);

    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;

    h1 {
        margin-bottom:0;
        font-family: 'Montserrat', sans-serif;
        color:#fff;
        font-weight:900;
    }

    h2 {
        margin-top:0;
        font-family: 'Montserrat', sans-serif;
        color:#fff;
        font-weight:100;
    }

    input {

        height:2rem;
        width:18rem;
        border-radius:0.4rem;
        border:none;
        background-color:#000000;
        color:#fff;
        font-family: 'Montserrat', sans-serif;
        font-weight:200;
        text-align:center;

        ::placeholder{
            text-align:center;
            color:#fff;
            font-family: 'Montserrat', sans-serif;
            font-weight:200;
        }
    }

    .data {
        margin-top:2rem;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-wrap:wrap;
        overflow-y:scroll;

        height:50vh;
        width:100%;

        img {
            max-width:90%;
        }

        .item {
            text-align:center;
            height:20rem;
            width:15rem;
            color:#fff;
            font-family: 'Montserrat', sans-serif;
            font-weight:400;
        }
    }

}

`
