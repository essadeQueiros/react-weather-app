
import '../assets/styles/DisplayWeather.css'

/* data estructure  (random values)
    
    current:
cloud: 0
condition:
code: 1000
icon: "//cdn.weatherapi.com/weather/64x64/night/113.png"
text: "Clear"
feelslike_c: 16
feelslike_f: 60.8
gust_kph: 14.4
gust_mph: 8.9
humidity: 100
is_day: 0
last_updated: "2022-07-03 05:00"
last_updated_epoch: 1656820800
precip_in: 0
precip_mm: 0
pressure_in: 29.97
pressure_mb: 1015
temp_c: 16
temp_f: 60.8
uv: 1
vis_km: 10
vis_miles: 6
wind_degree: 10
wind_dir: "N"
wind_kph: 3.6
wind_mph: 2.2
location:
country: "Portugal"
lat: 41.4
localtime: "2022-07-03 6:09"
localtime_epoch: 1656824955
lon: -8.75
name: "Amorim"
region: "Porto"
tz_id: "Europe/Lisbon"
    
    */

export default function DisplayWeather(props){

    const data = props.data
    const current = data.current
    const location = data.location

    // styles

    
    const flag = {
        background: `url(${location.flag}) fixed`,
        width: '35%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }    

    return (
        <div id="DisplayWeather">
            <div id='container' className='rounded appear dur-1 shadow'>
                <div className='first principal'>
                    <div className='card-title rounded shadow'>
                        <p>Weather</p>
                    </div>
                    <div className='double-card sub'>
                        <div className='card rounded current temperature shadow'>
                            <div className='card-info temp'>
                                <p className='desc'>Temperature:</p>
                                <p className='info'>{current.temp_c}ºC</p>
                            </div>
                            <div className='card-info feelslike'>
                                <p className='desc'>Humidity:</p>
                                <p className='info'>{current.humidity}%</p>
                            </div>
                            <div className='card-info humidity'>
                                <p className='desc'>Wind:</p>
                                <p className='info'>{current.wind_kph} km/h</p>
                            </div>
                        </div>
                        <div className='card rounded dur-2 condition shadow'>
                            <div className=''>
                                <p>Condition</p>
                            </div>
                            <div className='card-info' style={{alignItems: 'center'}}>
                                <p className='info'>{current.condition.text}</p>
                                <img className='info' src={current.condition.icon}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='second principal'>
                    <div className='card-title rounded shadow'>
                        <p>Location</p>
                    </div>
                    <div className='sub double-card'>
                        <div className='card rounded location temperature shadow'>
                            <div className='card-info temp'>
                                <p>Local:</p>
                                <p>{location.name}</p>
                            </div>
                            <div className='card-info feelslike'>
                                <p>Country:</p>
                                <p>{location.country}</p>
                            </div>
                            <div className='card-info humidity'>
                                <p>Local Time</p>
                                <p>{location.localtime}</p>
                            </div>
                        </div>
                        <div className='flag card rounded shadow' style={flag}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}