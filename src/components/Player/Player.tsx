import { useContext } from 'react';
import { Context } from '../../utils/context';
import PlayerStyles from './PlayerStyles'

const Player = () => {

    const {
        state,
        dispatch
      } = useContext(Context);

    //   ideia de criar um como player pra ser responsável por controlar o audio e criar um context específico



    return (
        <PlayerStyles>
            
        </PlayerStyles>
    )
}

export default Player;