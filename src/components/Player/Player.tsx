import { useContext } from 'react';
import { Context } from '../../utils/context';
import PlayerStyles from './PlayerStyles'

const Player = () => {

    const {
        state,
        dispatch
      } = useContext(Context);

    return (
        <PlayerStyles>
            
        </PlayerStyles>
    )
}

export default Player;