import { Divider, List, Spinner, Text, TopNavigation } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { createCoffee, deleteCoffee, loadCoffees, updateCoffee } from '../services/coffeeService';
import CoffeeItem from './CoffeeItem';
import { StyleSheet } from 'react-native';
import CoffeeForm from './CoffeeForm';

const CoffeeList = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [coffees, setCoffees] = React.useState([]);

    const handleFormSubmit = (coffee) => {
        console.log('coffee to create', coffee);
        createCoffee(coffee).then((coffee) => onRefresh())
    };

    const handleRemoveCoffee = (coffee) => {
        console.log('Coffee to remove', coffee);
        deleteCoffee(coffee.id).then((coffee) => onRefresh());
    };

    const handleToggleCoffeeStatus = (coffee) => {
        console.log('Coffee to toggle', coffee);
        coffee.selected = !coffee.selected;
        updateCoffee(coffee).then((coffee) => onRefresh())
    };

    const refresh = async () => {
        await loadCoffees().then((coffees) => {
            setCoffees(coffees);
            console.log('Coffees', coffees);
        });
    };

    const onRefresh = React.useCallback( () => {
        setRefreshing(true);
        refresh().then(() => setRefreshing(false));
        console.log('Refreshing state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh]);

    return (
        <>
            <TopNavigation title='List of availible coffee choices:'/>
            <Divider />
            <CoffeeForm onFormSubmit={handleFormSubmit}/>
            <Divider />
            {refreshing ? (
                <Spinner />
            ): (
                <>
                {coffees.length > 0 ? (
                    <List 
                        data={coffees}
                        ItemSeparatorComponent={Divider}
                        renderItem={(item) => CoffeeItem(item, handleRemoveCoffee, handleToggleCoffeeStatus)}
                    />
                ) : (
                    <Text> No coffees found </Text>
                )}
                </>
            )}
        </>
    )
}

export default CoffeeList;