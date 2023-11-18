import {Button, Tooltip} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

type IProps = {
    uid: number
}

export default function ({uid}: IProps) {
    return(
        <Tooltip label={`Редактировать`}><Button colorScheme={`blue`} size={`sm`}><EditIcon/></Button></Tooltip>
    )
}