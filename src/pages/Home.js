import React, { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import data from '../companynamedata.json';
import mydata from '../mydata.json'

const Home = () => {

    const [search, setSearch] = useState("");
    const [searchCompanies, setSearchCompanies] = useState([]);
    const [myCompanies, setMyCompanies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
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
        const companies = await axios.get(`http://localhost:3001/companies/${name}`);
        console.log(companies.data);
        setSearchCompanies(companies.data);
        //replace token with env
        // console.log(companies);
        // axios.get('/test');
        // const companies = await axios.get(`https://tf689y3hbj.execute-api.us-east-1.amazonaws.com/prod/authorization/search?q=${companyName}&token=7e2d094d741eb56c885f7acacc0ab0a7`);
        // console.log(companies);
        // console.log(typeof companies);
        // setCompanyList(companies);
    }

    const getBackgroundColor = (score) => {
        if (score <= 700) {
            return '#C72C2C'
        } else if (score <= 1000) {
            return "#F7B93B"
        } else {
            return "#4F9900"
        }
    }

    const getBackgroundGradient = (score) => {
        if (score <= 700) {
            return `linear-gradient(-120deg, #D62121, #C72C2C, #3a1111)`;
        } else if (score <= 1000) {
            return "linear-gradient(to right, #D66900, #E8B03F, #FCED0A)"
        } else {
            return "linear-gradient(to right, #074C00, #42A341, #B8E2A3)"
        }
    }

    const deleteCompany = (name) => {
        const newCompanies = myCompanies.filter((company) => company.company_name != name);
        setMyCompanies(newCompanies);
    }

    return (
    <div className='home-wrapper'>
        <header className='home-header'>
            <div>&nbsp;</div>
            <h1>myESG</h1>
            <div className="sign-out-button" onClick={signOut}>Sign Out</div>
        </header>
        <div className='home-container'>
            <div className='search-area'>
                <h2 className="home-search">Search:</h2>
                <input type="text" id="search" placeholder='Search for a company...' onChange={(e) => setSearch(e.target.value)} />
                <button type="submit" className='search-submit' onClick={() => queryCompanies(search)}>Submit</button>
                <div className='search-display-box'>
                    {searchCompanies.map((company, i) => (
                        <div className='search-display-element' key={i} onClick={() => setMyCompanies([...myCompanies, company])}>
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
                    {myCompanies.length == 0 ? <div className='no-companies'>Your companies will appear here.</div> : myCompanies.map((company) => (
                        <div className='my-company'>
                            <div className='my-company-left'>
                                <p><strong>Name:</strong> {company.company_name}</p>
                                <p className='score'><strong>Social Score:</strong> {company.social_score}</p>
                                <p className='score'><strong>Environment Score:</strong> {company.environment_score}</p>
                                <p className='score'><strong>Governance Score:</strong> {company.governance_score}</p>
                            </div>
                            <div className='my-company-right'>
                                <div className='gradient' style={{background: `${getBackgroundColor(company.total)}`, background: `${getBackgroundGradient(company.total)}`}}>
                                    &nbsp;
                                    <p id='total-score'>{company.total}</p>
                                    <div className='deleteButton' onClick={() => deleteCompany(company.company_name)}>X</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home