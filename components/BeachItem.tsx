import { useState } from "react"
import Beach, { HourHandBeach } from "../server_src/domain/Beach"
import styles from '../styles/Home.module.css'

function BeachItem(props: any) {
  const {name, score, averageMeters, wind, tides, meters } = props
  const {firstLow, firstHigh, secondLow, secondHigh} = tides
  const [open, setOpen] = useState(false)

  return <div className={styles['beach-item']} onClick={ () => setOpen(!open)}>
     {name}  {averageMeters}M {wind.direction} {wind.min}-{wind.max} kph 
     {open && <div
     style={{display:'flex', justifyContent:'space-between', marginTop:'0.5em'}}>
      <div>
      <b>Mareas</b>
      <p>&#8595; {firstLow.time} - {firstLow.value} </p>
      <p>&#8593; {firstHigh.time} - {firstHigh.value} </p>
      <p>&#8595; {secondLow.time} - {secondLow.value} </p>
      <p>&#8593; {secondHigh.time} - {secondHigh.value} </p>
      </div>
      <div>
        <b>Swell</b>
        <p>  {meters.from} - {meters.to} M</p>
        <b>Viento</b>
        <p>{wind.direction} {wind.min}-{wind.max} kph </p>
        </div>
      </div>}
     </div>
}
function BeachItemList(props: { data: HourHandBeach[]}) {
  return <div> {props.data.map((beach, i) => <BeachItem key={i} {...beach} />)}</div>
}



export default BeachItemList
