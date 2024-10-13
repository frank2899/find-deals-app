import { useSearch } from '@/lib/hooks/useSearch'
import { Container, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import SkeletonCards from './SkeletonCards'
import { ProductResponse } from '@/lib/utils/types'
import ProductCard from './ProductCard'
import { BiCurrentLocation } from "react-icons/bi"

const Results = () => {
    const { isErrorFetching, isLoading, results, recentSearches, location } = useSearch()

    return (
        <Container maxW="container.lg" mt="5" p="0">
            {isErrorFetching && !isLoading ? <Text textAlign="center" p="1rem" fontSize=".9rem">Unable to find good deals based on your search.</Text> : <></> }
            {!isErrorFetching && isLoading ? <SkeletonCards /> : <></>}

            {!isErrorFetching && !isLoading && results ? <>
            { location ? <Flex alignItems="center" mb=".5rem">
                <BiCurrentLocation/>
                <Text color="gray" fontSize=".8rem" ml="5px">{location}</Text>
            </Flex> : <></>}

            <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                {
                    results.map((e: ProductResponse) => <ProductCard details={e}/>)
                }
            </SimpleGrid>
            </> : <></>}
        </Container>
    )
}

export default Results
