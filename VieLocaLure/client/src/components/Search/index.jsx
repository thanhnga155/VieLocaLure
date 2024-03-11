import React from "react"
import { Col, Container, Form, Row } from "react-bootstrap";
import './styles.scss'
import { useTranslation } from "react-i18next";

const SearchBar = () => {
    const { t } = useTranslation();
    return (
        <section className="search-tour-section search-browser-web" id="sessionSearchWebTour">
            <Container>
                <Row>
                    <form id="searchFormKiritmWebTour" method="get" role="form" action="/tim-kiem-tour">
                        <Col xs={12}>
                            <Row>
                                <Col md={4} sm={12}>
                                    <div className="searchFilterQuery search-box-web-tour">
                                        <input type="text" className="form-control" name="search" id="inputSearchWebTour" autocomplete="off" placeholder="Search a tour..."/>
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
                                            <div id="fromDateSearchBoxWebTour" className="input-group date ed-datepicker filterDate">
                                                <input type="datetime-local" className="form-control" name="from" placeholder="Từ ngày" autocomplete="off" value="" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div id="toDateSearchBoxWebTour" className="input-group date ed-datepicker filterDate">
                                                <input type="datetime-local" className="form-control" name="to" autocomplete="off" placeholder="Đến ngày" value="" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 col-xs-12">
                                            <div className="form-group tour-type">
                                                <div className="bookingDrop">
                                                    <Form.Select className="sbHolder">
                                                        <option>All</option>
                                                        <option value="1">North Vietnam</option>
                                                        <option value="2">Central Vietnam</option>
                                                        <option value="3">South Vietnam</option>
                                                    </Form.Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={2} sm={12}>
                                    <button type="submit" className="main-box btn btn-block buttonCustomPrimary">
                                        Tìm kiếm
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