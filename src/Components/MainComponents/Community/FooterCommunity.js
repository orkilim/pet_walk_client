import * as React from 'react';
import '../../../App.css';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


const FooterCommunity = () => {
    return (
        <React.Fragment>
            <Link to="#" ><StarIcon /></Link>
            <ChatBubbleOutlineIcon />
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
        </React.Fragment>
    );
}

export default FooterCommunity