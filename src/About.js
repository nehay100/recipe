import React, { Component } from 'react';
import meme1 from './meme1.jpg';
import meme2 from './meme2.jpg';

class About extends Component {
    // renders all posts
    render() {
        return (
            <div>
                <h1>About</h1>
                <h6>By: Neha Yadav, Hayden Hong, James Lin and Yasmine Hejazi</h6>
                <p>The purpose of our project is to assist college students in making delicious, healthy homemade food with limited budget. Since most college students are not equipped with the creative food ideas, our team decided to create an informative website that could help students in making quality, special-kind food. Increasing the availability and accessibility of this information is the focus of this project.</p>
                <p>Our website will be used as a sharing platform which specifically serve the college student population who often cook for themselves but have limited of good recipes ideas in mind. The website will allow students to exchange their “secret” recipes with other students. It can also provide student with the opportunity to show creativity of making food and to bring diversity of writing special culturally recipes. Once we establish a sign in/sign out feature, users will be able to keep a personal profile of recipes they have posted. The user will also be able to keep a saved list of liked recipes from different users.</p>
                <p>In addition, our website features its unique user experiences. The website includes specialized step-by-step cooking procedure and allows students to easily navigate through the website with its user-friendly design. Features such as demos and built-in timers are also available. The website also offers personalized experiences through our rating system by knowing what recipes would interest them.</p>
                <img src={meme1} alt="funny meme about eating" width="500" height="500"/>
                <img src={meme2} alt="funny meme with dog cooking" width="500" height="500"/>
            </div>
        );
    }
}
export default About;