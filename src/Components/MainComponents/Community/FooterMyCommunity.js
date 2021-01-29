import * as React from 'react';
import '../../../App.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const FooterMyCommunity = (props) => {
    const {deleteItem,editItem} = props;

    return (
        <React.Fragment>
            <DeleteIcon onClick={deleteItem} style={{cursor: 'pointer'}}/>
            <EditIcon onClick={editItem} style={{cursor: 'pointer'}}/>
        </React.Fragment>
    );
}

export default FooterMyCommunity