import React from 'react'
import {RiFridgeLine} from 'react-icons/ri'

const Home = (props) => {
    return (
        <div id="home-container">
            <h1>What's in the Fridge?</h1>
            <p>Don't know what to make for dinner tonight? Find recipes based on what you have in your fridge.</p>
            {props.user ? <h5>Welcome back {props.user.username}! Click on 'My Fridge' to add items to your fridge.</h5>
            : <p><strong>Login or create an account to add items to your fridge.</strong></p>}
            <img src="https://www.whirlpool.com/content/whirlpoolv2/en_us/blog/kitchen/food-freezes-in-refrigerator/_jcr_content/primary/responsivegrid_15659/contentcard_copy_cop_1026559799/image.img.jpeg/1576604613415/p170303-7z.jpeg" alt="a moderately stocked fridge" />
        </div>
    )
}

export default Home