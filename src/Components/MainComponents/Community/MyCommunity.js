import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../../App.css';
import axios from 'axios';
import Navbar from '../../RepeatingComponents/Navbar';
import Loading from '../../RepeatingComponents/Loading';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchClass from '../../RepeatingComponents/SearchClass';
import CommunityList from './CommunityList';



const MyCommunity = () => {
    const [communities, setCommunities] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [search, setSearch] = React.useState(''); 

    const onSearch = (search) => {
        console.log(search);
        setSearch({ search: search.toLowerCase() });
        console.log(search);
    };

    React.useEffect(() => {
        //get users only   
        axios({
            method: 'GET',
            url: 'https://petwalkapp.herokuapp.com/socialNetworks/ofUser',
            headers: {
                "x-auth-token": localStorage["token"],
            }
        })
            .then((data) => {
                console.log(data.data);
                setCommunities(data.data);
                setData(true);
                return;
            })
            .catch((error) => {
                console.log(error.response);
                return;
            })

    }, [])

    const communityList = communities.filter(todo => todo.title.toString().toLowerCase().includes(search));
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
                {data ? <CommunityList page={'myCommunity'} communities={communities} communityList={communityList}/> : <Loading />}
                </div>
            </div>
        </main>
        <footer> <Navbar namePage={'community'} /> </footer>
    </React.Fragment>
    )
}

export default MyCommunity