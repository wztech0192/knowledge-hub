import react from "react";
import "../../assets/css/index.css"

const videoBackground = () => {
    return (
        <video autoPlay muted loop className="videoBg">
            <source src='../../assets/videos/18069235-uhd_3840_2160_24fps.mp4' type="video/mp4" />
        </video>
    )
}

export default videoBackground;