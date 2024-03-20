import React, { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap";
import './styles.scss'
import { useTranslation } from "react-i18next";
import { GetArea } from "../../services/AreaApi";
import { useLanguage } from "../../LanguageContext";

const sampleAreas = [
    {
        'name_en': 'North Vietnam',
        'name_vi': 'Miền Bắc',
        'url': '/destination/north-vietnam',
        'id': 0
    },
    {
        'name_en': 'Central Vietnam',
        'name_vi': 'Miền Trung',
        'url': '/destination/central-vietnam',
        'id': 1
    },
    {
        'name_en': 'South Vietnam',
        'name_vi': 'Miền Nam',
        'url': '/destination/south-vietnam',
        'id': 2
    }
]

const SearchBar = ({query}) => {
    const [areas, setAreas] = useState([]);
    const { language } = useLanguage();

    const [keywords, setKeywords] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [area, setArea] = useState('')

    useEffect(() => {
        if (query) {
            setKeywords(query.keywords);
            setFromDate(query.from);
            setToDate(query.to);
            setArea(query.area);
        }
    }, [query])

    useEffect(() => {
        const fetchArea = async () => {
            try {
                setAreas(await GetArea());
            } catch (error) {
                console.error('Error fetching all areas data:', error);
            }
        };
    
        fetchArea()
    
        if (areas.length == 0) {
            setAreas(sampleAreas);
        }
    }, []);


    const [fromDateType, setFromDateType] = useState('text');
    const [toDateType, setToDateType] = useState('text');

    const handleFocusFrom = () => setFromDateType('date');
    const handleBlurFrom = () => setFromDateType('text');

    const handleFocusTo = () => setToDateType('date');
    const handleBlurTo = () => setToDateType('text');


    const { t } = useTranslation();
    return (
        <section className="search-tour-section search-browser-web" id="sessionSearchWebTour">
            <Container>
                <Row>
                    <form id="searchFormKiritmWebTour" method="get" role="form" action="/search">
                        <Col xs={12}>
                            <Row>
                                <Col md={4} sm={12}>
                                    <div className="searchFilterQuery search-box-web-tour">
                                        <input onInput={(event) => setKeywords(event.target.value)} value={keywords} type="text" className="form-control" name="keywords" id="inputSearchWebTour" autocomplete="off" placeholder="Search a tour..."/>
                                        <div className="input-group-addon">
                                            <span className="fa fa-search"></span>
                                        </div>
                                        <div id="showSuggestionWebTour" className="suggestions hidden-cls">
                                            <ul id="suggestionSearchWebTour" className="ul-suggestion">
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={6} sm={12}>
                                    <div className="row">
                                        <div className="col-sm-4 col-xs-12">
                                            <div id="fromDateTypeSearchBoxWebTour" className="input-group date ed-datepicker filterDate">
                                                <input onInput={(event) => setFromDate(event.target.value)} value={fromDate} type={fromDateType} onFocus={handleFocusFrom} onBlur={handleBlurFrom} className="form-control" name="from" placeholder="From" autocomplete="off" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div id="toDateTypeSearchBoxWebTour" className="input-group date ed-datepicker filterDate">
                                                <input onInput={(event) => setToDate(event.target.value)} value={toDate} type={toDateType} onFocus={handleFocusTo} onBlur={handleBlurTo} className="form-control" name="to" autocomplete="off" placeholder="To" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="form-group tour-type">
                                                <div className="bookingDrop">
                                                    <Form.Select onChange={(event) => setArea(event.target.value)} value={area} name="area" className="sbHolder">
                                                        <option value="">All</option>
                                                        {
                                                            areas.map(area => (
                                                                <option value={area.id}>{language === 'en' ? area.name_en : area.name_vi}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={2} sm={12}>
                                    <button type="submit" className="main-box btn btn-block buttonCustomPrimary">
                                        Search
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </form>

                </Row>
            </Container>
        </section>
    )
}

export default SearchBar;