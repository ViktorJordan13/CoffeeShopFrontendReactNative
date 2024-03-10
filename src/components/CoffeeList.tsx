import React, { useState, useEffect } from 'react';
import { Modal, Button, Divider, List, Spinner, Text, TopNavigation, Layout, Card } from '@ui-kitten/components';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CoffeeItem from './CoffeeItem';
import CoffeeForm from './CoffeeForm';
import { createCoffee, deleteCoffee, loadCoffees, updateCoffee } from '../services/coffeeService';

const CoffeeList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [coffees, setCoffees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState(null);
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [selectedCoffees, setSelectedCoffees] = useState([]);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    loadCoffees().then((loadedCoffees) => {
      setCoffees(loadedCoffees);
      setRefreshing(false);
    });
  };

  useEffect(onRefresh, []);

  const handleFormSubmit = (coffee) => {
    const method = editingCoffee ? updateCoffee : createCoffee;
    method(editingCoffee ? { ...editingCoffee, ...coffee } : { ...coffee, selected: false }).then(closeModalAndRefresh);
  };

  const handleRemoveCoffee = (id) => deleteCoffee(id).then(onRefresh);

  const handleToggleCoffeeStatus = (coffee) => updateCoffee({ ...coffee, selected: !coffee.selected }).then(onRefresh);

  const handleEditCoffee = (coffee) => {
    setEditingCoffee(coffee);
    setModalVisible(true);
  };

  const closeModalAndRefresh = () => {
    setModalVisible(false);
    setEditingCoffee(null);
    onRefresh();
  };

  const handleOrder = () => {
    setOrderModalVisible(false);
    setThankYouVisible(true);
    setTimeout(() => setThankYouVisible(false), 3000); // Automatically close the thank you message after 3 seconds
  };

  const openOrderModal = () => {
    const selected = coffees.filter(coffee => coffee.selected).map(coffee => ({ ...coffee, quantity: 1 })); // Initialize quantities
    setSelectedCoffees(selected);
    setOrderModalVisible(true);
  };

  const incrementQuantity = (id) => {
    setSelectedCoffees(selectedCoffees.map(coffee => coffee.id === id ? { ...coffee, quantity: coffee.quantity + 1 } : coffee));
  };

  const decrementQuantity = (id) => {
    setSelectedCoffees(selectedCoffees.map(coffee => coffee.id === id ? { ...coffee, quantity: Math.max(1, coffee.quantity - 1) } : coffee));
  };

  return (
    <>
      <Layout style={styles.container}>
        <TopNavigation title={() => <Text style={styles.titleText}>List of available coffee choices:</Text>} alignment="center" />
      </Layout>
      <Divider />
      <View style={{ margin: 10 }}>
        <Button onPress={() => setModalVisible(true)}>Make your own coffee from scratch!</Button>
      </View>
      <Modal
        visible={modalVisible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        onBackdropPress={closeModalAndRefresh}>
        <CoffeeForm onFormSubmit={handleFormSubmit} editingCoffee={editingCoffee} />
      </Modal>
      <Modal
        visible={orderModalVisible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => setOrderModalVisible(false)}>
        <ScrollView style={{ padding: 20 }}>
          {selectedCoffees.map((coffee) => (
            <View key={coffee.id} style={styles.orderItem}>
              <Text style={styles.orderText}>{`${coffee.name} x${coffee.quantity}`}</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(coffee.id)} style={styles.counterButton}>
                  <Text>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => incrementQuantity(coffee.id)} style={styles.counterButton}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Button onPress={handleOrder} style={{ marginTop: 10 }}>Submit</Button>
        </ScrollView>
      </Modal>
      <Modal
        visible={thankYouVisible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        onBackdropPress={() => setThankYouVisible(false)}>
        <Card disabled={true}>
          <Text>Thank you for placing your order!</Text>
        </Card>
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
      <View style={{ margin: 10 }}>
        <Button onPress={openOrderModal} style={{ marginTop: 10 }}>Submit your order</Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  orderText: {
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
  },
});

export default CoffeeList;
