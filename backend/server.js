const express = require("express");
const app = express();
const PORT = 4000;
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

const staff = [
  {
    id: 1,
    name: "Lina Nguyen",
    role: "Nail Technician",
    specialty: ["Acrylic Nails", "Gel Manicure", "Nail Art"],
    experience: 5,
    rating: 4.8,
    available: true,
    schedule: {
      monday: ["10:00", "18:00"],
      tuesday: ["10:00", "18:00"],
      wednesday: ["Off"],
      thursday: ["10:00", "18:00"],
      friday: ["10:00", "18:00"],
      saturday: ["09:00", "17:00"],
      sunday: ["Off"]
    },
    image: "/images/staff/lina.jpg"
  },
  {
    id: 2,
    name: "Mia Tran",
    role: "Senior Nail Artist",
    specialty: ["3D Design", "Luxury Pedicure", "Custom Nail Sets"],
    experience: 7,
    rating: 4.9,
    available: true,
    schedule: {
      monday: ["Off"],
      tuesday: ["11:00", "19:00"],
      wednesday: ["11:00", "19:00"],
      thursday: ["11:00", "19:00"],
      friday: ["11:00", "19:00"],
      saturday: ["09:00", "17:00"],
      sunday: ["09:00", "15:00"]
    },
    image: "/images/staff/mia.jpg"
  },
  {
    id: 3,
    name: "Emma Le",
    role: "Junior Nail Technician",
    specialty: ["Classic Manicure", "Pedicure"],
    experience: 2,
    rating: 4.5,
    available: false,
    schedule: {
      monday: ["10:00", "18:00"],
      tuesday: ["10:00", "18:00"],
      wednesday: ["10:00", "18:00"],
      thursday: ["Off"],
      friday: ["10:00", "18:00"],
      saturday: ["Off"],
      sunday: ["Off"]
    },
    image: "/images/staff/emma.jpg"
  }
];

app.get('/api/staff',(req,res,next)=>{
  res.send(staff)
})
app.get("/api/services", (req, res, next) => {
  res.send(services);
});
app.listen(PORT, () => {
  console.log(`Listen to ${PORT}`);
});
