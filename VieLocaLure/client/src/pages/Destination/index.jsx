import React, { useState } from 'react'
import Banner from '../../components/Banner'
import destination from '../../images/scene.jpg'
import { DestinationSection } from '../../components/DestinationSection'
import { GetArea } from '../../services/AreaApi'
import { GetProvince } from '../../services/ProvinceApi'

const description = "Embark on a journey with us and let Vietnam's beauty unfold before you. Your dream destination is just a click away, promising memories that will last a lifetime. Start exploring today!"

const sampleData = [
    {
        'area': 'North Vietnam',
        'provinces': [
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
        'area': 'Central Vietnam',
        'provinces': [
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
        'area': 'South Vietnam',
        'provinces': [
            {
                'name': 'Sala Park',
                'numTours': 1,
                'image': 'https://seenee.vn/wp-content/uploads/2022/09/cong-vien-khu-do-thi-sala-3.jpg'
            },
        ]
    },
]

const Destination = () => {
    const [data, setData] = useState([]);

    const fetchDestination = async () => {
        try {
            const areas = await GetArea();
            areas.map(async (area) => {
                const areaId = area.id;
                const provinces = await GetProvince({isFilter: true, key: 'area', value: areaId});
                area.provinces = provinces
            })
            setData(areas);
        } catch (error) {
            console.error('Error fetching description data:', error);
        }
    };

    fetchDestination();
    if (data.length == 0) {
        setData(sampleData)
    }

    return (
        <>
            <Banner image={destination} title={"Our destinations"} description={description}/>
            <DestinationSection data={data}/>
        </>
    )
}

export default Destination;