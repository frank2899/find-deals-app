import { ProductResponse } from "@/lib/utils/types"
import { Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Link, Box, Image, Flex } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const ProductCard = ({ details }: { details: ProductResponse }) => {
    return (
        <Card cursor="pointer" onClick={() => window.open(details.href || '#', '_blank')}>
            <CardBody>
                <Stack mt="6" spacing="2">
                    <Flex alignItems="center" justifyContent="center" height="150px" p="5px">
                        <Image
                            src={details.image}
                            alt={details.product}
                            borderRadius='lg'
                            height="150px"
                            objectFit="cover"
                        />
                    </Flex>
                    <Text fontSize="lg" color="gray">{details.price}</Text>
                    <Heading size='sm' color="#122167">{details.product}</Heading>
                    <Box>
                        <Text fontSize="sm" color="dark" mb="5px">{details.otherDetails[0]}</Text>
                        { details.otherDetails.length > 1 ? <Text fontSize="xs" color="gray">
                            {details.otherDetails?.slice(1).join(' - ')}
                        </Text> : <></> }
                    </Box>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link color="#122167" fontSize=".8rem" as={NextLink} href='https://chakra-ui.com' isExternal>
                    {details.shopName} <ExternalLinkIcon mx="2"/>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ProductCard