const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1);

const seedUsers = num => {
    const users = new Array(num).fill('');
    
    for (let i in users) {
        users[i] = {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            hashedPassword: bcrypt.hashSync(faker.internet.password()),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        };
    };
    
    return users;
}

const seedSpots = num => {
    const spots = new Array(num).fill('');
    
    let id = 1;
    for (let i in spots) {
        spots[i] = {
            ownerId: id,
            address: faker.address.streetAddress(),
            city: faker.address.cityName(),
            state: faker.address.state(),
            country: faker.address.country(),
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
            name: faker.word.adjective() + ' ' + faker.word.noun({length: { min: 5, max: 8}}),
            description: faker.lorem.paragraph(),
            price: faker.datatype.number({ min: 50, max: 300}),
            zipcode: faker.datatype.number({min: 91000, max: 98900}),
            maxGuests: rNum(10),
            cleaningFee: rNum(40),
            amenities: 'Amenity1,Amenity2,Amenity3'
        };
        id++;
    };
    
    return spots;
}

const homeImages = [
    'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    'https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg',
    'https://img.jamesedition.com/listing_images/2022/09/15/14/05/21/126e82b2-847e-49cd-afa6-09cd5891aba6/je/1000x620xc.jpg',
    'https://lid.zoocdn.com/645/430/752249ae78ec9870355c65f46dae15003ee54744.jpg',
    'https://casalasdunas.com/img/villa-new-build-pedreguer-la-solana_317319_md.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_eGD3K7VdkD1kKoqynF6ZrYnSE4dF7nmh0k68edtKUQwYKJ0LrPhvrKQ2vIZ89j4QyR7VWqe1QBU&usqp=CAU&ec=48665701',
    'https://img.jamesedition.com/listing_images/2022/07/27/11/50/32/9b498007-4f77-4dd3-a426-c1022f11cc22/je/1000x620xc.jpg',
    'https://sierra-public.azureedge.net/b1a3a078-b40f-4a31-b46d-5c6edeac6241.jpg',
    'https://res.akamaized.net/domain/image/upload/t_web/v1551655429/8_Wentworth_Street_Dover_Heights_NSW_4_hjgrfp.jpg',
    'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2F6x6c2esy86r7mgaqasys7w5ve7i215&option=N&h=472&permitphotoenlargement=false',
    'https://4.bp.blogspot.com/--nLbUgFXt8c/TijhzafwaYI/AAAAAAAAEbI/EQYUbHtZD8s/s1600/pezula_150711_01-940x624.jpg',
    'https://i.pinimg.com/736x/bf/f2/15/bff2151b6df9b4a85c688eb5fde600b8--keep-dreaming-my-dream-house.jpg',
    'https://ssl.cdn-redfin.com/photo/45/mbphoto/282/genMid.SB22029282_1_1.jpg',
    'https://mediavault.point2.com/Image/Listing/7582297813_large.jpg',
    'https://ssl.cdn-redfin.com/photo/40/mbphoto/579/genMid.23-239579_0.jpg',
    'https://ap.rdcpix.com/84f6eb86c0a1ce7bbd4a3d047f792864l-m3791575985od-w480_h360_x2.jpg',
    'https://www.hollywoodreporter.com/wp-content/uploads/2023/03/image_h_01-H-2023.jpg?w=1296',
    'https://ca-times.brightspotcdn.com/dims4/default/8370ee3/2147483647/strip/true/crop/1280x720+0+0/resize/1200x675!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F07%2F01%2Ffeab7c5c67457994696930d1a908%2Fla-nleitereg-1484750478-snap-photo',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmIwhVd90FrUTvvArQLM4eTn71hSHIzdL-UZOePbtcpPRakBmwaxZ70dW787zm9XjKWs1_gjSSoA&usqp=CAU&ec=48665701',
    'https://www.gannett-cdn.com/presto/2021/01/11/NPBD/2732f93f-e683-41da-8a77-35e11c50bb8c-PBN_535_N_County_Rd_Pool_SmRes.jpg?crop=1315,740,x0,y0&width=660&height=372&format=pjpg&auto=webp',
    'https://i.insider.com/4ca48ef67f8b9acc408e0d00?width=600&format=jpeg&auto=webp',
    'https://cdn.houseplansservices.com/content/fmphaegc3dtluuum2epltfacfe/w991x660.jpg?v=9',
    'https://ap.rdcpix.com/9332998e15d5ccec069a00940a6d8764l-m153966710od-w480_h360_x2.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQeL5ZRaNujUtbOIBqFqDafWMfArQRb91aIogKvNqWSg&usqp=CAU&ec=48665701',
    'https://ap.rdcpix.com/fae44d073a2f27e587d995c68c146a0fl-m1741664240od-w480_h360_x2.jpg',
    'https://photos.zillowstatic.com/fp/88a7962d4f1d544de1ed906869e26fb5-cc_ft_576.jpg',
    'https://photos.zillowstatic.com/fp/b459bc226786bc9066c8f2cffcb8f25a-p_e.jpg',
    'https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-house-planssmall-modern-1.webp',
    'https://i.pinimg.com/600x315/7d/e0/f0/7de0f0cbdd1d00dcfb6dfa31f1f374fc.jpg',
    'https://i.pinimg.com/736x/e6/fc/83/e6fc83d65764b69eba168107199c718e.jpg',
    'https://d1ja9tyo8nbkbc.cloudfront.net/51381436_S0416/S0416/S0416-R0100/985197/985197-3.jpg?version=1681237942&width=640',
    'https://assets.newatlas.com/dims4/default/3d94d96/2147483647/strip/true/crop/4461x2974+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F38%2Fcc%2Fcb4aa02c4b0ab31f1e5a126d8c9b%2F01-5563-gawthorneshut-caarch-ambercreative.jpg',
    'https://photos.zillowstatic.com/fp/bb830294018e1f43668e2c6b8fed3c68-cc_ft_1152.jpg',
    'https://www.housedigest.com/img/gallery/15-tiny-houses-that-are-incredibly-charming/intro-1635792111.jpg'
]

const seedSpotImages = num => {
    const spotImages = new Array(num).fill('');
    
    let id = 1;
    for (let i in spotImages) {
        spotImages[i] = {
            spotId: id,
            url: homeImages[rNum(homeImages.length - 1)],
            preview: true
        };
        id++;
    };
    
    return spotImages;
}

const seedReviews = num => {
    const reviews = new Array(num).fill('');
    
    let id = 1;
    for (let i in reviews) {
        reviews[i] = {
            spotId: id,
            userId: rNum(100),
            review: faker.lorem.paragraph(),
            stars: rNum(5)
        };
        id++;
    };
    
    return reviews;
}

const seedReviewImages = num => {
    const reviewImages = new Array(num).fill('');
    
    let id = 1;
    for (let i in reviewImages) {
        reviewImages[i] = {
            reviewId: id,
            url: faker.image.imageUrl()
        };
        id++;
    };
    
    return reviewImages;
}

const seedBookings = num => {
    const bookings = new Array(num).fill('');
    
    let id = 1;
    for (let i in bookings) {
        bookings[i] = {
            spotId: id,
            userId: rNum(5),
            startDate: faker.date.between('2023-02-01', '2023-02-03'),
            endDate: faker.date.between('2023-02-04', '2023-02-07')
        };
        id++;
    };
    
    return bookings;
}


module.exports = {
    seedUsers,
    seedSpots,
    seedSpotImages,
    seedReviews,
    seedReviewImages,
    seedBookings
}
