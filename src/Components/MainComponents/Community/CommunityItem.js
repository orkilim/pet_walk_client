import * as React from 'react'
import FooterCommunity from './FooterCommunity';
import FooterMyCommunity from './FooterMyCommunity';


const CommunityItem = (props) => {
    const { key, item, title, page,deleteItem } = props;

    return (
        <React.Fragment>
            <div key={item._id} className="card col-md-4 col-8 m-3">
                <div style={{ padding: '.75rem 1.25rem' }}>
                    <div className="row justify-content-between">
                        <div className="col-10 w-100">
                            <img src={item.img} style={{ borderRadius: '50%', width: '40%', height: '120%', padding: '5%' }} />
                            {title}
                        </div>
                    </div>
                </div>
                <img className="card-img-top" src={item.img} alt="Card image" />
                <div className="card-body">
                    <div className="row p-2 fafa justify-content-between">
                        {page === 'community'
                            ? <FooterCommunity/>
                            :<FooterMyCommunity key={key} deleteItem={() => {deleteItem(key)}}/>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CommunityItem