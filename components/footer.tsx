import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

function Footer() {

    function redirectToGithub() {
        window.open("https://github.com/ordilov/shuffle-practice");
    }

    return <footer>
        <button className={"footer-icon"} data-bs-toggle="tooltip" data-bs-placement="top" title="ordilov@gmail.com">
            <FontAwesomeIcon icon={faEnvelope as IconProp}/> 메일
        </button>
        <button className={"footer-icon"} onClick={redirectToGithub}><FontAwesomeIcon icon={faGithub as IconProp}/> 깃허브
        </button>
    </footer>
}

export default Footer