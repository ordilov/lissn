import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

function FooterLayout() {
  return <footer>
    <button><FontAwesomeIcon icon={faEnvelope as IconProp}/> 메일</button>
    <button><FontAwesomeIcon icon={faGithub as IconProp}/> 깃허브</button>
  </footer>
}

export default FooterLayout