import "./Search.css"
import React, {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";

const Search = (props)=>{

    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e)=>{
        setSearchTerm(e.target.value);
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
                <InputGroup className="mb-3">
                    <Form.Control type="text" placeholder = "Search recipes" value={searchTerm} onChange={handleInputChange}/>
                    <Button variant="outline-secondary" onClick={performSearch}>Search</Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default Search;