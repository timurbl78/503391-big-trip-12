export const OFFERS_TYPE = new Map([
  [
    `taxi`,
    [
      {name: `Order Uber`, cost: 30, label: `uber`},
      {name: `Order Yandex`, cost: 25, label: `yandex`},
    ]
  ],
  [
    `bus`, []
  ],
  [
    `train`,
    [
      {name: `Stateroom`, cost: 80, label: `stateroom`},
      {name: `SV`, cost: 130, label: `sv`},
    ]
  ],
  [
    `ship`,
    [
      {name: `Wi-Fi`, cost: 40, label: `wifi`},
      {name: `Alcohol`, cost: 80, label: `alcohol`},
    ]
  ],
  [
    `transport`, []
  ],
  [
    `drive`,
    [
      {name: `Navigation`, cost: 5, label: `navigation`},
      {name: `Video recorder`, cost: 8, label: `recorder`},
    ]
  ],
  [
    `flight`,
    [
      {name: `Add luggage`, cost: 30, label: `luggage`},
      {name: `Switch to comfort class`, cost: 100, label: `comfort`},
      {name: `Add meal`, cost: 15, label: `meal`},
      {name: `Choose seats`, cost: 5, label: `seats`},
      {name: `Travel by train`, cost: 40, label: `train`},
    ]
  ],
  [
    `check-in`,
    [
      {name: `Sea view`, cost: 100, label: `sea`},
      {name: `All inclusive`, cost: 100, label: `all`},
      {name: `Meeting in arrival zone`, cost: 15, label: `meeting`},
      {name: `Lux`, cost: 50, label: `lux`},
      {name: `Mini bar`, cost: 20, label: `bar`},
    ]
  ],
  [
    `sightseeing`,
    [
      {name: `Book tickets`, cost: 40, label: `tickets`},
      {name: `Lunch in city`, cost: 30, label: `lunch`},
      {name: `Souvenirs`, cost: 25, label: `souvenirs`},
    ]
  ],
  [
    `restaurant`,
    [
      {name: `Desert`, cost: 3, label: `desert`},
      {name: `Beverage`, cost: 2, label: `beverage`},
      {name: `Snack`, cost: 1, label: `snack`},
    ]
  ]
]);

export const OFFERS = [
  {
    type: `taxi`,
    offers: [
      {name: `Order Uber`, cost: 30, label: `uber`, isChecked: false},
      {name: `Order Yandex`, cost: 25, label: `yandex`, isChecked: false},
    ]
  },
  {
    type: `bus`,
    offers: []
  },
  {
    type: `train`,
    offers: [
      {name: `Stateroom`, cost: 80, label: `stateroom`, isChecked: false},
      {name: `SV`, cost: 130, label: `sv`, isChecked: false},
    ]
  },
  {
    type: `ship`,
    offers: [
      {name: `Wi-Fi`, cost: 40, label: `wifi`, isChecked: false},
      {name: `Alcohol`, cost: 80, label: `alcohol`, isChecked: false},
    ]
  },
  {
    type: `transport`,
    offers: []
  },
  {
    type: `drive`,
    offers: [
      {name: `Navigation`, cost: 5, label: `navigation`, isChecked: false},
      {name: `Video recorder`, cost: 8, label: `recorder`, isChecked: false},
    ]
  },
  {
    type: `flight`,
    offers: [
      {name: `Add luggage`, cost: 30, label: `luggage`, isChecked: false},
      {name: `Switch to comfort class`, cost: 100, label: `comfort`, isChecked: false},
      {name: `Add meal`, cost: 15, label: `meal`, isChecked: false},
      {name: `Choose seats`, cost: 5, label: `seats`, isChecked: false},
      {name: `Travel by train`, cost: 40, label: `train`, isChecked: false},
    ]
  },
  {
    type: `check-in`,
    offers: [
      {name: `Sea view`, cost: 100, label: `sea`, isChecked: false},
      {name: `All inclusive`, cost: 100, label: `all`, isChecked: false},
      {name: `Meeting in arrival zone`, cost: 15, label: `meeting`, isChecked: false},
      {name: `Lux`, cost: 50, label: `lux`, isChecked: false},
      {name: `Mini bar`, cost: 20, label: `bar`, isChecked: false},
    ]
  },
  {
    type: `sightseeing`,
    offers: [
      {name: `Book tickets`, cost: 40, label: `tickets`, isChecked: false},
      {name: `Lunch in city`, cost: 30, label: `lunch`, isChecked: false},
      {name: `Souvenirs`, cost: 25, label: `souvenirs`, isChecked: false},
    ]
  },
  {
    type: `restaurant`,
    offers: [
      {name: `Desert`, cost: 3, label: `desert`, isChecked: false},
      {name: `Beverage`, cost: 2, label: `beverage`, isChecked: false},
      {name: `Snack`, cost: 1, label: `snack`, isChecked: false},
    ]
  }
];
