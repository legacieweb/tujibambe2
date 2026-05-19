const prisma = require('./lib/prisma');
const dotenv = require('dotenv');

dotenv.config();

const vehicles = [
    {
        name: "Toyota Voxy",
        type: "7-Seater MPV",
        capacity: 7,
        image: "https://topcar.co.ke/wp-content/uploads/2017/07/2010-Toyota-Voxy.jpg",
        pricePerDay: 80,
        features: ["Spacious interior", "Air conditioning", "Fuel efficient", "Comfortable seats", "Music system"],
        gallery: [
            "https://topcar.co.ke/wp-content/uploads/2017/07/2010-Toyota-Voxy-Rear.jpg",
            "https://topcar.co.ke/wp-content/uploads/2017/07/11-2.jpg",
            "https://topcar.co.ke/wp-content/uploads/2017/07/18-2.jpg"
        ]
    },
    {
        name: "Toyota Hiace Tour Van",
        type: "Van",
        capacity: 14,
        image: "https://i.imgur.com/CtFXxLl.jpeg",
        pricePerDay: 100,
        features: ["Pop-up roof", "Air conditioning", "Charging ports", "music system"],
        gallery: [
            "https://i.imgur.com/CtFXxLl.jpeg",
            "https://i.imgur.com/B5EUnkf.jpeg"
        ]
    },
    {
        name: "Luxury Overland Bus",
        type: "Bus",
        capacity: 40,
        image: "https://i.pinimg.com/1200x/41/7a/5f/417a5f0242d0170e6765173223005c2e.jpg",
        pricePerDay: 300,
        features: ["Reclining seats", "TV/Music system", "Luggage compartments"],
        gallery: [
            "https://i.pinimg.com/1200x/41/7a/5f/417a5f0242d0170e6765173223005c2e.jpg",
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ]
    }
];

const tours = [
    {
        title: "Mount Kenya Expedition",
        slug: "mount-kenya-expedition",
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
        slug: "maasai-mara-safari",
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
        slug: "diani-beach-relaxation",
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
        slug: "amboseli-national-park-safari",
        description: "Experience elephants against the backdrop of Mount Kilimanjaro in this iconic park.",
        location: "Amboseli",
        price: 450,
        image: "https://www.telegraph.co.uk/multimedia/archive/01816/kenya2_1816314b.jpg",
        duration: "2 Days",
        category: "Safari",
        maxGroupSize: 10,
        type: "group",
        gallery: [
            "https://www.telegraph.co.uk/multimedia/archive/01816/kenya2_1816314b.jpg",
            "https://res.cloudinary.com/tourhq/image/upload/fl_progressive,f_auto,h_507,w_900,g_auto,c_fill,q_auto/nomalk5mw2hcmmrhxuut",
            "https://summerbreaksafaris.com/wp-content/uploads/2024/06/Amboseli-Tsavo-SaltLick-Safari.jpg"
        ]
    },
    {
        title: "Lake Victoria Expedition",
        slug: "lake-victoria-expedition",
        description: "The ultimate lakeside adventure! Journey from Nairobi to Kisumu for a 3-day epic experience. Enjoy free chicken, fish, and goat meat with unlimited drinks. Experience the serene beauty of Lake Victoria and the vibrant culture of Kisumu. This all-inclusive package covers transport, meals, and entertainment.",
        location: "Kisumu, Lake Victoria",
        price: 35,
        image: "https://journeysbydesign.com/wp-content/uploads/2016/12/Lake-Victoria-Dhow.jpg",
        duration: "3 Days",
        category: "Expedition",
        maxGroupSize: 30,
        type: "timed",
        isAllInclusive: true,
        eventDate: new Date("2026-05-30"),
        bookingDeadline: new Date("2026-05-20"),
        gallery: [
            "https://journeysbydesign.com/wp-content/uploads/2016/12/Lake-Victoria-Dhow.jpg",
            "https://www.africanmeccasafaris.com/wp-content/uploads/pineapplebayresort5.jpg",
            "https://www.kampalacityandslumtours.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-26-at-4.12.10-AM-1024x768.jpeg"
        ]
    },
    {
        title: "TUJIBAMBE ROAD TRIP EXPERIENCE",
        slug: "tujibambe-road-trip-experience",
        description: "Nairobi → Naivasha. Escape the city. Chase the views. Live the moment. Featuring: Hell’s Gate Adventure, Lake Naivasha Boat Ride, Scenic Stops & Content Moments. Packages: STANDARD (KES 4,500), PREMIUM (KES 5,800), EARLY BIRD (KES 4,000).",
        location: "Naivasha",
        price: 21,
        image: "https://images.daytrip.com/nairobi3AS.jpeg?w=2048&q=30",
        duration: "1 Day",
        category: "Road Trip",
        maxGroupSize: 14,
        type: "timed",
        eventDate: new Date("2026-07-18"),
        bookingDeadline: new Date("2026-07-16"),
        video: "https://imgur.com/FmejG7B",
        gallery: [
            "https://safarikenyaexplorer.com/wp-content/uploads/2024/01/lakenaivashaimg1-1-1024x512.jpg",
            "https://cdn.standardmedia.co.ke/images/monday/xwdtanqdinuvu5b43121d1a244.jpg",
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/09/d6/80/5f.jpg"
        ]
    },
    {
        title: "TUJIBAMBE PARADISE ESCAPE",
        slug: "tujibambe-paradise-escape",
        description: "Escape the noise. Breathe nature. Reset your vibe. Join us for a refreshing getaway at Paradise Lost . Packages: BASIC (KES 1,800), STANDARD (KES 2,700), PREMIUM (KES 3,300), EARLY BIRD (KES 2,500).",
        location: "Paradise Lost, Kiambu",
        price: 21,
        image: "https://www.maasaimarakenyapark.com/wp-content/uploads/2022/06/Paradise-Lost-Nairobi-scaled-1-580x408-1.jpg",
        duration: "1 Day",
        category: "Nature Escape",
        maxGroupSize: 20,
        type: "timed",
        eventDate: new Date("2026-06-27"),
        bookingDeadline: new Date("2026-06-25"),
        gallery: [
            "https://www.maasaimarakenyapark.com/wp-content/uploads/2022/06/Paradise-Lost-Nairobi-scaled-1-580x408-1.jpg",
            "https://www.tranquilkilimanjaro.com/wp-content/uploads/paradiselost-scaled.jpeg",
            "https://africaadventurevacations.com/wp-content/uploads/2022/01/Paradise-Lost-in-Kiambu-Kenya.jpg",
            "https://africaadventurevacations.com/wp-content/uploads/2023/03/Filming-the-paradise-lost-Kiambu-Kenya.jpg",
            "https://paradisegardens.co.ke/wp-content/uploads/2022/01/Paradise-Gardens-view.jpeg",
            "https://www.paradiselostke.com/images/waterf%20(21).webp",
            "https://www.paradiselostke.com/images/camp%20(3).webp"
        ]
    }
];

async function main() {
    console.log('PostgreSQL Connected via Prisma for seeding');
    
    // Clear existing data
    await prisma.tour.deleteMany();
    await prisma.vehicle.deleteMany();
    
    // Seed Vehicles
    await prisma.vehicle.createMany({
        data: vehicles
    });
    
    // Seed Tours
    await prisma.tour.createMany({
        data: tours
    });
    
    console.log('Data Seeded Successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
