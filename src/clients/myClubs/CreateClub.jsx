import { useEffect, useState } from 'react'
import FormInput from '../../components/FormInput'
import './CreateClub.css'
import { createClub } from './service'
import Button from '../../components/Button'
import { useBadgesContext } from '../../context/BadgesContext'
import { useNavigate } from 'react-router-dom'
import ErrorComponent from '../../components/ErrorComponent'

const CreateClub = () => {

    const navigate = useNavigate()

    const [clubDate, setClubDate] = useState("")
    const [clubTime, setClubTime] = useState("")
    const [match1Date, setMatch1Date] = useState("")
    const [match1Time, setMatch1Time] = useState("")
    const [match2Date, setMatch2Date] = useState("")
    const [match2Time, setMatch2Time] = useState("")
    const [jackpot, setJackpot] = useState(0)
    const [betPrice, setBetPrice] = useState(0)
    const [selectedTeam1, setSelectedTeam1] = useState("")
    const [selectedTeamObject1, setSelectedTeamObject1] = useState(null)
    const [selectedTeam2, setSelectedTeam2] = useState("")
    const [selectedTeamObject2, setSelectedTeamObject2] = useState(null)
    const [selectedTeam3, setSelectedTeam3] = useState("")
    const [selectedTeamObject3, setSelectedTeamObject3] = useState(null)
    const [selectedTeam4, setSelectedTeam4] = useState("")
    const [selectedTeamObject4, setSelectedTeamObject4] = useState(null)
    const [error, setError] = useState(null)

    const { currentBadges } = useBadgesContext()

    useEffect(() => {
        if (error) {
          const timer = setTimeout(() => {
            setError(null);
          }, 5000);
          return () => {
            clearTimeout(timer);
          };
        }
      }, [error]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const clubToCreate = {
            match1HomeTeam: selectedTeamObject1.name,
            match1AwayTeam: selectedTeamObject2.name,
            match2HomeTeam: selectedTeamObject3.name,
            match2AwayTeam: selectedTeamObject4.name,
            match1Date: match1Date,
            match2Date: match2Date,
            match1Hour: match1Time,
            match2Hour: match2Time,
            betPrice: 0,
            accumulatedPrize: 0,
            accumulatedJackpot: jackpot,
            limitDateForBets: clubDate,
            limitHourForBets: clubTime,
            state: 'inProgress',
            numberOfWinners: 0
        }
        try {
            const clubCreated = await createClub(clubToCreate)
            console.log('Porra creada: ', clubCreated)
            navigate('/MyClubsList')
        } catch (error) {
            console.log('Error: ', error)
            setError(error.message)
        }
    }

    const handleTeam1 = (event) => {
        setSelectedTeam1(event.target.value)
        setSelectedTeamObject1(currentBadges.find(team => team.name === event.target.value))
    }

    const handleTeam2 = (event) => {
        setSelectedTeam2(event.target.value)
        setSelectedTeamObject2(currentBadges.find(team => team.id === event.target.value))
    }

    const handleTeam3 = (event) => {
        setSelectedTeam3(event.target.value)
        setSelectedTeamObject3(currentBadges.find(team => team.id === event.target.value))
    }

    const handleTeam4 = (event) => {
        setSelectedTeam4(event.target.value)
        setSelectedTeamObject4(currentBadges.find(team => team.id === event.target.value))
    }


    return (
        <div className='createClub' >
            <div className="createClub-container">
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
                                <option value="">Seleccione un equipo</option>
                                {currentBadges && currentBadges.map((team) => (
                                    <option key={team.id} value={team.name}>
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
                                <option value="">Seleccione un equipo</option>
                                {currentBadges && currentBadges.map((team) => (
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
                                <option value="">Seleccione un equipo</option>
                                {currentBadges && currentBadges.map((team) => (
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
                                <option value="">Seleccione un equipo</option>
                                {currentBadges && currentBadges.map((team) => (
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
                            value={betPrice}
                            onChange={ e => setBetPrice(e.target.value)}
                            label="Precio apuesta"
                            name="betPrice"
                        />
                    </div>
                    <div className="createClub-access">
                        <Button variant="primary-cta">
                            {"Crea la porra"}
                        </Button>
                    </div>
                </form>
                { error && 
                    <ErrorComponent errorText={error} />
                }
            </div>
        </div>
    )
}

export default CreateClub