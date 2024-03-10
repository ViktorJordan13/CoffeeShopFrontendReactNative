import React from "react";
import { Button, CheckBox, Icon, Layout, ListItem } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const CoffeeItem = ({ item, onRemove, onToggleStatus, onEdit }) => {
  return (
    <ListItem
      title={`${item.name}`}
      description={`Doses: Coffee ${item.coffeeDoses}, Milk ${item.milkDoses}, Sugar ${item.sugarPacks}${item.cream ? ', with Cream' : ''}`}
      accessoryRight={() => (
        <RenderAccessory
          coffee={item}
          onToggle={onToggleStatus}
          onDelete={onRemove}
          onEdit={onEdit}
        />
      )}
    />
  );
};

const RenderAccessory = ({ coffee, onToggle, onDelete, onEdit }) => {
  return (
    <Layout style={styles.container}>
      <CheckBox
        checked={coffee.selected}
        onChange={() => onToggle(coffee)}
      />
      <Button
        style={styles.button}
        appearance='ghost'
        status='info'
        accessoryLeft={(props) => <Icon {...props} name='edit-outline' />}
        onPress={() => onEdit(coffee)}
      />
      <Button
        style={styles.button}
        appearance='ghost'
        status='danger'
        accessoryLeft={(props) => <Icon {...props} name='trash-2-outline' />}
        onPress={() => onDelete(coffee.id)}
      />
    </Layout>
  );
};

export default CoffeeItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginLeft: 8,
    },
});
