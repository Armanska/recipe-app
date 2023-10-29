import { useState } from 'react';
import { Heading, Center, Box, Image, Text, Input, Checkbox, VStack, Grid, GridItem, Badge } from '@chakra-ui/react';
import { data } from '../utils/data.js';
import RecipePage from './RecipePage.jsx';

const RecipeListPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPreferences, setFilterPreferences] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const filteredRecipes = data.hits.filter(recipe => {
        const recipeName = recipe.recipe.label.toLowerCase();
        const healthLabels = recipe.recipe.healthLabels.map(label => label.toLowerCase());
        return (
            (recipeName.includes(searchTerm.toLowerCase()) || healthLabels.includes(searchTerm.toLowerCase())) &&
            (filterPreferences.length === 0 || filterPreferences.every(pref => healthLabels.includes(pref.toLowerCase())))
        );
    });

    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFilterPreferences(prev => [...prev, value]);
        } else {
            setFilterPreferences(prev => prev.filter(pref => pref !== value));
        }
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
      };
    
    const handleBackClick = () => {
        setSelectedRecipe(null);
      };


      return (
        <div> 
            {selectedRecipe 
            ? (<RecipePage 
                selectedRecipe={selectedRecipe}
                onBackClick={handleBackClick}
                isInRecipePage={true}/>)
            : (

    
        <Box w="100vw" p={10} bg="blue.500">
            <Heading align="center" color="white" fontSize={{base:"2em", lg:"2.5em", xl:"3em"}} p={4} mb={2}> Winc Recipe Checker </Heading> 
            <Center> <Input mb={6} w={{base:"80vw", lg:"40vw"}} bg="white" 
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            /> </Center>
          
                <VStack align="start" color="white" fontSize={{base:"1em", md:"1.2em", xl:"1.6em"}} spacing={2} mb={6} >
                    <Text>Filter by dietary preference:</Text>
                    <Checkbox value="vegan" onChange={handleFilterChange}>
                        Vegan
                    </Checkbox>
                    <Checkbox value="vegetarian" onChange={handleFilterChange}>
                        Vegetarian
                    </Checkbox>
                    <Checkbox value="pescatarian" onChange={handleFilterChange}>
                        Pescatarian
                    </Checkbox>
                </VStack>
                
                 <Grid
                    templateColumns={{base:"1fr", md:"repeat(2, 1fr)", lg:"repeat(3, 1fr)", xl:"repeat(4, 1fr)"}}
                    gap={8} >
                            {filteredRecipes.map((recipe, index) => (
                                            <GridItem 
                                            key={index}
                                            onClick={() => handleRecipeClick(recipe)}>
                            <Box bg="white" borderRadius="10" h="35em">
                                <Image w="100vw" h="35vh" borderTopRadius="10" object-fit="cover"
                                        src={recipe.recipe.image} alt={recipe.recipe.label} />
                                <Text align="center" color="grey" mt={2}> {recipe.recipe.mealType.join(', ').toUpperCase()}</Text>
                                <Text fontSize="lg" fontWeight="bold" m={2} align="center">
                                    {recipe.recipe.label}
                                </Text>
                                {recipe.recipe.healthLabels.includes('Vegan') && (
                                   <Center> <Badge colorScheme="purple" m={1}>
                                        Vegan
                                    </Badge> </Center>
                                )}
                                {recipe.recipe.healthLabels.includes('Vegetarian') && (
                                  <Center> <Badge colorScheme="purple" m={1}>
                                        Vegetarian
                                    </Badge></Center>
                                )}
                                {recipe.recipe.healthLabels.includes('Pescatarian') && (
                                   <Center> <Badge colorScheme="purple" m={1}>
                                        Pescatarian
                                    </Badge></Center>
                                )}
                               <Center> {recipe.recipe.dietLabels.map((label, index) => (<Badge key={index} colorScheme="green" m={1}> {label} </Badge>))} </Center>
                                
                                    <Text align="center" m={2}> Dish: {recipe.recipe.dishType}</Text>

                                {recipe.recipe.cautions.length > 0 && (
                                    <>
                                  <Text align="center"> Cautions: </Text> 
                                  <Center> {recipe.recipe.cautions.map((label, index) => (<Badge key={index} colorScheme="red" m={1}>{label} </Badge>))} </Center>
                                  </>
                                )}
                               
                            </Box>
                            </GridItem>
                    ))}
                    </Grid>
                    </Box>
                    )}
                </div>
        
    );
};

export default RecipeListPage;
