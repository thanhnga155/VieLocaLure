import React from "react"
import { Col, Container, Row } from "react-bootstrap";
import './styles.scss'
import { useTranslation } from "react-i18next";

const SearchBar = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <Row>
                <Col sm={{ span: 8, offset: 2 }} xs={12}>
                    <form>
                        <input type="text" class="textbox" placeholder={t(('homepage.search'))} />
                        <i className="search-button fa fa-search" />
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchBar;