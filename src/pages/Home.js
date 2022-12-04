import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import data from '../companynamedata.json';
import mydata from '../mydata.json'

const Home = () => {

    const [name, setName] = useState("");
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            setName(user.email);
          } else {
            navigate('/signin');
            // User is signed out
            // ...
          }
        });
    }, [])

    const signOut = () => {
        const auth = getAuth();
        auth.signOut().then(() => {
            navigate("/signin");
        })
    }

    const queryCompanies = async (name) => {
        const companyName = name;
        //replace token with env
        axios.get('/test');
        // const companies = await axios.get(`https://tf689y3hbj.execute-api.us-east-1.amazonaws.com/prod/authorization/search?q=${companyName}&token=7e2d094d741eb56c885f7acacc0ab0a7`);
        // console.log(companies);
        // console.log(typeof companies);
        // setCompanyList(companies);
    }

    const getBackgroundColor = (score) => {
        if (score <= 700) {
            return "#CC1111"
        } else if (score <= 1400) {
            return "#F7B93B"
        } else {
            return "#4F9900"
        }
    }

    return (
    <div className='home-wrapper'>
        <header className='home-header'>
            <img src="./myESGlogo.jpeg" alt="logo" width={100} height={100} />
            <h1>myESG</h1>
            <div className="sign-out-button" onClick={signOut}>Sign Out</div>
        </header>
        <div className='home-container'>
            <div className='search-area'>
                <h2 className="home-search">Search:</h2>
                <input type="text" id="search" placeholder='Search for a company...' onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" className='search-submit' onClick={queryCompanies}>Submit</button>
                <div className='search-display-box'>
                    {data.map((company) => (
                        <div className='search-display-element'>
                            <p className='search-text'><strong>Name:</strong> {company.company_name}</p>
                            <p className='search-text'><strong>Stock Ticker:</strong> {company.stock_symbol}</p>
                            <p className='search-text'><strong>Score (out of 2100):</strong> {company.total}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='list-area'>
                <h2 className="home-search">My Companies:</h2>
                <div className='my-companies-box'>
                    {mydata.map((company) => (
                        <div className='my-company' style={{borderColor: `${getBackgroundColor(company.total)}`}}>
                            <p><strong>Name:</strong> {company.company_name}</p>
                            <p style={{backgroundColor: `${getBackgroundColor(company.total)}`}}><strong>Total Score:</strong> {company.total}</p>
                            <p className='score'><strong>Social Score:</strong> {company.social_score}</p>
                            <p className='score'><strong>Environment Score:</strong> {company.environment_score}</p>
                            <p className='score'><strong>Governance Score:</strong> {company.governance_score}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home