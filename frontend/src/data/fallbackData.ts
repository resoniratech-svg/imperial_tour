import { Tour, TourCategory } from '../types';

export const FALLBACK_CATEGORIES: TourCategory[] = ([
  {
    "id": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
    "name": "Desert Safari",
    "slug": "desert-safari",
    "description": "Thrilling desert adventures across Qatar's golden dunes",
    "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
    "sortOrder": 1,
    "isActive": true,
    "createdAt": "2026-11-16T10:20:01.935Z",
    "updatedAt": "2026-11-16T11:56:36.636Z",
    "_count": {
      "tours": 6
    }
  },
  {
    "id": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
    "name": "Water Sports & Adventure",
    "slug": "water-sports-adventure",
    "description": "Exciting water activities and marine adventures",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    "sortOrder": 2,
    "isActive": true,
    "createdAt": "2026-11-16T10:20:01.947Z",
    "updatedAt": "2026-11-16T11:56:36.681Z",
    "_count": {
      "tours": 6
    }
  },
  {
    "id": "2f2efe6a-85df-44ab-9ada-427787376493",
    "name": "Cruise Tours",
    "slug": "cruise-tours",
    "description": "Luxurious dhow cruise experiences along Qatar's coastline",
    "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
    "sortOrder": 3,
    "isActive": true,
    "createdAt": "2026-11-16T10:20:01.960Z",
    "updatedAt": "2026-11-16T11:56:36.650Z",
    "_count": {
      "tours": 2
    }
  },
  {
    "id": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
    "name": "City Tours",
    "slug": "city-tours",
    "description": "Discover the modern marvels and heritage of Doha",
    "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
    "sortOrder": 4,
    "isActive": true,
    "createdAt": "2026-11-16T10:20:01.972Z",
    "updatedAt": "2026-11-16T11:56:36.661Z",
    "_count": {
      "tours": 6
    }
  },
  {
    "id": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
    "name": "Cultural & Historical Tours",
    "slug": "cultural-historical-tours",
    "description": "Immerse yourself in Qatar's rich culture and heritage",
    "image": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
    "sortOrder": 5,
    "isActive": true,
    "createdAt": "2026-11-16T10:20:01.984Z",
    "updatedAt": "2026-11-16T11:56:36.691Z",
    "_count": {
      "tours": 5
    }
  },
  {
    "id": "76c9876f-910d-4e9e-bec3-321a56ea14f5",
    "name": "Adventure Activities",
    "slug": "adventure-activities",
    "description": "Adrenaline-pumping adventure experiences",
    "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    "sortOrder": 6,
    "isActive": true,
    "createdAt": "2026-11-16T10:20:01.995Z",
    "updatedAt": "2026-11-16T11:56:36.671Z",
    "_count": {
      "tours": 0
    }
  }
] as any) as TourCategory[];

export const FALLBACK_TOURS: Tour[] = ([
  {
    "id": "117817eb-a4df-44fe-813c-081b14ffe408",
    "title": "Half Day Desert Safari",
    "slug": "half-day-desert-safari",
    "shortDesc": "Experience the thrill of Qatar's desert with dune bashing, camel riding, and sandboarding in a half-day adventure.",
    "description": "Embark on an unforgettable half-day desert safari adventure in Qatar. Your experienced driver will take you on an exhilarating ride through the golden sand dunes in a powerful 4x4 vehicle. Feel the rush of dune bashing before visiting a traditional desert camp where you can enjoy a camel ride, try sandboarding down towering dunes, and soak in the stunning desert landscape. This tour offers the perfect introduction to Qatar's magnificent desert terrain.",
    "duration": null,
    "availability": null,
    "categoryId": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
    "coverImage": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200",
    "isActive": true,
    "isFeatured": true,
    "sortOrder": 1,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 6,
    "createdAt": "2026-11-16T10:20:02.011Z",
    "updatedAt": "2026-11-16T11:56:36.701Z",
    "category": {
      "id": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
      "name": "Desert Safari",
      "slug": "desert-safari",
      "description": "Thrilling desert adventures across Qatar's golden dunes",
      "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.935Z",
      "updatedAt": "2026-11-16T11:56:36.636Z"
    },
    "pricingTiers": [
      {
        "id": "d26d6bf7-0844-42dc-b4cf-5f27a40fdf95",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 700,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.011Z",
        "updatedAt": "2026-11-16T10:20:02.011Z"
      },
      {
        "id": "43d6bf70-9811-4004-bae3-17a3b8cae09d",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.011Z",
        "updatedAt": "2026-11-16T10:20:02.011Z"
      },
      {
        "id": "3d701a20-e7f6-45d4-b67f-8a4ca6b7b5ac",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "minPersons": 3,
        "maxPersons": 4,
        "pricePerPerson": 275,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.011Z",
        "updatedAt": "2026-11-16T10:20:02.011Z"
      },
      {
        "id": "2617fb87-5b07-435e-ace1-d87eff7b7f86",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "minPersons": 5,
        "maxPersons": 6,
        "pricePerPerson": 200,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.011Z",
        "updatedAt": "2026-11-16T10:20:02.011Z"
      }
    ],
    "inclusions": [
      {
        "id": "0a26bcc2-1ccf-49c0-bc4f-7eca51fae2d6",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "4x4 vehicle with experienced driver",
        "sortOrder": 0
      },
      {
        "id": "9595dbcb-41c7-4539-b246-3793d78d63cb",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "50af3f2a-c475-457b-9fd1-39f61716ee3d",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Camel ride",
        "sortOrder": 2
      },
      {
        "id": "e5a52d5b-6074-4483-acc8-67021519f339",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Sandboarding",
        "sortOrder": 3
      },
      {
        "id": "d33825a9-190d-4b30-ab67-e27884734ab6",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Off-road insurance",
        "sortOrder": 4
      },
      {
        "id": "c70951c3-eeda-4580-b345-16c226cccc5e",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Desert camp visit",
        "sortOrder": 5
      }
    ],
    "exclusions": [
      {
        "id": "e7cb4640-99fe-4842-b657-78fc361a8adc",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Quad bike",
        "price": null,
        "sortOrder": 0
      },
      {
        "id": "f73a3ed5-2ff4-4351-b4d1-8635b419d4c8",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Buggy ride",
        "price": null,
        "sortOrder": 1
      },
      {
        "id": "791635e2-11c7-4de8-ae4f-3482a114c832",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Horse riding",
        "price": null,
        "sortOrder": 2
      },
      {
        "id": "7b93cd99-d8b4-4a88-a48c-010fee966a1b",
        "tourId": "117817eb-a4df-44fe-813c-081b14ffe408",
        "item": "Meals",
        "price": null,
        "sortOrder": 3
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "b6e01285-a23d-461a-85e8-f4440c1f061a",
    "title": "Full Day Desert Safari",
    "slug": "full-day-desert-safari",
    "shortDesc": "A complete desert experience with dune bashing, beach activities, buffet meals, and traditional Arabian hospitality.",
    "description": "Spend a full day exploring Qatar's breathtaking desert landscape. This comprehensive desert safari includes thrilling dune bashing in a 4x4 vehicle, swimming, beach volleyball, and sandboarding. Enjoy a delicious buffet lunch or dinner at a comfortable desert camp equipped with AC cabins, traditional Arabic seating, and modern amenities. A music system adds to the atmosphere as you relax under the desert sky.",
    "duration": null,
    "availability": null,
    "categoryId": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
    "coverImage": "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200",
    "isActive": true,
    "isFeatured": true,
    "sortOrder": 2,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.029Z",
    "updatedAt": "2026-11-16T11:56:36.711Z",
    "category": {
      "id": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
      "name": "Desert Safari",
      "slug": "desert-safari",
      "description": "Thrilling desert adventures across Qatar's golden dunes",
      "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.935Z",
      "updatedAt": "2026-11-16T11:56:36.636Z"
    },
    "pricingTiers": [
      {
        "id": "f1b931c3-7e0f-4039-95ee-e35eae3cfb02",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1000,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.029Z",
        "updatedAt": "2026-11-16T10:20:02.029Z"
      },
      {
        "id": "d2ba43f0-8e06-4da2-a83b-46aed52f5a4f",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 600,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.029Z",
        "updatedAt": "2026-11-16T10:20:02.029Z"
      },
      {
        "id": "f1706f3b-4b02-42f1-9aaa-757ef8642db3",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.029Z",
        "updatedAt": "2026-11-16T10:20:02.029Z"
      },
      {
        "id": "0250e9aa-466a-4f59-82ba-a248017e4f6b",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.029Z",
        "updatedAt": "2026-11-16T10:20:02.029Z"
      },
      {
        "id": "d900e7c2-121b-4a6e-8137-b8dbb6e77ce0",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 325,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.029Z",
        "updatedAt": "2026-11-16T10:20:02.029Z"
      }
    ],
    "inclusions": [
      {
        "id": "34f96218-1a85-4f23-adfe-042fea836dd8",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "4x4 vehicle with experienced driver",
        "sortOrder": 0
      },
      {
        "id": "db80b8c2-233a-4135-8e5d-174f92421a9b",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Buffet lunch/dinner",
        "sortOrder": 1
      },
      {
        "id": "a302853e-851f-431c-ac74-481d87366145",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Water",
        "sortOrder": 2
      },
      {
        "id": "cabd7336-20f4-4203-8b7d-2f2e185cef8c",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Bathroom facilities",
        "sortOrder": 3
      },
      {
        "id": "5816bd0c-3e47-4093-a554-031976d95338",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Beach volleyball",
        "sortOrder": 4
      },
      {
        "id": "a1020984-89cc-4ef5-8565-2d868973d1c3",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Swimming and sandboarding",
        "sortOrder": 5
      },
      {
        "id": "f025dd67-09f3-45ea-a642-1c658eab8ce1",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "AC cabin and towels",
        "sortOrder": 6
      },
      {
        "id": "a3583aa1-5e2e-4608-96b4-56189ec27c1b",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Tent with traditional Arabic seating",
        "sortOrder": 7
      },
      {
        "id": "cf23687b-0143-4f61-bf53-31eb0f3a8814",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Safety equipment at camp",
        "sortOrder": 8
      },
      {
        "id": "a15ac9af-fbf0-48a2-b9f9-e4a35e09728e",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Off-road insurance for every participant",
        "sortOrder": 9
      },
      {
        "id": "1158cc52-e25b-46a6-9262-4a5595796b69",
        "tourId": "b6e01285-a23d-461a-85e8-f4440c1f061a",
        "item": "Music system",
        "sortOrder": 10
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
    "title": "Overnight Safari Tour",
    "slug": "overnight-safari-tour",
    "shortDesc": "Camp under the stars in Qatar's desert with BBQ dinner, activities, and continental breakfast.",
    "description": "Experience the magic of a night in Qatar's desert with our Overnight Safari Tour. After an exciting afternoon of dune bashing, sandboarding, swimming, and beach volleyball, settle in for an unforgettable evening. Enjoy a restaurant-quality open buffet BBQ meal in a traditional Arabic seating tent. Sleep under the desert stars in a comfortable sleeping bag and wake up to a delicious continental breakfast as the sun rises over the dunes.",
    "duration": null,
    "availability": null,
    "categoryId": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
    "coverImage": "https://images.unsplash.com/photo-1511185307590-3c29c11275ca?w=1200",
    "isActive": true,
    "isFeatured": true,
    "sortOrder": 3,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.042Z",
    "updatedAt": "2026-11-16T11:56:36.721Z",
    "category": {
      "id": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
      "name": "Desert Safari",
      "slug": "desert-safari",
      "description": "Thrilling desert adventures across Qatar's golden dunes",
      "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.935Z",
      "updatedAt": "2026-11-16T11:56:36.636Z"
    },
    "pricingTiers": [
      {
        "id": "354b1eab-fd4e-4b66-ba7d-c58e3ad980a2",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.042Z",
        "updatedAt": "2026-11-16T10:20:02.042Z"
      },
      {
        "id": "34d23a0e-bfde-4be7-8d64-c1baa7c375fa",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 775,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.042Z",
        "updatedAt": "2026-11-16T10:20:02.042Z"
      },
      {
        "id": "cce8f691-a11f-43c2-827f-3deb2285ffae",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 575,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.042Z",
        "updatedAt": "2026-11-16T10:20:02.042Z"
      },
      {
        "id": "a27219e5-11b1-48ee-bd04-4ac776d08959",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 475,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.042Z",
        "updatedAt": "2026-11-16T10:20:02.042Z"
      },
      {
        "id": "0cd769bf-06fb-42f6-97cd-beea5f86bd91",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 450,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.042Z",
        "updatedAt": "2026-11-16T10:20:02.042Z"
      }
    ],
    "inclusions": [
      {
        "id": "b2ecd32d-f47f-452c-bb95-ffe2ac03587e",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "4x4 vehicle with experienced driver",
        "sortOrder": 0
      },
      {
        "id": "75e2682d-9037-429f-ba2b-d6b43eba2b87",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Restaurant open buffet BBQ meal",
        "sortOrder": 1
      },
      {
        "id": "737f7ff3-0a90-480d-8ab0-d05a8ca6f323",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Soft drinks",
        "sortOrder": 2
      },
      {
        "id": "93acebf4-850a-4040-a9fa-9e1910d286d0",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Bathroom facilities",
        "sortOrder": 3
      },
      {
        "id": "d4f94020-ae82-4441-9c96-997d0fcc7937",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Beach volleyball",
        "sortOrder": 4
      },
      {
        "id": "d7043935-3a7d-47de-b06f-d5a5b8972ff2",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Swimming and sandboarding",
        "sortOrder": 5
      },
      {
        "id": "314f2db1-8358-4b6e-86ba-d207ae36b060",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "AC cabin and towels",
        "sortOrder": 6
      },
      {
        "id": "1f8022de-c219-409a-8c5e-148428197944",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Traditional Arabic seating tent",
        "sortOrder": 7
      },
      {
        "id": "a2dd01d6-907e-4b9f-85c5-b54d750e7765",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Camp safety equipment",
        "sortOrder": 8
      },
      {
        "id": "a875f898-4a8a-4ce9-accc-6184401cfb03",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Off-road insurance",
        "sortOrder": 9
      },
      {
        "id": "7cf1666d-c026-4463-b205-11bd375d4f10",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Music system",
        "sortOrder": 10
      },
      {
        "id": "61b7dbf3-0945-4f96-a45f-47546d7addc4",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Sleeping bag",
        "sortOrder": 11
      },
      {
        "id": "282d6285-2899-4e73-a7b1-999562155ce3",
        "tourId": "06286b3d-9022-4e84-bf31-7dc39dafb9d2",
        "item": "Continental breakfast in the morning",
        "sortOrder": 12
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "23105489-5cc9-4048-bdd8-cea0da8568ce",
    "title": "Half Day Safari With Aquarium",
    "slug": "half-day-safari-with-aquarium",
    "shortDesc": "Combine desert thrills with an aquarium visit for a unique half-day adventure.",
    "description": "Get the best of both worlds with this unique tour combining an exciting desert safari with a visit to Qatar's stunning aquarium. Experience dune bashing and sandboarding before heading to explore the marine wonders at the aquarium. An English-speaking guide accompanies you throughout the journey.",
    "duration": null,
    "availability": null,
    "categoryId": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
    "coverImage": "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 4,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.057Z",
    "updatedAt": "2026-11-16T11:56:36.732Z",
    "category": {
      "id": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
      "name": "Desert Safari",
      "slug": "desert-safari",
      "description": "Thrilling desert adventures across Qatar's golden dunes",
      "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.935Z",
      "updatedAt": "2026-11-16T11:56:36.636Z"
    },
    "pricingTiers": [
      {
        "id": "75d0cf73-cb73-4b7d-a39d-ce509ed60d73",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1050,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.057Z",
        "updatedAt": "2026-11-16T10:20:02.057Z"
      },
      {
        "id": "88bbce5b-b02a-4001-9e6b-7aa3dec23d16",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 550,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.057Z",
        "updatedAt": "2026-11-16T10:20:02.057Z"
      },
      {
        "id": "6a8bc069-7654-4a1b-9d28-b74e5b26edf7",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.057Z",
        "updatedAt": "2026-11-16T10:20:02.057Z"
      },
      {
        "id": "d93f2ce9-ccea-48e5-baf1-dc1202be5c49",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.057Z",
        "updatedAt": "2026-11-16T10:20:02.057Z"
      },
      {
        "id": "a428fd63-81b9-47dc-92aa-7a31d2b3bb21",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 250,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.057Z",
        "updatedAt": "2026-11-16T10:20:02.057Z"
      }
    ],
    "inclusions": [
      {
        "id": "08a0e067-6dde-4e5f-9f89-aace708c9489",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "4x4 vehicle with experienced driver",
        "sortOrder": 0
      },
      {
        "id": "57289ff2-8943-44d6-8acb-ae3e0d4a5806",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "b3a77a21-6c90-4b59-be43-67cf7035def0",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "Sandboarding",
        "sortOrder": 2
      },
      {
        "id": "b8564859-e92b-4f7d-9f99-018e219f479a",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "Off-road insurance",
        "sortOrder": 3
      },
      {
        "id": "9984a606-6a96-4c93-a196-bf3588cc2482",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "Desert camp visit",
        "sortOrder": 4
      },
      {
        "id": "22fb7433-a10a-456c-97ba-bf29cabb92ce",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "English-speaking guide",
        "sortOrder": 5
      }
    ],
    "exclusions": [
      {
        "id": "fa12103a-b693-4b88-aa7d-229f0d9c6117",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "Camel ride (5 minutes)",
        "price": 20,
        "sortOrder": 0
      },
      {
        "id": "201a9425-e92b-4070-9de8-5b91c2c9d303",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "Falcon picture",
        "price": 20,
        "sortOrder": 1
      },
      {
        "id": "a2cfbc1f-1bf5-49dd-af3b-24f364898b33",
        "tourId": "23105489-5cc9-4048-bdd8-cea0da8568ce",
        "item": "Aquarium entrance",
        "price": 50,
        "sortOrder": 2
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "ee789d2d-6f0d-4c86-808a-ddd3625ba4d9",
    "title": "Full Day Safari With Romantic Dinner",
    "slug": "full-day-safari-with-romantic-dinner",
    "shortDesc": "A romantic desert experience for couples with dune bashing and dinner at Outpost Al Barari Resort.",
    "description": "Create unforgettable memories with your special someone on this exclusive romantic desert safari. Enjoy thrilling dune bashing through Qatar's golden desert before heading to the luxurious Outpost Al Barari Resort for an exquisite dinner. This intimate package is designed for couples seeking a unique and romantic experience in Qatar.",
    "duration": null,
    "availability": null,
    "categoryId": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
    "coverImage": "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 5,
    "pricingType": "fixed_group",
    "minPersons": 2,
    "maxPersons": 2,
    "createdAt": "2026-11-16T10:20:02.072Z",
    "updatedAt": "2026-11-16T11:56:36.742Z",
    "category": {
      "id": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
      "name": "Desert Safari",
      "slug": "desert-safari",
      "description": "Thrilling desert adventures across Qatar's golden dunes",
      "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.935Z",
      "updatedAt": "2026-11-16T11:56:36.636Z"
    },
    "pricingTiers": [
      {
        "id": "7295c853-ea21-44b4-87b0-b5bb76b5db47",
        "tourId": "ee789d2d-6f0d-4c86-808a-ddd3625ba4d9",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 2250,
        "isTotal": true,
        "createdAt": "2026-11-16T10:20:02.072Z",
        "updatedAt": "2026-11-16T10:20:02.072Z"
      }
    ],
    "inclusions": [
      {
        "id": "549c2db6-f10b-412f-8ba6-6eceff2de360",
        "tourId": "ee789d2d-6f0d-4c86-808a-ddd3625ba4d9",
        "item": "4x4 vehicle with experienced driver",
        "sortOrder": 0
      },
      {
        "id": "70770905-1e86-42a1-97b3-c3672434408c",
        "tourId": "ee789d2d-6f0d-4c86-808a-ddd3625ba4d9",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "067f2e45-05a1-42d2-84f7-f7a03339d031",
        "tourId": "ee789d2d-6f0d-4c86-808a-ddd3625ba4d9",
        "item": "Off-road insurance",
        "sortOrder": 2
      },
      {
        "id": "3696660c-648a-4303-bc93-f4656562388c",
        "tourId": "ee789d2d-6f0d-4c86-808a-ddd3625ba4d9",
        "item": "Dinner at Outpost Al Barari Resort",
        "sortOrder": 3
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "fd74a4c6-a790-4aef-819b-d402f7322157",
    "title": "Night Safari With Bonfire",
    "slug": "night-safari-with-bonfire",
    "shortDesc": "Experience the desert at night with dune bashing, a bonfire, and stargazing from 20:00 to midnight.",
    "description": "Discover the enchanting beauty of Qatar's desert after dark. Starting at 8 PM, this night safari takes you on an exhilarating dune bashing adventure under the starlit sky. Visit a desert camp where you can gather around a bonfire, enjoy the peaceful desert atmosphere, and create lasting memories. The tour runs until midnight, giving you plenty of time to experience the desert's nocturnal magic.",
    "duration": "20:00–00:00",
    "availability": null,
    "categoryId": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
    "coverImage": "https://images.unsplash.com/photo-1511185307590-3c29c11275ca?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 6,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.088Z",
    "updatedAt": "2026-11-16T11:56:36.754Z",
    "category": {
      "id": "e9ee2f5c-0225-4fe6-945b-7a9229a5ddd4",
      "name": "Desert Safari",
      "slug": "desert-safari",
      "description": "Thrilling desert adventures across Qatar's golden dunes",
      "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.935Z",
      "updatedAt": "2026-11-16T11:56:36.636Z"
    },
    "pricingTiers": [
      {
        "id": "5807b4ca-2f75-4f7f-8b2e-c5e8d9dba428",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 800,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.088Z",
        "updatedAt": "2026-11-16T10:20:02.088Z"
      },
      {
        "id": "f9e0cd3b-c6cc-4fac-80ee-3d2977df2622",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 450,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.088Z",
        "updatedAt": "2026-11-16T10:20:02.088Z"
      },
      {
        "id": "c4bd8084-dcb1-4872-9318-ff3874d01d38",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 330,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.088Z",
        "updatedAt": "2026-11-16T10:20:02.088Z"
      },
      {
        "id": "819bb844-710a-45e1-9b33-72ae545fff79",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 275,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.088Z",
        "updatedAt": "2026-11-16T10:20:02.088Z"
      },
      {
        "id": "50f9ead3-60e0-4bd0-a5a6-fbd012f07d74",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 230,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.088Z",
        "updatedAt": "2026-11-16T10:20:02.088Z"
      }
    ],
    "inclusions": [
      {
        "id": "47bfb492-8e39-4acf-9d18-7576255d4bcd",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "item": "4x4 vehicle with experienced driver",
        "sortOrder": 0
      },
      {
        "id": "6584c382-823a-434b-80ae-39bd1de809b1",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "f428d5ba-3b20-4adf-88cc-ed616c9dc50d",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "item": "Off-road insurance",
        "sortOrder": 2
      },
      {
        "id": "3724e124-ee0b-4bd5-b879-7cc50b08b8f4",
        "tourId": "fd74a4c6-a790-4aef-819b-d402f7322157",
        "item": "Desert camp visit",
        "sortOrder": 3
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "db802d03-0694-4c68-a766-1da03a806324",
    "title": "Scuba Diving",
    "slug": "scuba-diving",
    "shortDesc": "Explore Qatar's underwater world with two professional dives including all equipment and transportation.",
    "description": "Dive into the crystal-clear waters of the Arabian Gulf and discover the fascinating marine life beneath the surface. This professional scuba diving experience includes two dives with full equipment, transportation to the dive site, and comprehensive insurance. Whether you're a beginner or experienced diver, our certified instructors ensure a safe and unforgettable underwater adventure.",
    "duration": null,
    "availability": null,
    "categoryId": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
    "coverImage": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
    "isActive": true,
    "isFeatured": true,
    "sortOrder": 7,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.104Z",
    "updatedAt": "2026-11-16T10:20:02.104Z",
    "category": {
      "id": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
      "name": "Water Sports & Adventure",
      "slug": "water-sports-adventure",
      "description": "Exciting water activities and marine adventures",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "sortOrder": 2,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.947Z",
      "updatedAt": "2026-11-16T11:56:36.681Z"
    },
    "pricingTiers": [
      {
        "id": "f6f67886-5066-4848-926a-f68e54628f47",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.104Z",
        "updatedAt": "2026-11-16T10:20:02.104Z"
      },
      {
        "id": "c314de49-d96b-4cbd-969a-c3352a4f8dbd",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 1250,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.104Z",
        "updatedAt": "2026-11-16T10:20:02.104Z"
      },
      {
        "id": "8a91b473-fadf-4d22-a455-e7ee041fa15c",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 1200,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.104Z",
        "updatedAt": "2026-11-16T10:20:02.104Z"
      },
      {
        "id": "e7327132-6ef2-4c6e-9b4d-1588162e77dd",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 1175,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.104Z",
        "updatedAt": "2026-11-16T10:20:02.104Z"
      },
      {
        "id": "4b48edd8-966e-4144-8386-0f8ebf7e109c",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 1150,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.104Z",
        "updatedAt": "2026-11-16T10:20:02.104Z"
      }
    ],
    "inclusions": [
      {
        "id": "96805911-29b4-4bc3-886a-27af9f11c274",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "item": "Transportation",
        "sortOrder": 0
      },
      {
        "id": "3214ee77-dcd0-46fa-a87e-f8cd09744a9f",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "c656362e-0207-44ef-b251-d96dcbb968ec",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "item": "2 dives",
        "sortOrder": 2
      },
      {
        "id": "61b576dc-4c8b-4d46-b4d6-f049cc3de9a9",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "item": "Insurance",
        "sortOrder": 3
      },
      {
        "id": "391ce214-f74d-4283-b9da-51ed6fadfdf0",
        "tourId": "db802d03-0694-4c68-a766-1da03a806324",
        "item": "Diving equipment",
        "sortOrder": 4
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "20566147-9412-46cc-86c1-c352ec0b7ac7",
    "title": "Horse Riding Tour",
    "slug": "horse-riding-tour",
    "shortDesc": "Enjoy a 50-minute horse riding experience with professional guidance and transportation.",
    "description": "Experience the timeless tradition of horse riding in Qatar's beautiful landscape. This tour offers a 50-minute horse riding session suitable for riders of all experience levels. Professional guides ensure your safety and comfort throughout the experience. Transportation, refreshments, and insurance are included for a hassle-free adventure.",
    "duration": null,
    "availability": null,
    "categoryId": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
    "coverImage": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 8,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.122Z",
    "updatedAt": "2026-11-16T10:20:02.122Z",
    "category": {
      "id": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
      "name": "Water Sports & Adventure",
      "slug": "water-sports-adventure",
      "description": "Exciting water activities and marine adventures",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "sortOrder": 2,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.947Z",
      "updatedAt": "2026-11-16T11:56:36.681Z"
    },
    "pricingTiers": [
      {
        "id": "02e9a1e0-ef23-4df9-acbb-f020b203ef9a",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 800,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.122Z",
        "updatedAt": "2026-11-16T10:20:02.122Z"
      },
      {
        "id": "9e0cffd2-f63a-47ca-ba77-3bf27f5ec48e",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 500,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.122Z",
        "updatedAt": "2026-11-16T10:20:02.122Z"
      },
      {
        "id": "bfa370ad-26ed-4af2-b790-7a4c8dccdd31",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 450,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.122Z",
        "updatedAt": "2026-11-16T10:20:02.122Z"
      },
      {
        "id": "5e3d0f93-3fbd-4565-a184-6d4faa96012d",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.122Z",
        "updatedAt": "2026-11-16T10:20:02.122Z"
      },
      {
        "id": "d30dd33d-d1fc-4799-8ef2-df1df7df9fa0",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.122Z",
        "updatedAt": "2026-11-16T10:20:02.122Z"
      }
    ],
    "inclusions": [
      {
        "id": "6f760d2d-f0a6-4b9c-a8aa-2bbfd89a0fcf",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "item": "50-minute horse riding",
        "sortOrder": 0
      },
      {
        "id": "fb11540e-900d-4509-a9e1-e8ca2edcc7d4",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "29a26956-998c-4774-baa9-0bb97aea7f26",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "7a8721e5-46f8-4e56-996d-a91c502e421d",
        "tourId": "20566147-9412-46cc-86c1-c352ec0b7ac7",
        "item": "Insurance",
        "sortOrder": 3
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "628de181-64ca-49be-975b-2cbdcad2f18b",
    "title": "Quad Bike Tour",
    "slug": "quad-bike-tour",
    "shortDesc": "Ride powerful quad bikes across Qatar's desert dunes with transportation included.",
    "description": "Feel the adrenaline rush as you ride a powerful quad bike across Qatar's stunning desert terrain. Navigate through golden sand dunes and enjoy the freedom of off-road riding in one of the world's most beautiful desert landscapes. Transportation to the location and refreshments are included.",
    "duration": null,
    "availability": null,
    "categoryId": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
    "coverImage": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 9,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.139Z",
    "updatedAt": "2026-11-16T11:56:36.764Z",
    "category": {
      "id": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
      "name": "Water Sports & Adventure",
      "slug": "water-sports-adventure",
      "description": "Exciting water activities and marine adventures",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "sortOrder": 2,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.947Z",
      "updatedAt": "2026-11-16T11:56:36.681Z"
    },
    "pricingTiers": [
      {
        "id": "a76b1603-33b5-48e1-b283-865a21750286",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1200,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.139Z",
        "updatedAt": "2026-11-16T10:20:02.139Z"
      },
      {
        "id": "f1eca8e0-f670-4395-bffa-93be23af2fe0",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 850,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.139Z",
        "updatedAt": "2026-11-16T10:20:02.139Z"
      },
      {
        "id": "ac0adda6-1101-4b94-9613-23a4ee91a265",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 735,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.139Z",
        "updatedAt": "2026-11-16T10:20:02.139Z"
      },
      {
        "id": "eaa875d8-4fed-4f59-9ed8-7d8377e920cd",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 675,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.139Z",
        "updatedAt": "2026-11-16T10:20:02.139Z"
      },
      {
        "id": "181eeb17-bfe4-40d3-933c-1fc44b452cc0",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 640,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.139Z",
        "updatedAt": "2026-11-16T10:20:02.139Z"
      }
    ],
    "inclusions": [
      {
        "id": "b85f81ef-c4c4-4022-ae76-625265e59df1",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "item": "Transportation",
        "sortOrder": 0
      },
      {
        "id": "1b06cda0-63bc-4e4d-99cf-cc6abca9ade9",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "item": "Water and soft drinks",
        "sortOrder": 1
      }
    ],
    "exclusions": [
      {
        "id": "bee49c5c-0f70-47db-999e-65b02598837d",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "item": "Camel ride",
        "price": null,
        "sortOrder": 0
      },
      {
        "id": "8e4b64a2-f0a7-4081-8727-6ce4c7a1f912",
        "tourId": "628de181-64ca-49be-975b-2cbdcad2f18b",
        "item": "Any additional activity",
        "price": null,
        "sortOrder": 1
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "5cebd543-4ba8-43d2-8f1d-00c8a3264dd0",
    "title": "Jet Ski Tour",
    "slug": "jet-ski-tour",
    "shortDesc": "Thrilling jet ski adventure near Safliya Island with speedboat trip and hotel transfers.",
    "description": "Get your heart pumping with an exciting jet ski tour in the beautiful waters around Qatar. Race across the waves near the stunning Safliya Island and enjoy a speedboat trip as part of this exhilarating water adventure. Hotel pick-up and drop-off, refreshments, and insurance are all included.",
    "duration": null,
    "availability": null,
    "categoryId": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
    "coverImage": "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 10,
    "pricingType": "fixed_group",
    "minPersons": 1,
    "maxPersons": 2,
    "createdAt": "2026-11-16T10:20:02.153Z",
    "updatedAt": "2026-11-16T10:20:02.153Z",
    "category": {
      "id": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
      "name": "Water Sports & Adventure",
      "slug": "water-sports-adventure",
      "description": "Exciting water activities and marine adventures",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "sortOrder": 2,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.947Z",
      "updatedAt": "2026-11-16T11:56:36.681Z"
    },
    "pricingTiers": [
      {
        "id": "81364433-ac8a-4e5b-ba40-9528a4b07cd7",
        "tourId": "5cebd543-4ba8-43d2-8f1d-00c8a3264dd0",
        "minPersons": 1,
        "maxPersons": 2,
        "pricePerPerson": 1200,
        "isTotal": true,
        "createdAt": "2026-11-16T10:20:02.153Z",
        "updatedAt": "2026-11-16T10:20:02.153Z"
      }
    ],
    "inclusions": [
      {
        "id": "7a449585-ff50-4bef-bddc-e3b3f25332a5",
        "tourId": "5cebd543-4ba8-43d2-8f1d-00c8a3264dd0",
        "item": "Transportation from hotel",
        "sortOrder": 0
      },
      {
        "id": "bde83eba-aa54-4751-a836-999b96e0a946",
        "tourId": "5cebd543-4ba8-43d2-8f1d-00c8a3264dd0",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "9389ccf6-59fb-45ed-9ef5-3afe7004e7d6",
        "tourId": "5cebd543-4ba8-43d2-8f1d-00c8a3264dd0",
        "item": "Insurance",
        "sortOrder": 2
      },
      {
        "id": "c55db7db-0b08-4900-b939-39f2cda58aed",
        "tourId": "5cebd543-4ba8-43d2-8f1d-00c8a3264dd0",
        "item": "Speedboat trip near Safliya Island",
        "sortOrder": 3
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "65872515-c99d-484a-9361-b08ed257e339",
    "title": "Kayaking Tour",
    "slug": "kayaking-tour",
    "shortDesc": "Paddle through Qatar's beautiful mangroves with an English-speaking guide.",
    "description": "Explore Qatar's stunning mangrove forests by kayak on this guided tour. Paddle through serene waterways surrounded by lush mangroves, a unique ecosystem that thrives in Qatar's coastal areas. An English-speaking guide leads you through the most beautiful routes, sharing insights about the local environment. The tour includes a visit to a traditional seating area with a changing room.",
    "duration": null,
    "availability": null,
    "categoryId": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
    "coverImage": "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 11,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.167Z",
    "updatedAt": "2026-11-16T11:56:36.774Z",
    "category": {
      "id": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
      "name": "Water Sports & Adventure",
      "slug": "water-sports-adventure",
      "description": "Exciting water activities and marine adventures",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "sortOrder": 2,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.947Z",
      "updatedAt": "2026-11-16T11:56:36.681Z"
    },
    "pricingTiers": [
      {
        "id": "b3857997-0cdd-4a26-89eb-2ae015ed6eb3",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1000,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.167Z",
        "updatedAt": "2026-11-16T10:20:02.167Z"
      },
      {
        "id": "a19f050f-abd3-4416-9d34-a6a9451b3851",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 600,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.167Z",
        "updatedAt": "2026-11-16T10:20:02.167Z"
      },
      {
        "id": "5e20ac5d-3a18-4045-bd00-aa2d06704724",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 450,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.167Z",
        "updatedAt": "2026-11-16T10:20:02.167Z"
      },
      {
        "id": "dcf7aa72-8055-4306-8318-1c9183549692",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 430,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.167Z",
        "updatedAt": "2026-11-16T10:20:02.167Z"
      },
      {
        "id": "09b6cfb4-f83f-4135-b61b-6c69ff14abd8",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 420,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.167Z",
        "updatedAt": "2026-11-16T10:20:02.167Z"
      }
    ],
    "inclusions": [
      {
        "id": "d014884b-9fd4-4de0-bcf1-afef6e6e6b58",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "fa35b6d4-019f-46f9-aa6a-118b320802a6",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "9e3f32fc-f939-427c-9593-51e2dbada4d0",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "06d4d96c-207a-4042-bb30-6ed637c53650",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "item": "Traditional seating area with changing room",
        "sortOrder": 3
      },
      {
        "id": "d2dc6fc4-fdef-4fb2-81e9-5f869d59f943",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "item": "Mangroves visit",
        "sortOrder": 4
      },
      {
        "id": "6c02b3e9-866d-4375-aa33-723b48197403",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "item": "Insurance",
        "sortOrder": 5
      }
    ],
    "exclusions": [
      {
        "id": "2b286a8b-4cd1-43ec-afe5-e3cb77c31482",
        "tourId": "65872515-c99d-484a-9361-b08ed257e339",
        "item": "Meals",
        "price": null,
        "sortOrder": 0
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "c2d18055-072d-4a24-835a-57634fc8e037",
    "title": "Water Sports Tour",
    "slug": "water-sports-tour",
    "shortDesc": "Complete water sports package with speedboat, banana ride, doughnut ride, and more.",
    "description": "Experience the ultimate water sports adventure in Qatar with this action-packed tour. Enjoy a variety of thrilling water activities including a speedboat ride, banana ride, and doughnut ride. Perfect for groups of up to 5 people, this tour provides everything you need for an unforgettable day on the water. Hotel transportation, refreshments, and insurance are included.",
    "duration": null,
    "availability": null,
    "categoryId": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
    "coverImage": "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 12,
    "pricingType": "fixed_group",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.180Z",
    "updatedAt": "2026-11-16T10:20:02.180Z",
    "category": {
      "id": "7c12a074-66b6-44c1-a3b3-691d17ca4449",
      "name": "Water Sports & Adventure",
      "slug": "water-sports-adventure",
      "description": "Exciting water activities and marine adventures",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "sortOrder": 2,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.947Z",
      "updatedAt": "2026-11-16T11:56:36.681Z"
    },
    "pricingTiers": [
      {
        "id": "41a27b4b-4f9e-481e-8a43-399265fe8956",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "minPersons": 1,
        "maxPersons": 5,
        "pricePerPerson": 2800,
        "isTotal": true,
        "createdAt": "2026-11-16T10:20:02.180Z",
        "updatedAt": "2026-11-16T10:20:02.180Z"
      }
    ],
    "inclusions": [
      {
        "id": "fc33ad74-52e6-4d78-930d-6a1aa81ebb6c",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Transportation from hotel",
        "sortOrder": 0
      },
      {
        "id": "99109269-7177-471c-a297-86574db99b10",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Speedboat",
        "sortOrder": 1
      },
      {
        "id": "cd8d2d84-522f-4d63-8af6-130f65f107ba",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Banana ride",
        "sortOrder": 2
      },
      {
        "id": "6c38260e-7e5a-4dca-ae75-bb26ef9e1d50",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Doughnut ride",
        "sortOrder": 3
      },
      {
        "id": "63e7aedc-f8d4-4a88-926e-520a48a0cf4e",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Water and soft drinks",
        "sortOrder": 4
      },
      {
        "id": "45d1cce8-29af-4805-b416-fa2a5ae7d813",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Insurance",
        "sortOrder": 5
      }
    ],
    "exclusions": [
      {
        "id": "daa7bedc-d701-49e7-a6de-a896deee83f2",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Jet ski (per hour per jet ski)",
        "price": 600,
        "sortOrder": 0
      },
      {
        "id": "1f1d6e35-07ba-4302-888c-238505c57fa6",
        "tourId": "c2d18055-072d-4a24-835a-57634fc8e037",
        "item": "Any other activity",
        "price": null,
        "sortOrder": 1
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
    "title": "Dhow Cruise Tour",
    "slug": "dhow-cruise-tour",
    "shortDesc": "Sail along Qatar's coast on a traditional dhow with a private crew and guide.",
    "description": "Step aboard a traditional wooden dhow and cruise along Qatar's stunning coastline. This private cruise comes with an experienced crew and English-speaking guide who will share stories about Qatar's maritime heritage. The dhow is fully equipped with modern safety equipment including life jackets, fire extinguishers, first aid supplies, and GPS navigation. Relax to music as you take in the beautiful views of the Arabian Gulf.",
    "duration": null,
    "availability": null,
    "categoryId": "2f2efe6a-85df-44ab-9ada-427787376493",
    "coverImage": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200",
    "isActive": true,
    "isFeatured": true,
    "sortOrder": 13,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 3,
    "createdAt": "2026-11-16T10:20:02.194Z",
    "updatedAt": "2026-11-16T11:56:36.784Z",
    "category": {
      "id": "2f2efe6a-85df-44ab-9ada-427787376493",
      "name": "Cruise Tours",
      "slug": "cruise-tours",
      "description": "Luxurious dhow cruise experiences along Qatar's coastline",
      "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
      "sortOrder": 3,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.960Z",
      "updatedAt": "2026-11-16T11:56:36.650Z"
    },
    "pricingTiers": [
      {
        "id": "479e25f9-5bf7-4ce2-b03b-cc249bd4fcad",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1000,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.194Z",
        "updatedAt": "2026-11-16T10:20:02.194Z"
      },
      {
        "id": "d014ca1b-efb5-4d3c-af10-d78a2a067a4f",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 600,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.194Z",
        "updatedAt": "2026-11-16T10:20:02.194Z"
      },
      {
        "id": "eb3aed6a-122e-4d23-b48b-df309daf9190",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.194Z",
        "updatedAt": "2026-11-16T10:20:02.194Z"
      }
    ],
    "inclusions": [
      {
        "id": "78cfab5f-8163-4b9d-99c4-cf8697ff48b7",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Hotel transportation",
        "sortOrder": 0
      },
      {
        "id": "43ba33c1-d712-4fd5-bb3f-a87c1f3f9c02",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Private dhow with experienced crew",
        "sortOrder": 1
      },
      {
        "id": "df5dfc65-30a2-4f23-ab35-be409623a5dd",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "English-speaking guide",
        "sortOrder": 2
      },
      {
        "id": "759a3776-5539-469a-9599-3595cafe9e99",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Water and soft drinks",
        "sortOrder": 3
      },
      {
        "id": "ddbafd66-6210-4f7d-885e-73d3312656ef",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Safety equipment",
        "sortOrder": 4
      },
      {
        "id": "4f208993-9b33-4f32-8a9e-1decf3fff1d9",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Life jackets",
        "sortOrder": 5
      },
      {
        "id": "da53afeb-b374-425a-9082-2589b15677d0",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Fire extinguishers",
        "sortOrder": 6
      },
      {
        "id": "26ec2b22-de6d-4464-a214-c6c7d3118177",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "First aid box",
        "sortOrder": 7
      },
      {
        "id": "b6268bc7-92f0-4c02-95f0-4dd5067dfa93",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "GPS system",
        "sortOrder": 8
      },
      {
        "id": "ff94f686-5c39-498c-810a-22ed6cbe0003",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Insurance",
        "sortOrder": 9
      },
      {
        "id": "afadcf46-3209-4ff2-873b-241ad33f9687",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Bathroom facilities",
        "sortOrder": 10
      },
      {
        "id": "3f34ea58-fc89-42dd-b8a1-90d6f908d438",
        "tourId": "f5e46af6-1341-4868-9c46-3b07d7ee2de0",
        "item": "Music stereo system",
        "sortOrder": 11
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "28e8d41b-596c-4079-b03e-482275f8c02c",
    "title": "Dhow Cruise With Dinner (BBQ)",
    "slug": "dhow-cruise-with-dinner-bbq",
    "shortDesc": "A luxury dhow cruise featuring live BBQ dinner, safety equipment, and professional crew.",
    "description": "Enjoy a luxurious evening cruise aboard a traditional dhow while savoring a live BBQ dinner prepared on board. This premium cruise experience includes a professional crew, English-speaking guide, and a dedicated dhow helper to ensure your comfort. The vessel is equipped with comprehensive safety features including life jackets, fire extinguishers, first aid supplies, GPS navigation, life saver rings, and radio communication.",
    "duration": null,
    "availability": null,
    "categoryId": "2f2efe6a-85df-44ab-9ada-427787376493",
    "coverImage": "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200",
    "isActive": true,
    "isFeatured": true,
    "sortOrder": 14,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.207Z",
    "updatedAt": "2026-11-16T11:56:36.794Z",
    "category": {
      "id": "2f2efe6a-85df-44ab-9ada-427787376493",
      "name": "Cruise Tours",
      "slug": "cruise-tours",
      "description": "Luxurious dhow cruise experiences along Qatar's coastline",
      "image": "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
      "sortOrder": 3,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.960Z",
      "updatedAt": "2026-11-16T11:56:36.650Z"
    },
    "pricingTiers": [
      {
        "id": "7fde1309-4fc9-4152-bde4-c2dde50746cc",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1200,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.207Z",
        "updatedAt": "2026-11-16T10:20:02.207Z"
      },
      {
        "id": "771a3871-a5a4-4572-bd0f-b20537af3717",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 650,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.207Z",
        "updatedAt": "2026-11-16T10:20:02.207Z"
      },
      {
        "id": "21588dd3-8910-4855-826e-bc6c3c65c1ee",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 500,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.207Z",
        "updatedAt": "2026-11-16T10:20:02.207Z"
      },
      {
        "id": "c0222e40-7a10-48b2-8c64-9edf33264cdc",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.207Z",
        "updatedAt": "2026-11-16T10:20:02.207Z"
      },
      {
        "id": "5fb4c51b-8416-4dc2-a737-4f017dd5c16a",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.207Z",
        "updatedAt": "2026-11-16T10:20:02.207Z"
      }
    ],
    "inclusions": [
      {
        "id": "81c698f4-4c23-4d83-b05a-41e93e37b3af",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Hotel transportation",
        "sortOrder": 0
      },
      {
        "id": "271b940f-b593-48bb-8978-138902bc4865",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Private dhow with experienced crew",
        "sortOrder": 1
      },
      {
        "id": "0a72eb45-9da9-4793-b8eb-a41c673e230e",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "English-speaking guide",
        "sortOrder": 2
      },
      {
        "id": "ae5c59c9-2c6d-462a-b883-700a94541bae",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Live BBQ meal",
        "sortOrder": 3
      },
      {
        "id": "cb884155-547c-4f1c-b06c-1b83de062db4",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Water and soft drinks",
        "sortOrder": 4
      },
      {
        "id": "fc44577a-0bcd-4464-b1a6-8a2c8c91d4ed",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Dhow helper",
        "sortOrder": 5
      },
      {
        "id": "3c1d4d53-22e3-4521-aede-82e1bacbf178",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Safety equipment",
        "sortOrder": 6
      },
      {
        "id": "795bb1c4-d7f8-4360-bed8-b7fa94db7882",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Life jackets",
        "sortOrder": 7
      },
      {
        "id": "e11493b2-a487-478b-95ef-7fe580e61888",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Fire extinguishers",
        "sortOrder": 8
      },
      {
        "id": "bf27e6df-1167-44c8-9f9b-75424a6797b1",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "First aid box",
        "sortOrder": 9
      },
      {
        "id": "03ff7ac4-9a7d-48b1-88ab-d267d37fadd6",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "GPS system",
        "sortOrder": 10
      },
      {
        "id": "d6e07c59-2d7c-4411-992f-3c027cb1c970",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Insurance",
        "sortOrder": 11
      },
      {
        "id": "4643a5c6-ca8c-4072-8a10-aa3648c043ec",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Bathroom facilities",
        "sortOrder": 12
      },
      {
        "id": "5a33b47e-7a35-41a9-a266-2099fcf1963b",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Life saver rings",
        "sortOrder": 13
      },
      {
        "id": "357c1bef-74b5-4719-8a2f-2fa81f32cd2d",
        "tourId": "28e8d41b-596c-4079-b03e-482275f8c02c",
        "item": "Radio communication",
        "sortOrder": 14
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
    "title": "Museum Tour",
    "slug": "museum-tour",
    "shortDesc": "Visit Qatar's top museums including NMOQ, Museum of Islamic Art, and Msheireb Museums.",
    "description": "Immerse yourself in Qatar's rich cultural heritage with guided visits to three of the country's most prestigious museums. Explore the National Museum of Qatar (NMOQ), the renowned Museum of Islamic Art, and the historically significant Msheireb Museums. An English-speaking tour guide leads you through each museum, providing fascinating insights into Qatar's history, art, and culture.",
    "duration": "4 hours",
    "availability": "Every Saturday and Monday",
    "categoryId": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
    "coverImage": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 15,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.222Z",
    "updatedAt": "2026-11-16T10:20:02.222Z",
    "category": {
      "id": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
      "name": "Cultural & Historical Tours",
      "slug": "cultural-historical-tours",
      "description": "Immerse yourself in Qatar's rich culture and heritage",
      "image": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
      "sortOrder": 5,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.984Z",
      "updatedAt": "2026-11-16T11:56:36.691Z"
    },
    "pricingTiers": [
      {
        "id": "2e690fa9-0051-4f12-a59a-f49feb1ac64d",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 800,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.222Z",
        "updatedAt": "2026-11-16T10:20:02.222Z"
      },
      {
        "id": "8328ecf1-2890-4ec6-a938-0ef55713c9e0",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 450,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.222Z",
        "updatedAt": "2026-11-16T10:20:02.222Z"
      },
      {
        "id": "406d0393-2315-4a50-9b1a-7edd83c6befa",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 335,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.222Z",
        "updatedAt": "2026-11-16T10:20:02.222Z"
      },
      {
        "id": "011d2588-71fc-4fc1-b03a-81d906a4030a",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 275,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.222Z",
        "updatedAt": "2026-11-16T10:20:02.222Z"
      },
      {
        "id": "88fc3e50-8a10-41e8-9792-9ffe6347d07f",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 240,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.222Z",
        "updatedAt": "2026-11-16T10:20:02.222Z"
      }
    ],
    "inclusions": [
      {
        "id": "7d661dd8-7cec-4c03-8d80-f5ecab70f2c0",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "English-speaking tour guide",
        "sortOrder": 0
      },
      {
        "id": "ca066c06-0c28-4bb5-b7a5-bbcd230c9b5a",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "dda460b0-7243-44b5-9442-1f5b26afda02",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "Insurance",
        "sortOrder": 2
      },
      {
        "id": "60deda14-97d7-4cf1-ab8a-859db072d903",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "Transportation",
        "sortOrder": 3
      },
      {
        "id": "31f8e71c-5ce2-4f6d-93f0-8fbb56a59fc3",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "Museum entrance fees",
        "sortOrder": 4
      },
      {
        "id": "b828018d-eabe-4bfd-9ce6-85e3d2a8e6b8",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "Guided tours at National Museum of Qatar (NMOQ)",
        "sortOrder": 5
      },
      {
        "id": "46052488-34d7-4a57-bdd7-a3c0a640d95a",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "Guided tours at Museum of Islamic Art",
        "sortOrder": 6
      },
      {
        "id": "7cd4578d-e15d-4103-adf8-5890378ad0dc",
        "tourId": "46943e0a-9886-4b8c-90c9-c7d2d375ff96",
        "item": "Guided tours at Msheireb Museums",
        "sortOrder": 7
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
    "title": "Doha City Tour",
    "slug": "doha-city-tour",
    "shortDesc": "Discover the highlights of Qatar's capital city with transportation and a professional guide.",
    "description": "Discover the captivating blend of modern architecture and traditional heritage that makes Doha one of the world's most fascinating cities. This comprehensive city tour takes you through the city's most iconic landmarks, bustling souqs, and stunning waterfront. Transportation, refreshments, and insurance are included for a comfortable sightseeing experience.",
    "duration": null,
    "availability": null,
    "categoryId": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
    "coverImage": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200",
    "isActive": true,
    "isFeatured": true,
    "sortOrder": 16,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.236Z",
    "updatedAt": "2026-11-16T11:56:36.803Z",
    "category": {
      "id": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
      "name": "City Tours",
      "slug": "city-tours",
      "description": "Discover the modern marvels and heritage of Doha",
      "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "sortOrder": 4,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.972Z",
      "updatedAt": "2026-11-16T11:56:36.661Z"
    },
    "pricingTiers": [
      {
        "id": "5e26c5e9-b24b-4022-80c7-a2b64517e62a",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1000,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.236Z",
        "updatedAt": "2026-11-16T10:20:02.236Z"
      },
      {
        "id": "d6d25d44-12ba-4df5-b201-91e48e80ca3e",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 600,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.236Z",
        "updatedAt": "2026-11-16T10:20:02.236Z"
      },
      {
        "id": "1be4fd79-91d2-4469-879a-056d4016836f",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.236Z",
        "updatedAt": "2026-11-16T10:20:02.236Z"
      },
      {
        "id": "b38f208e-46c1-4e74-ad44-5ea5b8cec5fd",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.236Z",
        "updatedAt": "2026-11-16T10:20:02.236Z"
      },
      {
        "id": "4a0e5f20-efc9-4e9d-b31c-64a3219b4197",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 240,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.236Z",
        "updatedAt": "2026-11-16T10:20:02.236Z"
      }
    ],
    "inclusions": [
      {
        "id": "67090405-54b6-4a70-9d66-88965b779127",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "item": "Transportation",
        "sortOrder": 0
      },
      {
        "id": "dd63fa50-05a1-4708-b8ed-00cdff42c5f6",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "item": "Water and soft drinks",
        "sortOrder": 1
      },
      {
        "id": "93931df7-3d26-445c-80fa-3854680a25bc",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "item": "Insurance",
        "sortOrder": 2
      }
    ],
    "exclusions": [
      {
        "id": "f0cb3873-dac9-433b-b1c8-e9942641d9f0",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "item": "Museum admission",
        "price": 50,
        "sortOrder": 0
      },
      {
        "id": "50bf9d4c-41f3-4d1c-ac21-b0da767ceccd",
        "tourId": "dc841b0b-b77f-4650-8028-c3b6b2dc6e6a",
        "item": "Other-language tour guide (per hour, minimum 4 hours)",
        "price": 150,
        "sortOrder": 1
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "37d0d82a-b550-4828-8857-953ab91d4b65",
    "title": "City Tour With Lunch",
    "slug": "city-tour-with-lunch",
    "shortDesc": "Explore Doha's highlights with an included lunch or dinner for a complete experience.",
    "description": "Enjoy a comprehensive tour of Doha's most impressive landmarks with a delicious included meal. This tour combines sightseeing with culinary experiences, taking you through the city's highlights before stopping for a satisfying lunch or dinner. Transportation, refreshments, and insurance ensure a comfortable and worry-free experience.",
    "duration": null,
    "availability": null,
    "categoryId": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
    "coverImage": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 17,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.250Z",
    "updatedAt": "2026-11-16T11:56:36.813Z",
    "category": {
      "id": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
      "name": "City Tours",
      "slug": "city-tours",
      "description": "Discover the modern marvels and heritage of Doha",
      "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "sortOrder": 4,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.972Z",
      "updatedAt": "2026-11-16T11:56:36.661Z"
    },
    "pricingTiers": [
      {
        "id": "0145195f-2cf0-46bc-8b73-1f4eead4fb50",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 900,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.250Z",
        "updatedAt": "2026-11-16T10:20:02.250Z"
      },
      {
        "id": "dc69847c-4074-48dc-8f5a-b92082d09aa6",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 520,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.250Z",
        "updatedAt": "2026-11-16T10:20:02.250Z"
      },
      {
        "id": "ee75f8dd-f055-4ada-ab38-1c25255b8115",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.250Z",
        "updatedAt": "2026-11-16T10:20:02.250Z"
      },
      {
        "id": "80183e75-54a8-47fa-ac32-e6432c12d009",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.250Z",
        "updatedAt": "2026-11-16T10:20:02.250Z"
      },
      {
        "id": "85c7fca2-ff57-46de-8f8c-edf563d89aac",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.250Z",
        "updatedAt": "2026-11-16T10:20:02.250Z"
      }
    ],
    "inclusions": [
      {
        "id": "8f0bd0c7-c745-4ba0-aac4-8c9a63c304c4",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "item": "Transportation",
        "sortOrder": 0
      },
      {
        "id": "4cc5f2fc-baeb-4611-ba04-58940e22eba6",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "item": "Lunch or dinner",
        "sortOrder": 1
      },
      {
        "id": "ae5c7e70-23fc-41cc-86b7-eb4d44b235e8",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "a5ba0d22-6339-48e9-bbb1-96084917d383",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "item": "Insurance",
        "sortOrder": 3
      }
    ],
    "exclusions": [
      {
        "id": "da778aca-9383-46fd-b939-829c13e00ab8",
        "tourId": "37d0d82a-b550-4828-8857-953ab91d4b65",
        "item": "Museum admission",
        "price": 50,
        "sortOrder": 0
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "0480a276-d216-4150-872e-608638929181",
    "title": "City Tour From Sea & Land",
    "slug": "city-tour-from-sea-and-land",
    "shortDesc": "Experience Doha from both sea and land with a 2-hour cruise and 2-hour city tour.",
    "description": "See Doha from two perspectives on this unique dual experience. Begin with a 2-hour sea tour cruising along the Doha Corniche, past the stunning West Bay skyline, and around The Pearl Island's Porto Arabia. Then continue with a 2-hour land tour visiting Lusail Fairmont, Katara Towers, Lusail Stadium, and Stadium 974. An English-speaking guide accompanies you throughout both segments.",
    "duration": null,
    "availability": null,
    "categoryId": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
    "coverImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 18,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.264Z",
    "updatedAt": "2026-11-16T11:56:36.823Z",
    "category": {
      "id": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
      "name": "City Tours",
      "slug": "city-tours",
      "description": "Discover the modern marvels and heritage of Doha",
      "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "sortOrder": 4,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.972Z",
      "updatedAt": "2026-11-16T11:56:36.661Z"
    },
    "pricingTiers": [
      {
        "id": "b1157ff2-7e25-4c98-82e2-521b16633a2a",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.264Z",
        "updatedAt": "2026-11-16T10:20:02.264Z"
      },
      {
        "id": "f416d7cf-d159-4b99-9f11-30c2baf72744",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 750,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.264Z",
        "updatedAt": "2026-11-16T10:20:02.264Z"
      },
      {
        "id": "4e4a0c35-b5de-45f9-ae66-f3b26d1cee83",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 600,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.264Z",
        "updatedAt": "2026-11-16T10:20:02.264Z"
      },
      {
        "id": "d5efff4e-de16-483c-a579-017892af4313",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 500,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.264Z",
        "updatedAt": "2026-11-16T10:20:02.264Z"
      },
      {
        "id": "7d5c9b9a-5b8b-4160-a0be-21c4d81a263f",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.264Z",
        "updatedAt": "2026-11-16T10:20:02.264Z"
      }
    ],
    "inclusions": [
      {
        "id": "8272875c-2d6b-4dff-9aa9-a4ce8e3159c6",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "15ea2c8e-ed30-4056-b82c-410f6b5500e8",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "04449d12-c4c1-4c28-a380-793956859130",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "item": "Water and soft drinks",
        "sortOrder": 2
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [
      {
        "id": "78a02607-af24-4b7c-9e77-4293b5c91196",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "title": "Sea Tour – 2 hours",
        "items": "[\"Doha Corniche\",\"West Bay skyline\",\"The Pearl Island (Porto Arabia)\"]",
        "sortOrder": 0
      },
      {
        "id": "f8e1f1d6-6e91-4912-8415-17f3855442f0",
        "tourId": "0480a276-d216-4150-872e-608638929181",
        "title": "Land Tour – 2 hours",
        "items": "[\"Lusail Fairmont\",\"Katara Towers\",\"Lusail Stadium\",\"Stadium 974\"]",
        "sortOrder": 1
      }
    ],
    "images": []
  },
  {
    "id": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
    "title": "City Tour Speedboat",
    "slug": "city-tour-speedboat",
    "shortDesc": "See Doha's iconic skyline from a thrilling speedboat ride along the coast.",
    "description": "Experience the thrill of a speedboat tour along Qatar's stunning coastline. Race past the Doha Corniche, take in the towering West Bay skyline, and cruise around The Pearl Island's Porto Arabia marina. This high-energy tour offers breathtaking views of Doha from the water with an unforgettable adrenaline rush.",
    "duration": null,
    "availability": null,
    "categoryId": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
    "coverImage": "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 19,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.278Z",
    "updatedAt": "2026-11-16T10:20:02.278Z",
    "category": {
      "id": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
      "name": "City Tours",
      "slug": "city-tours",
      "description": "Discover the modern marvels and heritage of Doha",
      "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "sortOrder": 4,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.972Z",
      "updatedAt": "2026-11-16T11:56:36.661Z"
    },
    "pricingTiers": [
      {
        "id": "45ff6ddd-8055-4927-9a40-a32ebc97645d",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1150,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.278Z",
        "updatedAt": "2026-11-16T10:20:02.278Z"
      },
      {
        "id": "8da37495-33d5-445b-9f80-816a5c11d482",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 600,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.278Z",
        "updatedAt": "2026-11-16T10:20:02.278Z"
      },
      {
        "id": "f1cee844-6163-463c-b5f9-e3ed3d7785ab",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 500,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.278Z",
        "updatedAt": "2026-11-16T10:20:02.278Z"
      },
      {
        "id": "200c1f68-8b73-405d-98c4-0e24b09225c8",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.278Z",
        "updatedAt": "2026-11-16T10:20:02.278Z"
      },
      {
        "id": "9861ee68-f525-41be-bff8-852d99d6c39a",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.278Z",
        "updatedAt": "2026-11-16T10:20:02.278Z"
      }
    ],
    "inclusions": [
      {
        "id": "a8a99e87-28bd-440e-9176-e10d6e2d1c0e",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "item": "Transportation",
        "sortOrder": 0
      },
      {
        "id": "3988ca9b-618d-4587-a0a9-c2a1436e2884",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "item": "Water and soft drinks",
        "sortOrder": 1
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [
      {
        "id": "07bbd7e0-2425-46bb-8654-d9211cd662ed",
        "tourId": "8ab3e9cc-c748-4641-ab14-b0b3f55749f8",
        "title": "Speedboat Route",
        "items": "[\"Doha Corniche\",\"West Bay skyline\",\"The Pearl Island (Porto Arabia)\"]",
        "sortOrder": 0
      }
    ],
    "images": []
  },
  {
    "id": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
    "title": "Grand Doha City Tour",
    "slug": "grand-doha-city-tour",
    "shortDesc": "A comprehensive tour of Doha covering all major landmarks with an English-speaking guide.",
    "description": "Experience the ultimate Doha sightseeing tour covering all the major landmarks and attractions of Qatar's vibrant capital. An English-speaking guide leads you through the city's most impressive sites, sharing fascinating stories and insights about Doha's rapid transformation from a quiet fishing village to a world-class metropolis.",
    "duration": null,
    "availability": null,
    "categoryId": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
    "coverImage": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 20,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.293Z",
    "updatedAt": "2026-11-16T11:56:36.832Z",
    "category": {
      "id": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
      "name": "City Tours",
      "slug": "city-tours",
      "description": "Discover the modern marvels and heritage of Doha",
      "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "sortOrder": 4,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.972Z",
      "updatedAt": "2026-11-16T11:56:36.661Z"
    },
    "pricingTiers": [
      {
        "id": "2585b420-41f2-4d86-aaca-9c94c5dd7a3d",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 850,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.293Z",
        "updatedAt": "2026-11-16T10:20:02.293Z"
      },
      {
        "id": "dbd0bf32-32da-4451-b123-68b7e326cc19",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 475,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.293Z",
        "updatedAt": "2026-11-16T10:20:02.293Z"
      },
      {
        "id": "66427527-ce41-418f-8468-dcf79a180aba",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 375,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.293Z",
        "updatedAt": "2026-11-16T10:20:02.293Z"
      },
      {
        "id": "b251049d-f594-45c9-bae7-dea6019bdb91",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.293Z",
        "updatedAt": "2026-11-16T10:20:02.293Z"
      },
      {
        "id": "db35688e-12eb-403f-bcd1-0b8bf3ae679f",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.293Z",
        "updatedAt": "2026-11-16T10:20:02.293Z"
      }
    ],
    "inclusions": [
      {
        "id": "5c5bf27b-82a5-474a-af8e-8704a8c996e6",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "e74e0a23-eb2f-49e5-918c-6d37b748502f",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "c6e7e137-e0f6-4d04-8223-32f8b5a92da7",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "e1b11358-9963-4a54-b0d8-a29dae8fe462",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "item": "Insurance",
        "sortOrder": 3
      }
    ],
    "exclusions": [
      {
        "id": "d70b7432-e70e-41e3-a1c9-af6568646737",
        "tourId": "ecf344d2-0d8e-4527-b681-5f9c181f55ed",
        "item": "Museum admission",
        "price": 50,
        "sortOrder": 0
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "4085dbd8-d1eb-49fa-a100-57c23c895020",
    "title": "North Of Qatar Tour (Historical Trip)",
    "slug": "north-of-qatar-tour",
    "shortDesc": "Explore the historic northern region of Qatar with lunch and an English-speaking guide.",
    "description": "Journey to the northern reaches of Qatar and discover the country's fascinating historical heritage. This tour takes you through ancient ruins, traditional villages, and historically significant sites that tell the story of Qatar's past. An English-speaking guide provides rich commentary throughout the trip, and a delicious lunch is included.",
    "duration": null,
    "availability": null,
    "categoryId": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
    "coverImage": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 21,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.307Z",
    "updatedAt": "2026-11-16T10:20:02.307Z",
    "category": {
      "id": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
      "name": "Cultural & Historical Tours",
      "slug": "cultural-historical-tours",
      "description": "Immerse yourself in Qatar's rich culture and heritage",
      "image": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
      "sortOrder": 5,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.984Z",
      "updatedAt": "2026-11-16T11:56:36.691Z"
    },
    "pricingTiers": [
      {
        "id": "4382792c-f501-4fba-b018-cdd0ccbebfd1",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1000,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.307Z",
        "updatedAt": "2026-11-16T10:20:02.307Z"
      },
      {
        "id": "774b2b1a-6dae-4fb5-b693-720d00b4d47a",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 525,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.307Z",
        "updatedAt": "2026-11-16T10:20:02.307Z"
      },
      {
        "id": "de3ec13d-139b-45ee-80f4-3696717d63da",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.307Z",
        "updatedAt": "2026-11-16T10:20:02.307Z"
      },
      {
        "id": "a27fd9cd-73a4-4da3-b1e6-153b53252f25",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.307Z",
        "updatedAt": "2026-11-16T10:20:02.307Z"
      },
      {
        "id": "2fa3ae8c-1133-4ae5-8cd4-7f3a2a26fe57",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.307Z",
        "updatedAt": "2026-11-16T10:20:02.307Z"
      }
    ],
    "inclusions": [
      {
        "id": "dfd644cb-9b39-4efe-9bd0-b03164b9b296",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "81631e84-2b00-4b64-886a-e2ef53cc02ed",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "fac7be44-6b4e-4234-beeb-833fb0a7158d",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "bdae85ac-29c8-4682-a415-c366029dbdbc",
        "tourId": "4085dbd8-d1eb-49fa-a100-57c23c895020",
        "item": "Lunch",
        "sortOrder": 3
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
    "title": "Cultural Tour",
    "slug": "cultural-tour",
    "shortDesc": "Discover Qatar's traditions, art, and living heritage with expert cultural guides.",
    "description": "Dive deep into Qatar's rich cultural tapestry on this immersive cultural tour. Visit traditional souqs, cultural centers, and heritage sites that showcase the country's traditions, arts, and way of life. An English-speaking guide shares insights into Qatari customs, hospitality, and the nation's journey from pearl diving to global prominence.",
    "duration": null,
    "availability": null,
    "categoryId": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
    "coverImage": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 22,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.321Z",
    "updatedAt": "2026-11-16T10:20:02.321Z",
    "category": {
      "id": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
      "name": "Cultural & Historical Tours",
      "slug": "cultural-historical-tours",
      "description": "Immerse yourself in Qatar's rich culture and heritage",
      "image": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
      "sortOrder": 5,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.984Z",
      "updatedAt": "2026-11-16T11:56:36.691Z"
    },
    "pricingTiers": [
      {
        "id": "20a6c31a-2a85-4726-936d-5a51a6734ffa",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1000,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.321Z",
        "updatedAt": "2026-11-16T10:20:02.321Z"
      },
      {
        "id": "5facae6d-bc64-4ab6-9210-0f40417f72fc",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 550,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.321Z",
        "updatedAt": "2026-11-16T10:20:02.321Z"
      },
      {
        "id": "6152dc18-9aca-4e9c-8fb3-77bfdf040473",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.321Z",
        "updatedAt": "2026-11-16T10:20:02.321Z"
      },
      {
        "id": "ade63ddf-675f-4e9a-89d1-d2e7c3508a30",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.321Z",
        "updatedAt": "2026-11-16T10:20:02.321Z"
      },
      {
        "id": "05afc622-e86b-4dcd-b034-05fb26f75621",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.321Z",
        "updatedAt": "2026-11-16T10:20:02.321Z"
      }
    ],
    "inclusions": [
      {
        "id": "68fcc7e2-196a-4f46-b6a2-eae41b58a812",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "0963c6c6-4515-41cd-801e-476d643db069",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "a2f8357e-1dd2-4cba-ad1b-1a73e9550bee",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "a30ae783-869c-4bbf-a7e6-7204f0114a90",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "item": "Insurance",
        "sortOrder": 3
      }
    ],
    "exclusions": [
      {
        "id": "87fdb4f0-6619-48c5-9bde-570b5898b380",
        "tourId": "9afa5c85-c5e2-4ca6-9b05-d83e0ae6b70b",
        "item": "Museum admission",
        "price": 50,
        "sortOrder": 0
      }
    ],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "453e5048-5fd7-4601-aaaf-deb1c4566659",
    "title": "West Coast Tour",
    "slug": "west-coast-tour",
    "shortDesc": "Explore Qatar's scenic western coastline with stunning views and cultural stops.",
    "description": "Discover the natural beauty and cultural treasures along Qatar's western coast. This scenic tour takes you through picturesque coastal landscapes, traditional fishing villages, and stunning viewpoints overlooking the Arabian Gulf. An English-speaking guide shares fascinating insights about the region's history and ecology.",
    "duration": null,
    "availability": null,
    "categoryId": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
    "coverImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 23,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.336Z",
    "updatedAt": "2026-11-16T10:20:02.336Z",
    "category": {
      "id": "9044e75a-0ed8-4f08-b4c3-41313407a5c7",
      "name": "City Tours",
      "slug": "city-tours",
      "description": "Discover the modern marvels and heritage of Doha",
      "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
      "sortOrder": 4,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.972Z",
      "updatedAt": "2026-11-16T11:56:36.661Z"
    },
    "pricingTiers": [
      {
        "id": "f7398778-3d72-40f9-ae62-9cac1b5ed31f",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 900,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.336Z",
        "updatedAt": "2026-11-16T10:20:02.336Z"
      },
      {
        "id": "f76c42af-df9d-4360-867b-f02f39d6373a",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 490,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.336Z",
        "updatedAt": "2026-11-16T10:20:02.336Z"
      },
      {
        "id": "370d11a7-60f0-4531-809f-e25e3851dd96",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 350,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.336Z",
        "updatedAt": "2026-11-16T10:20:02.336Z"
      },
      {
        "id": "b9635404-5c5d-4c29-ba98-fcedcefe2426",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 300,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.336Z",
        "updatedAt": "2026-11-16T10:20:02.336Z"
      },
      {
        "id": "bcbf3a08-a68f-4b7d-9661-ee75a6c6e1c1",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 260,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.336Z",
        "updatedAt": "2026-11-16T10:20:02.336Z"
      }
    ],
    "inclusions": [
      {
        "id": "b12bb01c-4256-437d-b2a2-ff97806a0d29",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "2fd0c728-b1f8-4969-95bc-a9edfab455b9",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "4b0b952d-e13e-4e3b-a18c-7e7ae5005558",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "217fee5b-cbfe-4848-8ce1-0f53489ba04c",
        "tourId": "453e5048-5fd7-4601-aaaf-deb1c4566659",
        "item": "Insurance",
        "sortOrder": 3
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
    "title": "North Of Qatar With Kayak Tour",
    "slug": "north-of-qatar-with-kayak-tour",
    "shortDesc": "Combine northern Qatar sightseeing with a mangrove kayaking adventure and lunch.",
    "description": "Experience the best of northern Qatar with this unique tour combining historical sightseeing and mangrove kayaking. Explore the northern region's heritage sites before paddling through serene mangrove forests in a guided kayaking session. An English-speaking guide accompanies you throughout, and a delicious lunch is included.",
    "duration": null,
    "availability": null,
    "categoryId": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
    "coverImage": "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 24,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.349Z",
    "updatedAt": "2026-11-16T12:00:53.311Z",
    "category": {
      "id": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
      "name": "Cultural & Historical Tours",
      "slug": "cultural-historical-tours",
      "description": "Immerse yourself in Qatar's rich culture and heritage",
      "image": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
      "sortOrder": 5,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.984Z",
      "updatedAt": "2026-11-16T11:56:36.691Z"
    },
    "pricingTiers": [
      {
        "id": "486f731b-0f67-463b-a7fa-1b3bb54861ff",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 1400,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.349Z",
        "updatedAt": "2026-11-16T10:20:02.349Z"
      },
      {
        "id": "ed40e176-cb93-4c13-ba2e-419a1871d57b",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 800,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.349Z",
        "updatedAt": "2026-11-16T10:20:02.349Z"
      },
      {
        "id": "8526d276-f300-439b-9454-7f854261a257",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 600,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.349Z",
        "updatedAt": "2026-11-16T10:20:02.349Z"
      },
      {
        "id": "435b16a8-bfda-4f3c-a65d-6e6285dc1f15",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 550,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.349Z",
        "updatedAt": "2026-11-16T10:20:02.349Z"
      },
      {
        "id": "a3143c20-c16a-4447-b932-0a8f2b008204",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 520,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.349Z",
        "updatedAt": "2026-11-16T10:20:02.349Z"
      }
    ],
    "inclusions": [
      {
        "id": "20f4c060-967f-4bd4-b245-ced6a1f5d0b2",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "9f713800-1fa6-4d86-8658-0a48fc7ba965",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "item": "Transportation",
        "sortOrder": 1
      },
      {
        "id": "f00eb410-e4ac-4cfd-8085-ff9f480196a6",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "item": "Mangrove kayaking",
        "sortOrder": 2
      },
      {
        "id": "6cffe8ec-6ecc-4eef-a1c7-cf4e372ee850",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "item": "Water and soft drinks",
        "sortOrder": 3
      },
      {
        "id": "5e5909a3-b673-4ff9-b7f9-f68ff5248daa",
        "tourId": "36a6138f-8c5b-42cd-8d5d-63bcb794fd35",
        "item": "Lunch",
        "sortOrder": 4
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  },
  {
    "id": "237cc891-43de-46ae-b607-40889a01b1d3",
    "title": "Camel Race Tour",
    "slug": "camel-race-tour",
    "shortDesc": "Witness the thrilling traditional camel races in a 4x4 vehicle with a professional guide.",
    "description": "Experience one of Qatar's most exciting traditional sports – camel racing. Watch as magnificent camels thunder down the racetrack in this uniquely Qatari spectacle. Travel in a comfortable 4x4 vehicle alongside the racetrack to follow the action. An English-speaking guide explains the sport's traditions, the training of the camels, and its cultural significance in Qatari heritage.",
    "duration": null,
    "availability": null,
    "categoryId": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
    "coverImage": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200",
    "isActive": true,
    "isFeatured": false,
    "sortOrder": 25,
    "pricingType": "per_person",
    "minPersons": 1,
    "maxPersons": 5,
    "createdAt": "2026-11-16T10:20:02.362Z",
    "updatedAt": "2026-11-16T11:56:36.843Z",
    "category": {
      "id": "0e89c38e-5f0b-43a3-95e4-bc84868c43db",
      "name": "Cultural & Historical Tours",
      "slug": "cultural-historical-tours",
      "description": "Immerse yourself in Qatar's rich culture and heritage",
      "image": "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800",
      "sortOrder": 5,
      "isActive": true,
      "createdAt": "2026-11-16T10:20:01.984Z",
      "updatedAt": "2026-11-16T11:56:36.691Z"
    },
    "pricingTiers": [
      {
        "id": "5a40a61b-b04e-4848-8cd0-64de7ff8a350",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "minPersons": 1,
        "maxPersons": 1,
        "pricePerPerson": 850,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.362Z",
        "updatedAt": "2026-11-16T10:20:02.362Z"
      },
      {
        "id": "d1c5f146-d590-4467-8078-df4dc56b6455",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "minPersons": 2,
        "maxPersons": 2,
        "pricePerPerson": 625,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.362Z",
        "updatedAt": "2026-11-16T10:20:02.362Z"
      },
      {
        "id": "f7e740e3-d52f-4736-a7c9-c266466294fd",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "minPersons": 3,
        "maxPersons": 3,
        "pricePerPerson": 580,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.362Z",
        "updatedAt": "2026-11-16T10:20:02.362Z"
      },
      {
        "id": "5e6177e5-cdb0-4fdd-97f5-393a2b30cbcd",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "minPersons": 4,
        "maxPersons": 4,
        "pricePerPerson": 550,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.362Z",
        "updatedAt": "2026-11-16T10:20:02.362Z"
      },
      {
        "id": "d4df07f1-f052-48d1-b818-3b84b90ba442",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "minPersons": 5,
        "maxPersons": 5,
        "pricePerPerson": 525,
        "isTotal": false,
        "createdAt": "2026-11-16T10:20:02.362Z",
        "updatedAt": "2026-11-16T10:20:02.362Z"
      }
    ],
    "inclusions": [
      {
        "id": "81d60a66-8b48-4741-b79c-3ba9f04c5b4d",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "item": "English-speaking guide",
        "sortOrder": 0
      },
      {
        "id": "1437961e-e4cb-4b45-952d-2202f1b9de2e",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "item": "4x4 transportation",
        "sortOrder": 1
      },
      {
        "id": "8b41b8fe-764e-4c69-a056-5713e43582b4",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "item": "Water and soft drinks",
        "sortOrder": 2
      },
      {
        "id": "2e153f04-a71f-4d04-9303-11a9180e04f4",
        "tourId": "237cc891-43de-46ae-b607-40889a01b1d3",
        "item": "Insurance",
        "sortOrder": 3
      }
    ],
    "exclusions": [],
    "addons": [],
    "itineraryItems": [],
    "images": []
  }
] as any) as Tour[];
