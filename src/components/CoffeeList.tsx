import React, { useState, useEffect } from 'react';
import { Modal, Button, Divider, List, Spinner, Text, TopNavigation } from '@ui-kitten/components';
import { View } from 'react-native';
import CoffeeItem from './CoffeeItem';
import CoffeeForm from './CoffeeForm';
import { createCoffee, deleteCoffee, loadCoffees, updateCoffee } from '../services/coffeeService';

const CoffeeList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [coffees, setCoffees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState(null);

  const handleFormSubmit = (coffee) => {
    if (editingCoffee) {
      updateCoffee({ ...editingCoffee, ...coffee }).then(() => {
        setEditingCoffee(null);
        closeModalAndRefresh();
      });
    } else {
      createCoffee({ ...coffee, selected: false }).then(() => {
        closeModalAndRefresh();
      });
    }
  };

  const handleRemoveCoffee = (id) => {
    deleteCoffee(id).then(() => onRefresh());
  };

  const handleToggleCoffeeStatus = (coffee) => {
    updateCoffee({...coffee, selected: !coffee.selected}).then(() => onRefresh());
};


  const handleEditCoffee = (coffee) => {
    setEditingCoffee(coffee);
    setModalVisible(true);
  };

  const closeModalAndRefresh = () => {
    setModalVisible(false);
    onRefresh();
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCoffees().then((loadedCoffees) => {
      setCoffees(loadedCoffees);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <TopNavigation title="List of available coffee choices:" />
      <Divider />
      <View style={{ margin: 10 }}>
        <Button onPress={() => {
          setEditingCoffee(null);
          setModalVisible(true);
        }}>Make your own coffee from scratch!</Button>
      </View>
      <Modal
        visible={modalVisible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => {
          setModalVisible(false);
          setEditingCoffee(null);
        }}>
        <CoffeeForm onFormSubmit={handleFormSubmit} editingCoffee={editingCoffee} />
      </Modal>
      <Divider />
      {refreshing ? (
        <Spinner />
      ) : (
        coffees.length > 0 ? (
          <List
            data={coffees}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <CoffeeItem
                item={item}
                onRemove={handleRemoveCoffee}
                onToggleStatus={handleToggleCoffeeStatus}
                onEdit={handleEditCoffee}
              />
            )}
          />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 10 }}>No coffees found</Text>
        )
      )}
    </>
  );
};

export default CoffeeList;
