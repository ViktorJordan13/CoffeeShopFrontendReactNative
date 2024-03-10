import { Button, CheckBox, Icon, Layout, ListItem } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet } from "react-native";

const CoffeeItem = ({item}, handleRemoveCoffee, handleToggleCoffeeStatus) => {
    console.log('Remove', handleRemoveCoffee);
    console.log('Toggle', handleToggleCoffeeStatus);
    return (
        <ListItem
            title={`${item.name}`}
            description={`${item.name}`}
            accessoryRight={
                <RenderAccesory
                    coffee={item}
                    onToggle={handleToggleCoffeeStatus}
                    onDelete={handleRemoveCoffee}
                />
            }
        />
    )
}

const RenderAccesory = ({ coffee, onToggle, onDelete}) => {
    const [checked, setChecked] = useState(coffee.selected);

    const DeleteIcon = (props) => (
        <Icon {...props} name='trash-2-outline' />
    );

    return (
        <Layout style={styles.container}>
            <Layout style={styles.layout} level="1">
                <CheckBox
                    checked={checked}
                    onChange={nextChecked => {
                        setChecked(nextChecked);
                        onToggle(coffee);
                    }}
                />
            </Layout>
            <Layout style={styles.layout} level="1">
            <Button
                size='tiny'
                accessoryLeft={DeleteIcon}
                onPress={() => onDelete(coffee)}
            />
            </Layout>
        </Layout>
    );
}

export default CoffeeItem;

const styles = StyleSheet.create({
    input: {
        flex: 1,
        margin: 2,

    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controlContainer: {
        borderRadius: 4,
        margin: 2,
        padding: 6,
        backgroundColor: '#3366FF'
    },
    button: {

    },
    container: {
        flex: .5,
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})