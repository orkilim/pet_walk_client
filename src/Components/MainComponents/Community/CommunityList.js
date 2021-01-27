import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import '../../../App.css';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import CommunityItem from './CommunityItem';


const CommunityList = (props) => {
    const {communities,communityList,page} = props;
    

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

    return (
        //communityList.map(showCommunities)

        communityList.map(item =><CommunityItem key={item._id} item={item} title={item.title} page={page}/>)
    )
}

export default CommunityList