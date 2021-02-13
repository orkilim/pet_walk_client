import axios from 'axios'
import * as React from 'react'
import Navbar from '../../RepeatingComponents/Navbar';
import SearchIcon from '@material-ui/icons/Search';
import Pet404 from "../Pet404";
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import SearchList from './SearchList';

let dogsImagesArray = [];
let dogsStart = [];
let key = 0


const Search = () => {
    const [dogBreed, setBreed] = React.useState('');
    const [fullArray, setFullArray] = React.useState(false);
    const [dogs, setDogs] = React.useState([]);
    const [err404, setEror404] = React.useState(false);
    const [type2, setDogType2] = React.useState(false);



    React.useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://dog.ceo/api/breeds/image/random/10',
        })
            .then((data) => {
                if (data.data.status === 'success') {
                    dogsStart = data.data.message;
                    setDogs(data.data.message);
                }
            })
            .catch((error) => {
                console.log(error.response);
                return;
            })

    }, [])

    // const showImages = (imageLink) => {
    //     return (
    //         <React.Fragment>
    //             <div class="col-lg-3 col-md-4 col-6 d-block mb-4 h-100 gallery">
    //                 <img class="img-fluid img-thumbnail" style={{  marginTop: '10px', width: 200, height: 200 }} key={key++} src={imageLink} alt='dog image' />
    //             </div>
    //         </React.Fragment>
    //     )
    // }

    const onClick = async () => {
        setEror404(false);
        if (dogBreed !== '') {
            await axios({
                method: "GET",
                url: `https://dog.ceo/api/breed/${dogBreed}/images`
            })
                .then((responseJson) => {
                    if (responseJson.data.status === 'success') {
                        dogsImagesArray = responseJson.data.message
                        setFullArray(true)
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response.status == 404) {
                        setEror404(true);
                        setFullArray(false)
                    }
                })
        }
        //if no value writen the dont do anything 
        else return;
    }

    console.log(dogBreed);
    return (
        <>
            <header className="container-fluid">
                <div className="container">
                    <h1 className="py-4">Pets in the World</h1>
                    <div className="row">
                        <div className="col-8">
                            <form className="search-box my-2">
                                <input type='text' className="search-txt" placeholder="Search types" onChange={(event) => { setBreed(event.currentTarget.value) }} />
                                <SearchIcon onClick={onClick} className="search-btn" />
                            </form>
                        </div>
                        <div className="col-4 align-self-center">
                            <Select variant="outlined" className="w-100" value={dogBreed} onChange={(event) => { setBreed(event.target.value) }}>
                                <MenuItem selected value='Boxer' onClick={onClick}  >Akita</MenuItem>
                                <MenuItem value='Boxer' onClick={onClick} >Boxer</MenuItem>
                                <MenuItem value='Chow' onClick={onClick} >Chow</MenuItem>
                                <MenuItem value='Dingo' onClick={onClick} >Dingo</MenuItem>
                                <MenuItem value='Husky' onClick={onClick} >Husky</MenuItem>
                                <MenuItem value='Mix' onClick={onClick} >Mix</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div id="id_gallery" class="row text-center text-lg-left">
                        {
                            err404 ?
                                <Pet404 dogBreed={dogBreed} /> :
                                (!fullArray ?
                                    <SearchList searchList={dogsStart} i={0} />
                                    : 
                                    <SearchList searchList={dogsImagesArray} i={0} />
                                )
                        }

                        {/* {
                            err404 ?
                                <Pet404 dogBreed={dogBreed} /> :
                                (!fullArray ?
                                    <SearchList searchList={dogsStart} i={0} />
                                    //dogsStart.map(showImages)
                                    : //dogsImagesArray.map(showImages)
                                    <SearchList searchList={dogsImagesArray} i={0} />
                                )
                        } */}
                    </div>
                </div>
            </main>

            <footer> <Navbar namePage={'search'} /> </footer>
        </>
    )
}

export default Search



