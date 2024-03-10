import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, CheckBox } from '@ui-kitten/components';
import { StyleSheet, ScrollView } from 'react-native';

const CoffeeForm = ({ onFormSubmit, editingCoffee }) => {
  const [form, setForm] = useState({
    name: '',
    coffeeDoses: '1',
    milkDoses: '0',
    sugarPacks: '0',
    cream: false,
  });

  useEffect(() => {
    if (editingCoffee) {
      setForm({
        name: editingCoffee.name,
        coffeeDoses: String(editingCoffee.coffeeDoses),
        milkDoses: String(editingCoffee.milkDoses),
        sugarPacks: String(editingCoffee.sugarPacks),
        cream: editingCoffee.cream,
      });
    }
  }, [editingCoffee]);

  const handleSubmit = () => {
    onFormSubmit({
      ...form,
      coffeeDoses: parseInt(form.coffeeDoses, 10),
      milkDoses: parseInt(form.milkDoses, 10),
      sugarPacks: parseInt(form.sugarPacks, 10),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        label='Name'
        value={form.name}
        onChangeText={(name) => setForm({ ...form, name })}
        style={styles.input}
      />
      <Input
        label='Coffee Doses'
        value={String(form.coffeeDoses)}
        onChangeText={(coffeeDoses) => setForm({ ...form, coffeeDoses })}
        keyboardType='numeric'
        style={styles.input}
      />
      <Input
        label='Milk Doses'
        value={String(form.milkDoses)}
        onChangeText={(milkDoses) => setForm({ ...form, milkDoses })}
        keyboardType='numeric'
        style={styles.input}
      />
      <Input
        label='Sugar Packs'
        value={String(form.sugarPacks)}
        onChangeText={(sugarPacks) => setForm({ ...form, sugarPacks })}
        keyboardType='numeric'
        style={styles.input}
      />
      <CheckBox
        checked={form.cream}
        onChange={(checked) => setForm({ ...form, cream: checked })}
      >
        {`Cream`}
      </CheckBox>
      <Button onPress={handleSubmit} style={styles.submitButton}>
        {editingCoffee ? 'Update Coffee' : 'Add Coffee'}
      </Button>
    </ScrollView>
  );
};

export default CoffeeForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
  },
});
