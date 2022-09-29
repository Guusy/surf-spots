
function BeachItem(props) {
  return <> {props.data.map(({name, score}) => (<div> {name} {score}</div>))}</>
}

export default BeachItem
