const mongoose = require('mongoose');
const Tour = require('./models/Tour');
const Vehicle = require('./models/Vehicle');
const dotenv = require('dotenv');

dotenv.config();

const vehicles = [
    {
        name: "Toyota Voxy",
        type: "7-Seater MPV",
        capacity: 7,
        image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        pricePerDay: 80,
        features: ["Spacious interior", "Air conditioning", "Fuel efficient", "Comfortable seats", "Music system"]
    },
    {
        name: "Toyota Hiace Tour Van",
        type: "Van",
        capacity: 14,
        image: "https://i.pinimg.com/1200x/1a/18/75/1a18759e74bc22fedbdb6632034ddce1.jpg",
        pricePerDay: 100,
        features: ["Pop-up roof", "Air conditioning", "Charging ports", "music system"]
    },
    {
        name: "Luxury Overland Bus",
        type: "Bus",
        capacity: 40,
        image: "https://i.pinimg.com/1200x/41/7a/5f/417a5f0242d0170e6765173223005c2e.jpg",
        pricePerDay: 300,
        features: ["Reclining seats", "TV/Music system", "Luggage compartments"]
    }
];

const tours = [
    {
        title: "Mount Kenya Expedition",
        description: "A thrilling climb to the second highest peak in Africa. Experience breathtaking views and unique alpine flora.",
        location: "Central Kenya",
        price: 350,
        image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "5 Days",
        category: "Hiking",
        maxGroupSize: 12,
        type: "timed",
        eventDate: new Date("2024-06-15"),
        bookingDeadline: new Date("2024-06-01"),
        gallery: [
            "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        title: "Maasai Mara Safari",
        description: "Witness the Great Migration and the Big Five in the world's most famous wildlife reserve.",
        location: "Maasai Mara",
        price: 500,
        image: "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg",
        duration: "3 Days",
        category: "Safari",
        maxGroupSize: 8,
        type: "group",
        gallery: [
            "https://www.trafordsafaris.com/wp-content/uploads/2025/04/masai-mara-safari.jpeg",
            "https://images.unsplash.com/photo-1534177714502-0ee436d3d179?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        title: "Diani Beach Relaxation",
        description: "Unwind on the white sands of Diani Beach. Enjoy water sports, seafood, and tropical vibes.",
        location: "Diani, Coast",
        price: 200,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "4 Days",
        category: "Beach",
        maxGroupSize: 25,
        type: "timed",
        eventDate: new Date("2024-07-10"),
        bookingDeadline: new Date("2024-07-01"),
        gallery: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1538964173425-93884d739596?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1520483601560-389dff434f1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        title: "Amboseli National Park Safari",
        description: "Experience elephants against the backdrop of Mount Kilimanjaro in this iconic park.",
        location: "Amboseli",
        price: 450,
        image: "https://www.amboselikenyasafaris.com/wp-content/uploads/2024/02/GIRAFFES-IN-AMBOSELI-750x450.jpg",
        duration: "2 Days",
        category: "Safari",
        maxGroupSize: 10,
        type: "group",
        gallery: [
            "https://www.amboselikenyasafaris.com/wp-content/uploads/2024/02/GIRAFFES-IN-AMBOSELI-750x450.jpg",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518115684291-7f9999086050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        title: "Safari Rally Kenya 2026",
        description: "Experience the thrill of the World Rally Championship in Kenya! This is an all-inclusive tour where your payment only covers the transport to the heart of the action in Naivasha. Witness high-speed action, stunning African landscapes, and the spirit of rally racing at its finest. Auto-Shift Policy: Single-person vehicle bookings may be consolidated for efficiency on the final day.",
        location: "Naivasha, Nakuru County, within the Great Rift Valley",
        price: 20,
        image: "https://image.api.sportal365.com/process/smp-images-production/pulselive.co.ke/22082024/e9bbcf6d-d167-4b86-b649-1743f9967943",
        duration: "1 Day",
        category: "Rally",
        maxGroupSize: 50,
        type: "timed",
        isAllInclusive: true,
        eventDate: new Date("2026-03-12"),
        bookingDeadline: new Date("2026-03-05"),
        gallery: [
            "https://image.api.sportal365.com/process/smp-images-production/pulselive.co.ke/22082024/e9bbcf6d-d167-4b86-b649-1743f9967943",
            "https://sportal365images.com/process/smp-images-production/ringier.africa/06032024/e5772b01-22de-41a1-847c-b251614cc817.jpg",
            "https://www.capitalfm.co.ke/sports/files/2025/07/safari-rally-kenya-1024x576.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kenya_KCB_Rally_Naivasha_3.jpg/1200px-Kenya_KCB_Rally_Naivasha_3.jpg",
            "https://www.capitalfm.co.ke/sports/files/2025/08/Aakif-Virani-raises-the-dust-during-this-years-Safari-rally.-He-is-set-to-return-for-his-thid-career-WRC-Safari-next-year-1-scaled.jpg"
        ]
    }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tujibambe')
    .then(async () => {
        console.log('MongoDB Connected for seeding');
        await Tour.deleteMany();
        await Vehicle.deleteMany();
        await Tour.insertMany(tours);
        await Vehicle.insertMany(vehicles);
        console.log('Data Seeded Successfully');
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
