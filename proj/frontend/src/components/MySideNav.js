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
            <NavItem eventKey="home">
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
            </NavItem>

            <NavItem eventKey="update">
                <NavText>Update</NavText>
            </NavItem>

            <NavItem eventKey="aq">
                <NavText>Advanced Queries</NavText>
                <NavItem eventKey="aq1">
                    <NavText>AQ1</NavText>
                </NavItem>
                <NavItem eventKey="aq2">
                    <NavText>AQ2</NavText>
                </NavItem>
            </NavItem>

            <NavItem eventKey="procedure">
                <NavText>Stored Procedure</NavText>

            </NavItem>

            </SideNav.Nav>
        </SideNav>
    );
}

export default MySideNav;