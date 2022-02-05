import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

function FooterLayout() {
  return <footer>
    <button><FontAwesomeIcon icon={faEnvelope}/> 메일</button>
    <button><FontAwesomeIcon icon={faGithub}/> 깃허브</button>
  </footer>
}

export default FooterLayout