import React from 'react'
import Banner from '../../components/Banner'
import destination from '../../images/scene.jpg'
import { DestinationSection } from '../../components/DestinationSection'

const description = "Embark on a journey with us and let Vietnam's beauty unfold before you. Your dream destination is just a click away, promising memories that will last a lifetime. Start exploring today!"

const data = [
    {
        'title': 'North Vietnam',
        'destinations': [
            {
                'name': 'Hanoi',
                'numTours': 8,
                'image': 'https://ik.imagekit.io/tvlk/blog/2017/06/kham-pha-cac-dia-diem-du-lich-o-ha-noi-ma-ban-khong-the-bo-qua-3.jpg?tr=dpr-2,w-675'
            },
            {
                'name': 'Halong Bay',
                'numTours': 4,
                'image': 'https://travelhalong.com.vn/UserFiles/images/halong-bay.jpg'
            }
        ]
    },
    {
        'title': 'Central Vietnam',
        'destinations': [
            {
                'name': 'Phong Nha - Ke Bang',
                'numTours': 2,
                'image': 'https://image.nhandan.vn/w800/Uploaded/2023/dwkoudxkedwwyqdw/2023_06_30/hang-son-doong-963.jpg'
            },
            {
                'name': 'Nha Trang',
                'numTours': 4,
                'image': 'https://static.vinwonders.com/production/nha-trang-o-dau-1.jpg'
            }
        ]
    },
    {
        'title': 'South Vietnam',
        'destinations': [
            {
                'name': 'Sala Park',
                'numTours': 1,
                'image': 'https://seenee.vn/wp-content/uploads/2022/09/cong-vien-khu-do-thi-sala-3.jpg'
            },
        ]
    },
]

const Destination = () => {
    return (
        <>
            <Banner image={destination} title={"Our destinations"} description={description}/>
            <DestinationSection data={data}/>
        </>
    )
}

export default Destination;