// product.js:

const products = [
  
    {
      "name": " Padlock with 4 Keys 7 Lever Lock",
      "description": "A majestic peacock-themed door handle with exquisite detailing, adding a royal touch to any door.",
      "price": 699,
      "discountPrice": 800,
      "countInStock": 12,
      "category": "traditional-locks",
      "brand": "Royal Locks",
      "sizes": ["Standard"],
      "colors": ["Silver","Gold"],
      "collection": "Antique Series",
      "material": "Brass",
      "sku": "PDH-001",   // ✅ Unique SKU
      "images": [
        {
          "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740997984/Traditional%20locks/layqgpa51oye9h5hjls3.jpg",
          "altText": " Padlock with 4 Keys 7 Lever Lock"
        }
      ],
      "rating": 4.7,
      "numReviews": 78
    },
    {
      "name": "Foora Big Size 8-Lever Padlock",
      "description": "A refined version of the classic peacock door handle with a stunning silver finish, perfect for a luxurious look.",
      "price": 7300,
      "discountPrice": 7400,
      "countInStock": 10,
      "category": "traditional-locks",
      "brand": "Royal Locks",
      "sizes": ["Standard"],
      "colors": ["Gold"],
      "collection": "Antique Series",
      "material": "Brass",
      "sku": "PDH-002",   // ✅ Different unique SKU
      "images": [
        {
          "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740997984/Traditional%20locks/vudralnn3axgz9rziguw.jpg",
          "altText": "Foora Big Size 8-Lever Padlock"
        }
      ],
      "rating": 4.8,
      "numReviews": 85
    },
  
  
  {
    "name": "Master Lock 3LF Laminated Steel Padlock",
    "description": "Beautiful antique-style peacock door handle with intricate detailing.",
    "price": 2100,
    "discountPrice": 2200,
    "countInStock": 15,
    "category": "Smart-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black","Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-003",   // ✅ Added unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998022/Smart%20locks/abqs9uy9lycdv9cphhge.jpg",
        "altText": "Master Lock 3LF Laminated Steel Padlock"
      }
    ],
    "rating": 3.7,
    "numReviews": 85
  },
  {
    "name": "Fayleeko 4-Digit Combination smartlock",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 1555,
    "discountPrice": 2999,
    "countInStock": 15,
    "category": "Smart-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black","Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-004",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998023/Smart%20locks/v1jjlpc78pyzcwqm86gh.jpg",
        "altText": "Fayleeko 4-Digit Combination Padlock"
      }
    ],
    "rating": 5.0,
    "numReviews": 100
  },
  {
    "name": "Antique Style Lever Handle Lock",
    "description": "Beautiful antique-style peacock door handle with intricate detailing.",
    "price": 1900,
    "discountPrice": 2400,
    "countInStock": 15,
    "category": "smart-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black", "Silver","Gold"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-005",   // ✅ Added unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998022/Smart%20locks/rrs81h2sdmksynd0afih.jpg",
        "altText": "Antique Style Lever Handle Lock"
      }
    ],
    "rating": 3.3,
    "numReviews": 50
  },
  {
    "name": " Smart Digital Door Lock",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 3500,
    "discountPrice": 4300,
    "countInStock": 15,
    "category": "special-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black", "Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-006",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998057/Specilised%20Locks/m80m6qvakskeeag9e9ow.jpg",
        "altText": " Smart Digital Door Lock"
      }
    ],
    "rating": 3.8,
    "numReviews": 65
  },
  {
    "name": "Royal silver Door Handle Lock",
    "description": "Beautiful antique-style peacock door handle with intricate detailing.",
    "price": 8500,
    "discountPrice": 9500,
    "countInStock": 15,
    "category": "smart-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": [" Silver"], 
    "collection": "Vintage Series",
    "material": "silver",
    "sku": "PDH-007",   // ✅ Added unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998022/Smart%20locks/xopq8ijtpu9fn7fmthog.jpg",
        "altText": "Royal silver Door Handle Lock"
      }
    ],
    "rating": 4.1,
    "numReviews": 82
  },
  {
    "name": "Access Control lock ",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 3500,
    "discountPrice": 4000,
    "countInStock": 15,
    "category": "Specialized-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" , " Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-008",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998057/Specilised%20Locks/xok5ohmseby7e1a2u5am.jpg",
        "altText": "Access Control lock"
      }
    ],
    "rating": 4.2,
    "numReviews": 55
  },
  {
    "name": "Foora Round 75mm Big Size Lock with 5 Keys, Double Locking",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 1900,
    "discountPrice": 1900,
    "countInStock": 15,
    "category": "Specialized-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" , " Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-009",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998057/Specilised%20Locks/bkbe8s5pighbspnwuxtn.jpg",
        "altText": "Foora Round 75mm Big Size Lock with 5 Keys, Double Locking"
      }
    ],
    "rating": 4.1,
    "numReviews": 65
  },
  {
    "name": "Foora 65mm 8-Lever Round Padlock",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 1200,
    "discountPrice": 1300,
    "countInStock": 15,
    "category": "traditional-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": [" Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-010",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740997984/Traditional%20locks/vtq27jnu8ddnbvxaxhv1.jpg",
        "altText": "Foora 65mm 8-Lever Round Padlock"
      }
    ],
    "rating": 3.2,
    "numReviews": 14
  },
  {
    "name": "Imperial Crest Royal Mortise Handle Set",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 340,
    "discountPrice": 440,
    "countInStock": 15,
    "category": "traditional-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Brass", "Gold"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-011",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740997983/Traditional%20locks/eqgq8hxyn2cnbrsb8qs1.jpg",
        "altText": "Imperial Crest Royal Mortise Handle Set"
      }
    ],
    "rating": 4.3,
    "numReviews": 25
  },
  {
    "name": "Peacock Design Door Handle - Silver Edition",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 2500,
    "discountPrice": 2999,
    "countInStock": 15,
    "category": "traditional-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Brass", "Gold"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-012",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740997983/Traditional%20locks/dobpxe1pi65rq9usvyrr.jpg",
        "altText": "Peacock Design Door Handle - Silver"
      }
    ],
    "rating": 3.6,
    "numReviews": 69
  },
  {
    "name": "TuyaGuard NeoTouch E-Latch",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 5500,
    "discountPrice": 6500,
    "countInStock": 15,
    "category": "Specilized-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" , "Mat black"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-013",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998056/Specilised%20Locks/un0ga0xx7vdm78fh5adm.jpg",
        "altText": "TuyaGuard NeoTouch E-Latch"
      }
    ],
    "rating": 3.8,
    "numReviews": 68
  },
  {
    "name": "ViviLock OrbTouch X5",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 5800,
    "discountPrice": 6200,
    "countInStock": 15,
    "category": "Smart-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" ], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-014",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998056/Specilised%20Locks/szuawyqwfvqao2kgvzmw.jpg",
        "altText": "ViviLock OrbTouch X5r"
      }
    ],
    "rating": 2.6,
    "numReviews": 23
  },
  {
    "name": "CodeLine LinearPro 12",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 4500,
    "discountPrice": 5400,
    "countInStock": 15,
    "category": "Smart-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" , " Silver"], 
    "collection": "Vintage Series",
    "material": "STEEL",
    "sku": "PDH-015",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998056/Specilised%20Locks/qfmtr9ynbdnyucwyd0mz.jpg",
        "altText": "CodeLine LinearPro 12"
      }
    ],
    "rating": 2.8,
    "numReviews": 16
  },
  {
    "name": "Cylinder Fingerprint Smart Lock",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 9850,
    "discountPrice": 10300,
    "countInStock": 15,
    "category": "Specialized-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" , " Silver"], 
    "collection": "Vintage Series",
    "material": "STEEL",
    "sku": "PDH-016",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998057/Specilised%20Locks/zbugks95n4qk4jyu4337.jpg",
        "altText": "Cylinder Fingerprint Smart Lock"
      }
    ],
    "rating": 2.8,
    "numReviews": 30
  },
  {
    "name": "Aurus Touch Keypad",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 3900,
    "discountPrice": 4300,
    "countInStock": 15,
    "category": "smart-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" , " Silver"], 
    "collection": "Vintage Series",
    "material": "steel",
    "sku": "PDH-017",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1740998056/Specilised%20Locks/xgxqldxupntkgouife4b.jpg",
        "altText": "Aurus Touch Keypad"
      }
    ],
    "rating": 1.3,
    "numReviews": 2
  },
  {
    "name": "Twin Gold Combo Locks",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 580,
    "discountPrice": 680,
    "countInStock": 15,
    "category": "traditional-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Gold", "Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-018",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1744973845/padlock_3_gltc4d.jpg",
        "altText": "Twin Gold Combo Locks"
      }
    ],
    "rating": 2.9,
    "numReviews": 20
  },
  {
    "name": "Flat Silver Key Lock",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 999,
    "discountPrice": 1300,
    "countInStock": 15,
    "category": "traditional-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": [" Silver"], 
    "collection": "Vintage Series",
    "material": "steel",
    "sku": "PDH-019",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1744973811/cam_lock_rmhrom.jpg",
        "altText": "Flat Silver Key Lock"
      }
    ],
    "rating": 4.9,
    "numReviews": 25
  },
  {
    "name": "ABUS Combination + Key Override",
    "description": "A beautiful antique-style peacock door handle with silver finishing.",
    "price": 2500,
    "discountPrice": 2999,
    "countInStock": 15,
    "category": "traditional-locks",
    "brand": "Royal Locks",
    "sizes": ["Standard"], 
    "colors": ["Black" , " Silver"], 
    "collection": "Vintage Series",
    "material": "Brass",
    "sku": "PDH-020",   // ✅ Different unique SKU
    "images": [
      {
        "url": "https://res.cloudinary.com/daegmmbak/image/upload/v1744973844/padloack_4_ssa8il.webp",
        "altText": "ABUS Combination + Key Override"
      }
    ],
    "rating": 3.9,
    "numReviews": 45
  },
];
module.exports = products;
