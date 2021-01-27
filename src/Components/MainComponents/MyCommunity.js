import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css';
import axios from 'axios';
import Navbar from '../RepeatingComponents/Navbar';
import Loading from '../RepeatingComponents/Loading';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const MyCommunity = () => {
    return (
        <React.Fragment>
        <header className="container-fluid">
            <div className="container">
                <div className="mt-2">
                    <Link class="py-4" to="/community"><ArrowBackIcon></ArrowBackIcon></Link>
                    <h1 className="py-4">My Community</h1>
                </div>
                <form className="search-box my-2">
                    <input type="text" className="search-txt" placeholder="Search" />
                    <SearchIcon className="search-btn" />
                </form>
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