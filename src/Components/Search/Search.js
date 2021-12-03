import "./Search.css"
import React, {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";

const Search = (props)=>{

    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e)=>{
        setSearchTerm(e.target.value);
    }

    const handleKeyDown = (e)=>{
        if(e.key === 'Enter'){
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
            <Form className="d-flex">
                <InputGroup className="m-lg-3">
                    <Form.Control id="search"  type="text" placeholder = "Search recipes" value={searchTerm} aria-label= "Search-recipes"
                                  onKeyDown={handleKeyDown} onChange={handleInputChange}/>
                    <Button  size="lg" variant="outline-secondary" type="submit" onClick={performSearch}>Search</Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default Search;