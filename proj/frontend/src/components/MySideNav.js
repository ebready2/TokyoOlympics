import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from 'react-router-dom';

function MySideNav() {
    const navigate = useNavigate();

    return (<SideNav
        onSelect={selected => {
            console.log(selected)
            navigate('/'+selected)
        }}
        classame='mysidenav'
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="Home">
                <NavText>Home</NavText>
            </NavItem>

            <NavItem>
                <NavText>Search</NavText>
                <NavItem eventKey="NOC">
                    <NavText>NOC</NavText>
                </NavItem>
                <NavItem eventKey="Athlete">
                    <NavText>Athlete</NavText>
                </NavItem>
                <NavItem eventKey="Coach">
                    <NavText>Coach</NavText>
                </NavItem>
                <NavItem eventKey="Discipline">
                    <NavText>Discipline</NavText>
                </NavItem>
                <NavItem eventKey="Team">
                    <NavText>Team</NavText>
                </NavItem>
                <NavItem eventKey="Participate">
                    <NavText>Participate</NavText>
                </NavItem>
            </NavItem>

            <NavItem eventKey="Insert">
                <NavText>Insert</NavText>
            </NavItem>

            <NavItem eventKey="Delete">
                <NavText>Delete</NavText>
            </NavItem>

            <NavItem eventKey="Update">
                <NavText>Update</NavText>
            </NavItem>

            <NavItem>
                <NavText>Advanced Queries</NavText>
                <NavItem eventKey="AQ1">
                    <NavText>AQ1</NavText>
                </NavItem>
                <NavItem eventKey="AQ2">
                    <NavText>AQ2</NavText>
                </NavItem>
            </NavItem>

            </SideNav.Nav>
        </SideNav>
    );
}

export default MySideNav;