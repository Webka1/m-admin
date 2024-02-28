import { Progress } from "@chakra-ui/react";

export default function Loader() {
    return (
        <Progress mt={2} size={`sm`} colorScheme='gray' isIndeterminate />
    )
}