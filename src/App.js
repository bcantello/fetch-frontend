import React, {useState, createContext} from 'react';
import './App.css';
import Main from './components/Main'
import {getProviderByZip} from "./services/api-helper";

function App() {
    const [service, setService] = useState(() => {
        const result = sessionStorage.getItem('service');
        return result ? result : ""
    });
    const [date, setDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState('10:00')
    const [localProviders, setLocalProviders] = useState(() => {
        const providers = sessionStorage.getItem('providers');
        return JSON.parse(providers) ? JSON.parse(providers) : []
    });
    const [chosenProvider, setChosenProvider] = useState();
    const [newAppointment, setNewAppointment] = useState([]);
    const [pets, setPets] = useState([])
    const [loggedIn, setLoggedIn] = useState(() => {
        const result = sessionStorage.getItem('user');
        return JSON.parse(result) ? JSON.parse(result) : {}
    });
    const appointmentInfo = {
        date: date,
        time: appointmentTime,
        service: service,
        petId: loggedIn['pet'],
        user_id: loggedIn['_id'],
        provider_id: chosenProvider
    }

    const handleLogin = (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        const loggedInUser = sessionStorage.getItem('user');
        setLoggedIn(JSON.parse(loggedInUser));
    };

    const handleServiceClick = async(service) => {
        sessionStorage.setItem('service', service);
        setService(sessionStorage.getItem('service'));
        await getProviderByZip(loggedIn.zip).then((response) => {
            if (response.status === 200) {
                sessionStorage.setItem('providers', JSON.stringify(response.data));
                const providers = sessionStorage.getItem('providers');
                setLocalProviders(JSON.parse(providers));
            } else {
                return ('login error');
            }
        }).catch(error => {
            return ("registration error" + error);
        });
    };

    const onDateClick = date => setDate(date);
    const onTimeChange = time => setAppointmentTime(time)

    return (
        <div className="App">
            <AppContext.Provider value={
                {
                    handleLogin,
                    handleServiceClick,
                    onDateClick,
                    onTimeChange,
                    setService,
                    service,
                    date,
                    setDate,
                    appointmentTime,
                    setAppointmentTime,
                    loggedIn,
                    localProviders,
                    chosenProvider,
                    setChosenProvider,
                    newAppointment,
                    setNewAppointment,
                    appointmentInfo,
                    pets, 
                    setPets
                }
            }>
                <Main/>
            </AppContext.Provider>
        </div>
    );
}

export default App;
export const AppContext = createContext();
