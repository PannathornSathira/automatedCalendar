import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CalendarHome from './components/homeEmployee/CalendarHome';
import meetingStatus from "./components/MeetingStatus/meetingStatus";
const Routes = () =>{
    return (
        <Router>
            <Switch>
                <Route path="/">
                <CalendarHome />
                </Route>
            </Switch>
        </Router>
    )
}