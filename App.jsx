import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Button} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import CoffeeList from './src/components/CoffeeList';

const HomeScreen = () => (
  <Layout style={{ flex: 1 }}>
    <SafeAreaView>
      <Button>press me</Button>
     <CoffeeList></CoffeeList>
    </SafeAreaView>
  </Layout>
);

export default () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </>
  );
}
