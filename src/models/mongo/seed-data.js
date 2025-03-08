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
        password: "secret"
      },
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
        location: "51.8985",
        image: " ",
        categoryid:"->category.city"
      },
    }
  };
  