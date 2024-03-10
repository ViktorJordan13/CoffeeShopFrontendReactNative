const baseUrl = `http://10.0.2.2:8080/coffees`;

export const loadCoffees = () => {
    return fetch(baseUrl).then((response) => response.json());
}

export const getCoffee = (id: any) => {
    return fetch(`${baseUrl}/${id}`).then((response) => response.json());
}

export const createCoffee = (coffee: any) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: coffee.name,
            coffeeDoses: coffee.coffeeDoses,
            milkDoses: coffee.milkDoses,
            sugarPacks: coffee.sugarPacks,
            cream: coffee.cream,
            selected: coffee.selected,
        }),
    }).then((response) => response.json());
}

export const updateCoffee = (coffee: any) => {
    return fetch(`${baseUrl}/${coffee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: coffee.id,
            name: coffee.name,
            coffeeDoses: coffee.coffeeDoses,
            milkDoses: coffee.milkDoses,
            sugarPacks: coffee.sugarPacks,
            cream: coffee.cream,
            selected: coffee.selected,
        }),
    }).then((response) => response.json());
}

export const deleteCoffee = (id: any) => {
    return fetch (`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then((response) => {
        response.text().then(text => console.log(text));
    })
}