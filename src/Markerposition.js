import React from 'react'
import {useMap,Marker,Popup } from 'react-leaflet'
import {useEffect } from 'react'
import icon from "./icon"
//import { map } from 'leaflet'

export default function Markerposition({address}) {
   const map= useMap()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const position =[address.location.lat,address.location.lng]
       useEffect(()=>{
         map.flyTo(position,13,{
           animate:true
         })
       },[map,position])
  return (
    <div>
      <Marker icon={icon} position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    </div>
  )
}
