import React, { useContext } from 'react';
import { Menu, Container, Button, Image, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;
    return (
        <Menu fixed="top" inverted >
            <Container>
            <Menu.Item header
             exact
             as={NavLink} to='/'> 
            <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
            Reactivities
            </Menu.Item>
            <Menu.Item as={NavLink} to='/activities'
                name='Activities'
            />
            <Menu.Item>
                <Button positive content="Create Activity" 
                as={NavLink} to='/createActivity'/>
            </Menu.Item>
            {user && 
            <Menu.Item position='right'>
                <Image avatar spaced src={user.image || '/assets/user.png'}/>
                <Dropdown pointing='top left' text={user.displayName}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/username`} 
                        text='My profile' icon='user'/>
                        <Dropdown.Item onClick={logout} text='logout' icon='power'/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            }
            </Container>
        </Menu>
    );
};

export default observer(NavBar);