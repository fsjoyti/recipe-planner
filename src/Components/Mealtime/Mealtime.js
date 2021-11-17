import './Mealtime.css'

const Mealtime = ({title, img, alt})=>{
   return(
       <div className = "mealtime-parent">
           <img src={img} alt={alt} className="mealtime-img"/>
           <h6 style={{fontFamily:"Roboto"}}>{title}</h6>
       </div>
   )
}

export default Mealtime;