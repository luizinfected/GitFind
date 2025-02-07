import './styles.css'

export const ItemList = ({title, description}) => {
  return (
    <div className="item-list">
        <strong>{title}</strong>
        <p>{description}</p>
        <hr/>
    </div>
  )
}
