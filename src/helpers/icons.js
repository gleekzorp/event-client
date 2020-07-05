// import { faStar, faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt, faSpinner, faMinus, faPlus, faInfoCircle, faUser, faUsers, faUtensils, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
    return library.add(
        faStar,
        faSpinner,
        faMinus,
        faPlus,
        faCalendarAlt,
        faClock,
        faMapMarkerAlt,
        faInfoCircle,
        faUser,
        faUsers,
        faUtensils
    );
};

export default Icons;