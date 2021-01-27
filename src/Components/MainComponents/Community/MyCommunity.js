import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../../App.css';
import axios from 'axios';
import Navbar from '../../RepeatingComponents/Navbar';
import Loading from '../../RepeatingComponents/Loading';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchClass from '../../RepeatingComponents/SearchClass';




const MyCommunity = () => {
    const [communities, setCommunities] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [search, setSearch] = React.useState(''); 

    const onSearch = (search) => {
        setSearch({ search: search.toLowerCase() })
    };

    return (
        <React.Fragment>
        <header className="container-fluid">
            <div className="container">
                <div className="mt-2">
                    <Link class="py-4" to="/community"><ArrowBackIcon></ArrowBackIcon></Link>
                    <h1 className="py-4">My Community</h1>
                </div>
                <SearchClass onSearch={onSearch}/>
            </div>
        </header>

        <main className="container-fluid">
            <div className="container">
                <div className="row justify-content-center">
                    {/* {data ? communities.map(showCommunities) : <Loading />} */}
                </div>
            </div>
        </main>
        <footer> <Navbar namePage={'community'} /> </footer>
    </React.Fragment>
    )
}

export default MyCommunity