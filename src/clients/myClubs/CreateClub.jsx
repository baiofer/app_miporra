import { useEffect, useState } from 'react'
import FormInput from '../../components/FormInput'
import './CreateClub.css'
import { getTeams } from './service'
import ErrorComponent from '../../components/ErrorComponent'
import Button from '../../components/Button'

const CreateClub = () => {

    const [clubDate, setClubDate] = useState("")
    const [clubTime, setClubTime] = useState("")
    const [match1Date, setMatch1Date] = useState("")
    const [match1Time, setMatch1Time] = useState("")
    const [match2Date, setMatch2Date] = useState("")
    const [match2Time, setMatch2Time] = useState("")
    const [jackpot, setJackpot] = useState(0)
    const [weeks, setWeeks] = useState(0)
    const [teams, setTeams] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)
    const [selectedTeam1, setSelectedTeam1] = useState([])
    const [selectedTeamObject1, setSelectedTeamObject1] = useState(null)
    const [selectedTeam2, setSelectedTeam2] = useState([])
    const [selectedTeamObject2, setSelectedTeamObject2] = useState(null)
    const [selectedTeam3, setSelectedTeam3] = useState([])
    const [selectedTeamObject3, setSelectedTeamObject3] = useState(null)
    const [selectedTeam4, setSelectedTeam4] = useState([])
    const [selectedTeamObject4, setSelectedTeamObject4] = useState(null)

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                setIsFetching(true)
                const teamsList = await getTeams()
                setTeams(teamsList.results)
                setIsFetching(false)
                console.log(teams)
            } catch (error) {
                setIsFetching(false)
                setError(error)
                console.log(error) 
            }
        }
        fetchClubs()
    }, [])

    const handleSubmit = () => {

    }

    const handleTeam1 = (event) => {
        setSelectedTeam1(event.target.value)
        setSelectedTeamObject1(teams.find(team => team.id === selectedTeam1))
        console.log(selectedTeamObject1)
    }

    const handleTeam2 = (event) => {
        setSelectedTeam2(event.target.value)
        setSelectedTeamObject2(teams.find(team => team.id === selectedTeam2))
    }

    const handleTeam3 = (event) => {
        setSelectedTeam3(event.target.value)
        setSelectedTeamObject3(teams.find(team => team.id === selectedTeam3))
    }

    const handleTeam4 = (event) => {
        setSelectedTeam4(event.target.value)
        setSelectedTeamObject4(teams.find(team => team.id === selectedTeam4))
    }


    return (
        <div className='createClub' >
        <div className="createClub-container">
            {
                isFetching ? <p>Cargando ...</p> : null
            }
            <p className='createClub-title'>CREAR PORRA</p>
            <form onSubmit={handleSubmit}>
                <div className='createClub-date-time'>
                    <FormInput 
                        className='createClub-date'
                        type="date"
                        required
                        value={clubDate}
                        onChange={ e => setClubDate(e.target.value)}
                        label="Fecha de cierre"
                        name="clubDate"
                    />
                    <div style={{ width: '20px' }} />
                    <FormInput 
                        className='createClub-date'
                        type="time"
                        required
                        value={clubTime}
                        onChange={ e => setClubTime(e.target.value)}
                        label="Hora de cierre"
                        name="clubTime"
                    />
                </div>

                <h3 className='createClub-match-title'>Partido 1</h3>
                <div className='createClub-match'>
                    <div className='createClub-team'>
                        <select className='createClub-select' value={selectedTeam1} onChange={handleTeam1}>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        {
                            selectedTeamObject1 && 
                                <div className='createClub-badge'>
                                    <img src={selectedTeamObject1.badge} alt='Escudo del equipo' />
                                </div>
                        }
                    </div>
                    <div className='createClub-team'>
                        <select className='createClub-select' value={selectedTeam2} onChange={handleTeam2}>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        {
                            selectedTeamObject2 && 
                                <div className='createClub-badge'>
                                    <img src={selectedTeamObject2.badge} alt='Escudo del equipo' />
                                </div>
                        }
                    </div>
                </div>
                <div className='createClub-date-time'>
                    <FormInput 
                        className='createClub-date'
                        type="date"
                        required
                        value={match1Date}
                        onChange={ e => setMatch1Date(e.target.value)}
                        label="Fecha del partido"
                        name="clubDate1"
                    />
                    <div style={{ width: '20px' }} />
                    <FormInput 
                        className='createClub-date'
                        type="time"
                        required
                        value={match1Time}
                        onChange={ e => setMatch1Time(e.target.value)}
                        label="Hora del partido"
                        name="clubTime1"
                    />
                </div>



                
                <h3 className='createClub-match-title'>Partido 2</h3>
                <div className='createClub-match'>
                    <div className='createClub-team'>
                        <select className='createClub-select' value={selectedTeam3} onChange={handleTeam3}>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        {
                            selectedTeamObject3 && 
                                <div className='createClub-badge'>
                                    <img src={selectedTeamObject3.badge} alt='Escudo del equipo' />
                                </div>
                        }
                    </div>
                    <div className='createClub-team'>
                        <select className='createClub-select' value={selectedTeam4} onChange={handleTeam4}>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        {
                            selectedTeamObject4 && 
                                <div className='createClub-badge'>
                                    <img src={selectedTeamObject4.badge} alt='Escudo del equipo' />
                                </div>
                        }
                    </div>
                </div>
                <div className='createClub-date-time'>
                    <FormInput 
                        className='createClub-date'
                        type="date"
                        required
                        value={match2Date}
                        onChange={ e => setMatch2Date(e.target.value)}
                        label="Fecha del partido"
                        name="clubDate2"
                    />
                    <div style={{ width: '20px' }} />
                    <FormInput 
                        className='createClub-date'
                        type="time"
                        required
                        value={match2Time}
                        onChange={ e => setMatch2Time(e.target.value)}
                        label="Hora del partido"
                        name="clubTime"
                    />
                </div>
                <div className='createClub-date-time'>
                    <FormInput 
                        className='createClub-date'
                        type="number"
                        required
                        value={jackpot}
                        onChange={ e => setJackpot(e.target.value)}
                        label="Bote acumulado"
                        name="jackpot"
                    />
                    <div style={{ width: '20px' }} />
                    <FormInput 
                        className='createClub-date'
                        type="number"
                        required
                        value={weeks}
                        onChange={ e => setWeeks(e.target.value)}
                        label="Semanas"
                        name="weeks"
                    />
                </div>
                <div className="createClub-access">
                    <Button variant="primary-cta">
                        {isFetching ? "Creando la porra ..." : "Crea la porra"}
                    </Button>
                </div>
            </form>
            { error && 
                <div>
                    <ErrorComponent errorText={error} />
                </div>
            }
        </div>
        </div>
    )
}

export default CreateClub