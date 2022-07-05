// dependencies
import { Component, useEffect, useState } from "react"
import axios from 'axios';

// styles
import './weather.css'

// imported functions
import DisplayWeather from "./displayWeather";

export default class Weather extends Component{
    
    constructor(props){
        super(props)
        this.state={
            input_warn: 'Insert the local name here...',
            query: '',
            prevQuery: '',
            data: {
                current: {
                    condition: {
                        icon: '',
                        text: ''
                    },
                    feelslike_c: '',
                    humidity: '',
                    temp_c: '',
                    wind_kph: ''
                },
                location: {
                    country: '',
                    region: '',
                    localtime: '',
                    name: '',
                    flag: ''
                }
            },
            loading: false,
            visible: false
        }
      }

    getWeather(local) {  

        const api_key = '0eec1b0914a04beead843922220107'
        const api_url = 'http://api.weatherapi.com/v1/current.json?key=' + api_key + '&q=' + local + '' 
        this.setState(prevState => {
            return{
                ...prevState,
                visible: false
            }
        })
        
        // verify input length
        if(local.length > 0){
            fetch(api_url)
                .then(res => {
                    if(res.ok){
                        this.setState(prevState => {
                            return{
                                ...prevState,
                                query: '',
                                loading: true
                            }
                        })
                        return res.json()
                    }
                })
                .then(data => {
                    console.log(data)
                    const country = data.location.country
                    const flag_api = 'https://countryflagsapi.com/png/' + country
                    return this.storeData(data, flag_api)
                })
                .then(()=>{
                    setTimeout(()=> {
                        this.setState(prevState => {
                            return{
                                ...prevState,
                                loading: false,
                                visible: true
                            }
                        })
                    }, 3000)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    storeData(data, flag){
        const current = data.current
        const condition = current.condition
        const location = data.location

        const time = location.localtime.split(' ')

        this.setState({
            data: {
                current: {
                    condition: {
                        icon: condition.icon,
                        text: condition.text
                    },
                    feelslike_c: current.feelslike_c,
                    humidity: current.humidity,
                    temp_c: current.temp_c,
                    wind_kph: current.wind_kph
                },
                location: {
                    country: location.country,
                    localtime: time[1],
                    region: location.region,
                    name: location.name,
                    flag: flag
                }
            }
        })
        return this.state
    }

    setQuery(value){

        this.setState(prevState =>{
            return{
                ...prevState,
                prevQuery: value,
                query: value,

            }
        })
    }

    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.handleButtonClick()
        }
    }

    handleButtonClick(){
        if(this.state.prevQuery.length > 0){
            this.getWeather(this.state.prevQuery)
        }
        else if(this.state.query){
            this.getWeather(this.state.query)
        }
    }
    
    render(){   
        
        
        const visible = this.state.visible
        const loading = this.state.loading


        return (
            <div className="Weather">
                <h1 id="title">Weather App</h1>
                <div id="input-area">
                    <input onKeyPress={(e)=>this.handleKeyPress(e)} id="query-input" value={this.state.query} onChange={e=>this.setQuery(e.target.value.toUpperCase())} placeholder={this.state.input_warn} ></input>
                    <button className="btn" onClick={()=>this.handleButtonClick()} >Search</button>
                </div>
                <br></br>
                {loading && <div id="loading-icon"></div>}
                {visible && <DisplayWeather data={this.state.data}/>}
            </div>
        )
    }
}


