import { useSearch } from '@/lib/hooks/useSearch'
import { Container, SimpleGrid, Text } from '@chakra-ui/react'
import SkeletonCards from './SkeletonCards'
import { ProductResponse } from '@/lib/utils/types'
import ProductCard from './ProductCard'

const Results = () => {
    const { isErrorFetching, isLoading, results, recentSearches } = useSearch()

    return (
        <Container maxW="container.md" mt="5" p="0">
            {isErrorFetching && !isLoading ? <Text textAlign="center" p="1rem" fontSize=".9rem">Unable to find good deals based on your search.</Text> : <></> }
            {!isErrorFetching && isLoading ? <SkeletonCards /> : <></>}

            {!isErrorFetching && !isLoading && results ? <>
            <Text color="gray" fontSize=".8rem" mb=".5rem">Keyword: {recentSearches[0]}</Text>
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
