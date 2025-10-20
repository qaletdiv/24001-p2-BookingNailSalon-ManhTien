const express = require("express");
const app = express();
const PORT = 3000;
const services = [
  {
    id: 1,
    name: "Classic Manicure",
    description:
      "Includes nail shaping, cuticle care, hand massage, and polish.",
    category: "Manicure",
    duration: 30,
    price: 25,
  },
  {
    id: 2,
    name: "Gel Manicure",
    description: "Long-lasting gel polish with UV curing for a glossy finish.",
    category: "Manicure",
    duration: 45,
    price: 40,
  },
  {
    id: 3,
    name: "Acrylic Full Set",
    description:
      "Full set of acrylic nails with your choice of shape and length.",
    category: "Enhancement",
    duration: 75,
    price: 60,
  },
  {
    id: 4,
    name: "Acrylic Fill-In",
    description:
      "Maintenance service for your acrylic nails to keep them fresh.",
    category: "Enhancement",
    duration: 60,
    price: 35,
  },
  {
    id: 5,
    name: "Spa Pedicure",
    description: "Relaxing foot soak, exfoliation, massage, and polish.",
    category: "Pedicure",
    duration: 45,
    price: 45,
  },
  {
    id: 6,
    name: "Deluxe Pedicure",
    description: "Spa pedicure plus mask treatment and hot towel wrap.",
    category: "Pedicure",
    duration: 60,
    price: 55,
  },
  {
    id: 7,
    name: "Nail Art",
    description: "Custom hand-painted or embellished designs per nail.",
    category: "Add-On",
    duration: 15,
    price: 10,
  },
  {
    id: 8,
    name: "Polish Change",
    description: "Quick color refresh for hands or feet.",
    category: "Add-On",
    duration: 20,
    price: 15,
  },
];
app.get("/api/services", (req, res, next) => {
  res.send(services);
});
app.listen(PORT, () => {
  console.log(`Listen to ${PORT}`);
});
