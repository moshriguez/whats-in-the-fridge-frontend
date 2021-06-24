import {Modal} from 'react-bootstrap';

const YouTubeVideo = ({showVideo, setShowVideo, recipe}) => {
    return (
        recipe.strYoutube ?
        <Modal show={showVideo} onHide={setShowVideo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton><h3>{recipe.strMeal}</h3></Modal.Header>
            <Modal.Body>
                <iframe 
                    width="465" 
                    height="315" 
                    src={recipe.strYoutube.replace("watch?v=", "embed/")}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                >
                </iframe>
            </Modal.Body>
        </Modal> : null
    )
}

export default YouTubeVideo