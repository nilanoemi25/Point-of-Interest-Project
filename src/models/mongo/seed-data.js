export const seedData = {
    users: {
      _model: "User",
      admin: {
        firstName: "Admin",
        lastName: " ",
        email: "admin@admin.com",
        password: "admin"
      },
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "123456"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    category: {
      _model: "Category",
      city: {
        name: "Cities",
        userid: "->users.homer"
      },
      castle: {
        name: "Castle",
        userid: "->users.homer"
      }
    },
    pois: {
      _model : "Poi",
      poi_1 : {
        name: "Cork",
        description: "The best city",
        latitude: "51.8985",
        longitude:"-8.4756",
        categoryid:"->category.city"
      },
      poi_2 : {
        name: "Waterford",
        description: "Great Museums",
        latitude: "52.2573",
        longitude:"-7.1115",
        categoryid:"->category.city"
      },   
        poi_3 : {
        name: "Mallow castle",
        description: "Pretty big castle",
        latitude: "52.1341",
        longitude:"-8.6392",
        categoryid:"->category.castle"
      },
      poi_4 : {
        name: "Blackrock Castle",
        description: "Overlooking the sea",
        latitude: "51.8999",
        longitude:"-8.4027",
        categoryid:"->category.castle"
      },
    poi_5 : {
      name: "Dublin",
      description: "Capital City",
      latitude: "53.3498",
      longitude:"-6.2603",
      categoryid:"->category.city"
    }, 
  }
  };
  