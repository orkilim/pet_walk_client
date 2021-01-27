import * as React from 'react';
import '../../../App.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const FooterMyCommunity = (props) => {
    const {key, deleteItem,editeItem} = props;

    return (
        <React.Fragment>
            <DeleteIcon onClick={deleteItem}/>
            <EditIcon onClick={editeItem}/>
        </React.Fragment>
    );
}

export default FooterMyCommunity