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

            <NavItem eventKey="search">
                <NavText>Search</NavText>
            </NavItem>

            <NavItem eventKey="insert">
                <NavText>Insert</NavText>
            </NavItem>

            <NavItem eventKey="delete">
                <NavText>Delete</NavText>
                <NavItem eventKey="delete/noc">
                    <NavText>NOC</NavText>
                </NavItem>
                <NavItem eventKey="delete/athlete">
                    <NavText>Athlete</NavText>
                </NavItem>
                <NavItem eventKey="delete/coach">
                    <NavText>Coach</NavText>
                </NavItem>
                <NavItem eventKey="delete/team">
                    <NavText>Team</NavText>
                </NavItem>
                <NavItem eventKey="delete/discipline">
                    <NavText>Discipline</NavText>
                </NavItem>
                <NavItem eventKey="delete/participate">
                    <NavText>Participate</NavText>
                </NavItem>
            </NavItem>

            <NavItem eventKey="update">
                <NavText>Update</NavText>
            </NavItem>

            <NavItem>
                <NavText>Advanced Queries</NavText>
                <NavItem eventKey="aq/aq1">
                    <NavText>AQ1</NavText>
                </NavItem>
                <NavItem eventKey="aq/aq2">
                    <NavText>AQ2</NavText>
                </NavItem>
            </NavItem>

            </SideNav.Nav>
        </SideNav>
    );
}

export default MySideNav;