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
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
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
      }
    },
    pois: {
      _model : "Poi",
      poi_1 : {
        name: "Cork",
        description: "The best city",
        latitude: "51.8985",
        longitude:"8.4756",
        categoryid:"->category.city"
      },
    }
  };
  