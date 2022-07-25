import PlayButton from 'Styles/Game/Menu'

interface Props{
    play(): void 
}

const Menu = ({play: callback}: Props) =>{
    return(
        <PlayButton onClick={()=> callback()}>Play</PlayButton>
    )
}
export default Menu