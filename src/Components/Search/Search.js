import "./Search.css"
import React, {useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";

const Search = (props)=>{

    const [searchTerm, setSearchTerm] = useState("");
    const[formSubmit, setFormSubmit] = useState(false);

    const handleInputChange = (e)=>{
        setSearchTerm(e.target.value);
    }

    const handleKeyDown = (e)=>{
        if(e.key === 'Enter'){
            e.preventDefault();
            if(!searchTerm){
                alert("You need to enter a search query")
            }
        }
    }

    const resetInputs = () =>{
        setSearchTerm("");
    }

    const performSearch = (e)=>{
        e.preventDefault();
        props.search(searchTerm);
        resetInputs();
    }

    return(
        <div className="search">
            <Form>
                <Row className="align-items-center">
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" placeholder = "Search recipes" value={searchTerm} aria-label= "Search-recipes"
                                          onKeyDown={handleKeyDown} onChange={handleInputChange}/>
                            <Button size="lg"  variant="outline-secondary" type="submit" onClick={performSearch}>Search</Button>
                        </InputGroup>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}

export default Search;