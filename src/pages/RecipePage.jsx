import { Box, Image, Text, Badge, SimpleGrid, Button, Center, UnorderedList, ListItem} from '@chakra-ui/react';


const RecipePage = ({ selectedRecipe, onBackClick, isInRecipePage }) => { 
    if (!selectedRecipe) {
        return <Text> Recipe not found. </Text>;
    }

    const {
        label,
        image,
        mealType,
        dishType,
        totalTime,
        dietLabels,
        healthLabels,
        cautions,
        ingredientLines,
        yield: servings,
        totalNutrients,
    } = selectedRecipe.recipe;

    return (
        <div>

        <Box pl={10} pr={10} bg="blue.500">

        <Center><Box w={{base:"80vw", md:"60vw", xl:"50vw"}} pb={6} bg="white">
                 <Image src={image} alt={label} w="100%" maxH={{base:"50vh", lg:"60vh"}}/> 
                 <Box pl={6} pr={6}> <SimpleGrid columns={{base:1, lg:2}} spacing={4}> 
                 <Box> <Text  color="grey" p={1} mt={4}> {mealType.join('/').toUpperCase()}</Text>
                    <Text p={1} fontSize="xl" fontWeight="bold">{label}</Text>
                    <Text p={1}> Total Cooking Time: {totalTime} minutes</Text>
                    <Text p={1}> Servings: {servings}</Text>
                    <Text p={1} fontWeight="semibold">Ingredients:</Text> 
                    <UnorderedList styleType="none">
                        {ingredientLines.map((ingredient, index) => (
                            <ListItem key={index}>{ingredient}</ListItem>
                        ))}
                    </UnorderedList>
                     </Box>
                     <Box fontWeight="semibold"> <Text p={1} pt={{base:1, lg:4}}>Dish Type: </Text>
                     <Box> <Badge colorScheme="blue">{dishType}</Badge> </Box>
                    <Text p={2} fontWeight="semibold"> Health labels: </Text>
                    <Box> {healthLabels.map((label, index) => (<Badge key={index} colorScheme="purple" m={1}> {label} </Badge> ))} </Box> 
                    {dietLabels && dietLabels.length > 0 && (<Text p={2} fontWeight="semibold"> Diet: </Text>)}
                <Box> {dietLabels && (dietLabels.map((label, index) => (<Badge key={index} colorScheme="green" m={1}> {label} </Badge>)))}</Box>
                {cautions && cautions.length > 0 && (<Text p={2}>Cautions: </Text>)}
                    <Box> {cautions.map((label, index) => (<Badge key={index} colorScheme="red" m={1}> {label} </Badge> ))} </Box>
                    <Text p={2} fontWeight="semibold" >Total Nutrients:</Text>
                    <SimpleGrid columns={2} spacing={2}>
                        {Object.entries(totalNutrients).map(([key, value]) => (
                            <Box key={key}>
                                <Text fontWeight="Normal" color="blue.500">{value.label}:</Text>
                                <Text fontWeight="Normal">{value.quantity.toFixed(2)} {value.unit}</Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                    </Box>
                    </SimpleGrid>
                    </Box> 
                    {isInRecipePage &&
            (<Button onClick={onBackClick} ml={6} mt={{base:2, lg:4}} bg="white" color="blue.500" variant="link">
                BACK TO RECIPES
            </Button>)}
                </Box>
                </Center>
                </Box>
    </div>
        );
    };

    export default RecipePage;
