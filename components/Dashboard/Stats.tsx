import {Box, Card, CardBody, StatGroup, Tag, Text} from "@chakra-ui/react";
import {Stat, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/stat";

import {createBrowserClient} from "@supabase/ssr";
const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function Stats() {

    return(
        <Box mt={8}>
            <Text fontSize={`2xl`}>Общая статистика</Text>
            <Card mt={4}>
                <CardBody>
                    <StatGroup>
                        <TotalCustomers/>
                        <TotalOrders/>
                        <TotalItems/>
                    </StatGroup>
                </CardBody>
            </Card>
            <Card mt={4}>
                <CardBody>
                    <StatGroup>
                        <UsersToday/>
                    </StatGroup>
                </CardBody>
            </Card>
        </Box>
    )
}

// @ts-ignore
const StatBlock = ({statLabel, statNumber, statHelpText}) => {
    return(
        <Stat>
            <StatLabel>
                <Text>
                    {statLabel}
                </Text>
            </StatLabel>
            <StatNumber >
                {statNumber}
            </StatNumber>
            <StatHelpText>
                <Text>
                    {statHelpText}
                </Text>
            </StatHelpText>
        </Stat>
    )
}

const TotalCustomers = async () => {
    const { count, error} = await supabase.from('customers').select('id',{
        count: 'exact'
    })

    return(
        <StatBlock
            statLabel={
                <>
                    Пользователей всего
                    { error ? (
                        <Tag variant={`solid`} colorScheme={`red`} size={`sm`}>Ошибка</Tag>
                    ) : ''}
                </>
            }
            statNumber={
                error ? (
                    <Text color={`red`}>{error.code}</Text>
                ) : (
                    <Text>{count}</Text>
                )
            }
            statHelpText={
                <>
                    { error ? (
                        <Text color={`red`}>{error.message}</Text>
                    ) : 'Зарегистрировано' }
                </>
            }
        />
    )
}
const TotalOrders = async () => {
    const { count, error} = await supabase.from('orders').select('id',{
        count: 'exact'
    })

    return(
        <StatBlock
            statLabel={
                <>
                    Всего заказов &nbsp;
                    { error ? (
                        <Tag variant={`solid`} colorScheme={`red`} size={`sm`}>Ошибка</Tag>
                    ) : ''}
                </>
            }
            statNumber={
                error ? (
                    <Text color={`red`}>{error.code}</Text>
                ) : (
                    <Text>{count}</Text>
                )
            }
            statHelpText={
                <>
                    { error ? (
                        <Text color={`red`}>{error.message}</Text>
                    ) : '' }
                </>
            }
        />
    )
}
const TotalItems = async () => {
    const { count, error} = await supabase.from('items').select('id',{
        count: 'exact'
    })

    return(
        <StatBlock
            statLabel={
                <>
                    Всего товаров &nbsp;
                    { error ? (
                        <Tag variant={`solid`} colorScheme={`red`} size={`sm`}>Ошибка</Tag>
                    ) : ''}
                </>
            }
            statNumber={
                error ? (
                    <Text color={`red`}>{error.code}</Text>
                ) : (
                    <Text>{count}</Text>
                )
            }
            statHelpText={
                <>
                    { error ? (
                        <Text color={`red`}>{error.message}</Text>
                    ) : 'Доступно к покупке' }
                </>
            }
        />
    )
}


const UsersToday = async () => {
    const { count, error} = await supabase.from('customers').select('id',{
        count: 'exact'
    }).match({
        registred_date: new Date().toLocaleDateString()
    })

    return(
        <StatBlock
            statLabel={
                <>
                    Пользователей
                    { error ? (
                        <Tag variant={`solid`} colorScheme={`red`} size={`sm`}>Ошибка</Tag>
                    ) : ''}
                </>
            }
            statNumber={
                error ? (
                    <Text color={`red`}>{error.code}</Text>
                ) : (
                    <Text>{count}</Text>
                )
            }
            statHelpText={
                <>
                    { error ? (
                        <Text color={`red`}>{error.message}</Text>
                    ) : 'Зарегистрировано сегодня' }
                </>
            }
        />
    )
}