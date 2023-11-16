import {Button} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

type IProps = {
    uid: number
}

export default function ({uid}: IProps) {
    return(
        <Button colorScheme={`blue`} size={`sm`}><EditIcon/></Button>
    )
}