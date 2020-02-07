import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../app/stores/activityStore'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const activityStore = useContext(ActivityStore);
    const{openCreateForm} = activityStore
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
            </Container>
        </Menu>
    );
};

export default observer(NavBar);