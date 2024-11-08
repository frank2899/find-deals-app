'use client'

import Results from '@/components/Results'
import { useSearch } from '@/lib/hooks/useSearch'
import {
    Container,
    InputGroup,
    Input,
    InputLeftElement,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    Text,
    SimpleGrid,
    FormControl,
    FormLabel,
    Button,
    Box,
    Stack,
    Badge,
} from '@chakra-ui/react'
import { BiSearchAlt2 } from 'react-icons/bi'

const Home = () => {
    const { search, minPrice, maxPrice, setSearch, setMinPrice, setMaxPrice, handleSearch, isLoading, recentSearches } = useSearch()

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') handleSearch()
    }

    return (
        <Box p="10px">
            <Container maxW="container.lg" boxShadow="base" p="6" rounded="lg" bg="white" mt="10">
                <Text mb="1rem" fontWeight="bolder" color="#122167">
                    Let's find good deals for you.
                </Text>
                <InputGroup size="md" mb="1rem">
                    <InputLeftElement mr="2rem">
                        <BiSearchAlt2 fontSize="1.2rem" color="#122167" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        placeholder="Search products"
                        isDisabled={isLoading}
                        value={search}
                        onKeyPress={handleKeyPress}
                        onChange={(val) => setSearch(String(val.target.value))}
                    />
                </InputGroup>

                <SimpleGrid columns={[2, 3]} spacing={[5, 10]}>
                    <FormControl>
                        <FormLabel fontSize=".8rem">Min price:</FormLabel>
                        <NumberInput isDisabled={isLoading} min={0} size="sm" value={minPrice} onChange={(val) => setMinPrice(Number(val))}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize=".8rem">Max price:</FormLabel>
                        <NumberInput isDisabled={isLoading} min={0} size="sm" value={maxPrice} onChange={(val) => setMaxPrice(Number(val))}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    <Flex alignItems="end">
                        <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={() => handleSearch({ maxPrice, minPrice })}
                            isDisabled={Boolean(search.length <= 3 || isLoading || (!minPrice && !maxPrice) || (maxPrice && minPrice && maxPrice < minPrice))}
                        >
                            APPLY PRICE
                        </Button>
                    </Flex>
                </SimpleGrid>
            </Container>
            <Container maxW="container.lg" p="0" my=".5rem">
                <Flex gap="5px" alignItems="center" flexWrap="wrap">
                    <Text fontSize=".7rem">Recent Searches: </Text>
                    {recentSearches ? (
                        <>
                            {recentSearches.map((e: string, i: number) => (
                                <Badge fontSize=".7rem" borderRadius="rounded" key={i}>
                                    {e}
                                </Badge>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </Flex>
            </Container>
            <Results />
        </Box>
    )
}

export default Home
