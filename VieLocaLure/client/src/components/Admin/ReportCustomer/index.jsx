import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { GetReportCustomer } from "../../../services/StatisticsApi";
import Chart from 'chart.js/auto'; // do not delete

const columns = [
    {
        field: 'timeline', 
        width: 300, 
        align: 'center', 
        headerAlign: 'center', 
        renderHeader: () => (
            <strong>
            {'Date'}
            </strong>
        ),
    },
    {
        field: 'bookings',
        width: 300, 
        align: 'center',
        headerAlign: 'center', 
        renderHeader: () => (
            <strong>
            {'Bookings '}
            </strong>
        ),
    },
    {
        field: 'paid',
        width: 300, 
        align: 'center',
        headerAlign: 'center', 
        renderHeader: () => (
            <strong>
            {'Paid Money'}
            </strong>
        ),
    },
];

const reportSample = [
	{"timeline": "January", "bookings": 120, "paid": 24000},
    {"timeline": "February", "bookings": 150, "paid": 30000},
    {"timeline": "March", "bookings": 180, "paid": 36000},
    {"timeline": "April", "bookings": 130, "paid": 26000},
    {"timeline": "May", "bookings": 170, "paid": 34000},
    {"timeline": "June", "bookings": 160, "paid": 32000},
    {"timeline": "July", "bookings": 190, "paid": 38000},
    {"timeline": "August", "bookings": 200, "paid": 40000},
    {"timeline": "September", "bookings": 110, "paid": 22000},
    {"timeline": "October", "bookings": 140, "paid": 28000},
    {"timeline": "November", "bookings": 125, "paid": 25000},
    {"timeline": "December", "bookings": 155, "paid": 31000}
]


const ReportCustomer = () => {
    const [reportData, setReportData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const fetchData = async (option, startDate, endDate) => {
        try {
            const data = await GetReportCustomer(option, startDate, endDate);
            setReportData(data);
        }
        catch (e) {
            console.log('Error fetch report tour data', e);
        }
    }

    const getChartData = (report) => {
        const label = report.map(d => d.timeline);
        const booking = report.map(d => d.bookings);
        const dict = {
            labels: label,
            datasets: [
                {
                    label: "Bookings",
                    data: booking
                },
            ]
        } 
        return dict
    }

    const getData = (selectedOption, startDate, endDate) => {
        fetchData(selectedOption, startDate, endDate);

        if (reportData.length === 0) {
            setReportData(reportSample);
        }
    }

    useEffect(() => {
        getData();
    }, [reportData]);

    const handleOptionChange = (event) => {
        const option = Number(event.target.value);
        setSelectedOption(option);
        getData(option);
    };

    const handleCustomDate = () => {
        getData(4, startDate, endDate);
    }


    return (
        reportData.length > 0 &&
        <Container>
            <Row className="my-5">
                <Col>
                    <h5>Booking Volumn</h5>
                    <Bar data={getChartData(reportData)}/>
                </Col>
            </Row>
            <Row className="my-3">
                <p className="mt-5"></p>
                <Col sm={4}>
                    <select className="form-select" value={selectedOption} onChange={handleOptionChange}>
                        <option value="1">Last 12 month</option>
                        <option value="2">This month</option>
                        <option value="3">This week</option>
                        <option value="0">All</option>
                    </select>
                </Col>
                <Col sm={8}>
                    <span> Or </span>
                </Col>
                <Col sm={4} className="mt-1">
                    <label>
                            Start date:
                    </label>
                    <Form.Control
                        type="date"
                        name="start-date"
                        placeholder="DateRange"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Col>
                <Col sm={4} className="mt-1">
                    <label>
                            End date:
                    </label>
                    <Form.Control
                        type="date"
                        name="end-date"
                        placeholder="DateRange"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Col>
                <Col sm={4} className="mt-4">
                    <Button onClick={handleCustomDate} className='btn btn-success'>Check</Button>
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <div style={{ marginBottom: '10px', width: '100%', position: 'relative' }}>                         
                        <DataGrid
                            rows={reportData}   
                            getRowId={(row) => row.timeline}   
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 15 },
                                },
                            }}
                            pageSizeOptions={[15, 30]}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ReportCustomer;