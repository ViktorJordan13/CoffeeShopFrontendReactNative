import { loadCoffees, getCoffee, createCoffee, updateCoffee, deleteCoffee } from '../../src/services/coffeeService'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
    text: () => Promise.resolve('Deleted'),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('Coffee API', () => {
  it('loads coffees', async () => {
    await loadCoffees();
    expect(fetch).toHaveBeenCalledWith(`http://10.0.2.2:8080/coffees`);
  });

  it('gets a single coffee', async () => {
    const id = 1;
    await getCoffee(id);
    expect(fetch).toHaveBeenCalledWith(`http://10.0.2.2:8080/coffees/${id}`);
  });

  it('creates a new coffee', async () => {
    const newCoffee = {
      name: 'Latte',
      coffeeDoses: 1,
      milkDoses: 2,
      sugarPacks: 1,
      cream: true,
      selected: false,
    };
    await createCoffee(newCoffee);
    expect(fetch).toHaveBeenCalledWith(`http://10.0.2.2:8080/coffees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCoffee),
    });
  });

  it('updates a coffee', async () => {
    const coffeeToUpdate = {
      id: 1,
      name: 'Espresso',
      coffeeDoses: 2,
      milkDoses: 0,
      sugarPacks: 0,
      cream: false,
      selected: true,
    };
    await updateCoffee(coffeeToUpdate);
    expect(fetch).toHaveBeenCalledWith(`http://10.0.2.2:8080/coffees/${coffeeToUpdate.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeToUpdate),
    });
  });

  it('deletes a coffee', async () => {
    const idToDelete = 1;

    console.log = jest.fn();

    await deleteCoffee(idToDelete);

    expect(fetch).toHaveBeenCalledWith(`http://10.0.2.2:8080/coffees/${idToDelete}`, {
      method: "DELETE",
    });

    expect(console.log).toHaveBeenCalledWith('Deleted');

    console.log = jest.spyOn(console, 'log').mockImplementation();
  });
});
