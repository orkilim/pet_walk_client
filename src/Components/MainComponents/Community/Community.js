import * as React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../RepeatingComponents/Navbar';
import Loading from '../../RepeatingComponents/Loading';
import '../../../App.css';
import SearchClass from '../../RepeatingComponents/SearchClass';
import CommunityList from './CommunityList';





const Community = () => {
    const [communities, setCommunities] = React.useState([]);
    const [data, setData] = React.useState(false); // data retrieved from the server(y\n)
    const [search, setSearch] = React.useState(''); 

    const onSearch = (search) => {
        console.log(search);
        setSearch({ search: search.toLowerCase() });
        console.log(search);
    };

    React.useEffect(() => {
        //get all 
        axios({
            method: 'GET',
            url: 'https://petwalkapp.herokuapp.com/socialNetworks'
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

    // const showCommunities = (item) => {
    //     return (
    //         <div key={item._id} className="card col-md-4 col-8 m-3">
    //             <div style={{ padding: '.75rem 1.25rem' }}>
    //                 <div className="row justify-content-between">
    //                     <div className="col-6">
    //                         <img src={item.img} style={{ borderRadius: '50%', width: '40%', height: '120%', padding: '5%' }} />
    //                       {item.title}
    //             </div>
    //                     <div>{item.type}</div>
    //                 </div>
    //             </div>
    //             <img className="card-img-top" src={item.img} alt="Card image" />
    //             <div className="card-body">
    //                 <div class="row p-2 fafa justify-content-between">
    //                     <Link to="#" ><StarIcon /></Link>
    //                     <ChatBubbleOutlineIcon />
    //                     <FacebookIcon />
    //                     <TwitterIcon />
    //                     <InstagramIcon />
    //                 </div>
    //             </div>
    //         </div>
    //     )

    // }
    const communityList = communities.filter(todo => todo.title.toString().toLowerCase().includes(search));
    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <div className="row justify-content-between">
                        <h1 className="py-4">Community</h1>
                        <Link to="/myCommunity"><button type="button" class="btn btn-outline-info">MyCommunity</button></Link>
                    </div>
                    <SearchClass onSearch={onSearch}/>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div className="row justify-content-center">
                        {data ? <CommunityList communities={communities} communityList={communityList}/> : <Loading />}
                    </div>
                </div>
            </main>
            <footer> <Navbar namePage={'community'} /> </footer>
        </React.Fragment>
    )
}

export default Community