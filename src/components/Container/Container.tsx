import { ContainerStyles } from "./ContainerStyles"

const Container = ({children}) => {
    return (
        <ContainerStyles>
            {children}
        </ContainerStyles>
    )
}

export default Container