import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../../App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../RepeatingComponents/Navbar';
import Loading from '../../RepeatingComponents/Loading';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100px'
    },
}));

const AddCommunity = () => {
    const [currency, setCurrency] = React.useState('$');
    const classes = useStyles();

    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <React.Fragment>
            <header className="container-fluid">
                <div className="container">
                    <div className="mt-2">
                        <Link className="py-4" to="/mycommunity"><ArrowBackIcon></ArrowBackIcon></Link>
                        <h1 className="py-4">Add Community</h1>
                    </div>
                </div>
            </header>

            <main className="container-fluid">
                <div className="container">
                    <div className="add_form">
                        <div className="text-center">
                            <img src="https://i.pinimg.com/originals/f6/af/e8/f6afe8801e93598525796c47afd9f3c0.png" alt="PetPic" style={{ maxWidth: '30%', borderRadius: '50%', backgroundColor: 'azure' }} />
                        </div>

                        <div className="col-auto text-center">
                            <input className="btn btn-primary btn-lg my-4 w-75" type="file" />
                        </div>
                    </div>

                    <form>
                        <TextField id="outlined-basic" label="Title" variant="outlined" className="w-100 mb-5" />
                        <TextField id="outlined-basic" label="Type" variant="outlined" className="w-100 mb-5" />
                        <TextField className="w-100 mb-5"
                            classes={{ root: classes.root }}
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={currency}
                            helperText="Please select your currency"
                            variant="outlined"
                            SelectProps={{
                                multiple: true,
                                value: []
                            }}
                            onChange={handleChange}
                        />
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}

                        <button type="submit" className="btn-lg btn-block my-4 w-100 btns_blue">Add
                        </button>
                    </form>
                </div>
            </main>
        </React.Fragment >
    );
}

export default AddCommunity