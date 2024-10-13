import { Box, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'

const SkeletonCards = () => {
    return (
        <>
            <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                <Box>
                    <Skeleton height="150px" />
                    <Stack spacing={2} mt="6">
                        <Skeleton height="15px" />
                        <Skeleton height="30px" />
                        <Skeleton height="20px" />
                    </Stack>
                </Box>
                <Box>
                    <Skeleton height="150px" />
                    <Stack spacing={2} mt="6">
                        <Skeleton height="15px" />
                        <Skeleton height="30px" />
                        <Skeleton height="20px" />
                    </Stack>
                </Box>
                <Box>
                    <Skeleton height="150px" />
                    <Stack spacing={2} mt="6">
                        <Skeleton height="15px" />
                        <Skeleton height="30px" />
                        <Skeleton height="20px" />
                    </Stack>
                </Box>
            </SimpleGrid>
        </>
    )
}

export default SkeletonCards
