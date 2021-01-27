import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import '../../../App.css';
import CommunityItem from './CommunityItem';


const CommunityList = (props) => {
    const {communities,communityList,page,deleteItem} = props;

    return (
        communityList.map(item =><CommunityItem key={item._id} item={item} title={item.title} page={page} deleteItem={() => {deleteItem(item._id);}}/>)
    )
}

export default CommunityList