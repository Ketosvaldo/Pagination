import {useState, useEffect} from 'react';
import Character from './Character';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import './styles.css';

export default function List() {
    const [characters, setCharacter] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character");
    const [pages, setPages] = useState();
    useEffect(() => {
        const url = currentPageUrl;

        async function fetchData() {
            const data = await fetch(url);
            const {results, info} = await data.json();
            setCharacter(results);
            setLoading(false);

            setPages(info.pages);
        }

        fetchData();
    }, [currentPageUrl]);

    const handleOnChange = (event, value) => {
        setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${value}`)
    }

    return (
        <div>
            <h2>Characters</h2>
            <Pagination count={pages} size="large" onChange={handleOnChange} className="pagination"/>
            <div className="row">
                {
                loading ? (
                    <div>Loading...</div>
                )
                :
                (
                characters.map((character) => (
                    <Character
                        key={character.id}
                        name={character.name}
                        origin={character.origin}
                        image={character.image}
                    />
                )))
                }
                <Pagination count={pages} size="large" onChange={handleOnChange} className="pagination"/>
            </div>
        </div>
    )
}