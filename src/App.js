import { MapContainer, TileLayer} from 'react-leaflet'
import { useState,useEffect } from 'react'
import Markerposition from './Markerposition'
import "leaflet/dist/leaflet.css"
import bgimg from "./images/pattern-bg-desktop.png"
import arrow from './images/icon-arrow.svg'

function App() {
    const [address,setAddress]=useState(null)
    const [ipAddress,setIpAddress]=useState("")
    const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/

    
    
    useEffect(()=>{
      try {
        const getInitial=async()=>{
          const res=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=8.8.8.8`)
          const data=await res.json()
          setAddress(data)
          console.log(data)

        }
        getInitial()
      } catch (error) {
        console.trace(error)
      }
    },[])
    async function getipadd()
    {
        const res=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&${checkIpAddress.test(ipAddress)?`ipAddress=${ipAddress}`:checkDomain.test(ipAddress)?`domain=${ipAddress}`:""}`)
        const data=await res.json()
        setAddress(data) 
    }
    function SubmitEvent(e)
    {
      e.preventDefault()
      getipadd()
      setIpAddress("")
    }

  return (
    <div>
      <section>
        <div className="absolute -z-10">
          <img src={bgimg} alt="" className="w-full h-80 object-cover"/>
        </div>
        <article className="p-8">
          <h1 className="text-3xl text-center text-white font-bold mb-8"> IP Address Tracker</h1>
          <form onSubmit={SubmitEvent} autoComplete="off" className="flex justify-center max-w-xl mx-auto">
            <input type="text" placeholder="Search for any IP address or domain" className="py-2 px-4 rounded-l-lg w-full" value={ipAddress} onChange={(e)=>setIpAddress(e.target.value)}/>
            <button type="submit" className="bg-black py-4 px-4 rounded-r-lg hovre:opacity-60"><img src={arrow} alt=""/></button>
          </form>
        </article>
      {address && <>
        <article className="bg-white rounded-lg shadow p-8 mx-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mx-w-6xl xl:mx-auto text-center md:text-left lg:-mb-16 relative" style={{zIndex:1000}}>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">IP Address</h2>
            <p className="text-slate-900 md:text-xl lg-text-3xl font-bold">{address.ip}</p>
          </div>

          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Location</h2>
            <p className="text-slate-900 md:text-xl lg-text-2xl font-bold">{address.location.city} , {address.location.region}</p>
          </div>

          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm-2px font-bold text-slate-500 tracking-wider mb-3">Time Zone</h2>
            <p className="text-slate-900 md:text-xl lg:text-2xl font-bold">UTC {address.location.timezone}</p>
          </div>
          <div>
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">isp</h2>
            <p className="text-slate-900 md:text-xl lg-text-2xl font-bold">{address.isp}</p>
          </div>
        </article>
        
        <MapContainer center={[address.location.lat,address.location.lng]} zoom={13} scrollWheelZoom={true} style={{height:"400px", width:"100vm"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        <Markerposition address={address}/>
        </MapContainer>    
      </>}
      </section>
    </div>
  );
}

export default App;
