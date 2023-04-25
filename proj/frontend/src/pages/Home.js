import React from 'react';
import logo from './logo.png';
import cowboy from './cowboy.png';

function Home() {
    return (
        <div className="App">
            <div className="stage4">
                <h1 className="whatif">What-If Olympics</h1>
            </div>
            <div className="content">
                <img src={logo} alt="logo" width="700"/>
                <table>
                    <tr>
                        <td>
                        <p className="title">By Group 11</p>
                        <p className="pgraph">Our project uses the 2021 Tokyo Olympics dataset from Kaggle to create a multi-paged user-friendly website. Our functionality allows users to insert new countries / National Olympic Committees (NOC), delete and update anything, and search anything. Along with interactive visualizations to display some information from the database.</p>
                        </td>
                        <td>
                        <img src={cowboy} alt="cowboy" width="700"/>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Home;
