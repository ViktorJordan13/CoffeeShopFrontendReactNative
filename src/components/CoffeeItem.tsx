import React, { useState } from "react";
import { Button, CheckBox, Icon, Layout, ListItem } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

// Adjust props to a single object and destructure it
const CoffeeItem = ({ item, onRemove, onToggleStatus }) => {
    return (
        <ListItem
            title={`${item.name}`}
            description={`Doses: Coffee ${item.coffeeDoses}, Milk ${item.milkDoses}, Sugar ${item.sugarPacks}${item.cream ? ', with Cream' : ''}`}
            accessoryRight={() => (
                <RenderAccessory
                    coffee={item}
                    onToggle={onToggleStatus}
                    onDelete={onRemove}
                />
            )}
        />
    );
};

const RenderAccessory = ({ coffee, onToggle, onDelete }) => {
    const [checked, setChecked] = useState(coffee.selected);

    const DeleteIcon = (props) => (
        <Icon {...props} name='trash-2-outline' />
    );

    return (
        <Layout style={styles.container}>
            <CheckBox
                checked={checked}
                onChange={(nextChecked) => {
                    setChecked(nextChecked);
                    onToggle(coffee);
                }}
            />
            <Button
                style={styles.button}
                appearance='ghost'
                status='danger'
                accessoryLeft={DeleteIcon}
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
