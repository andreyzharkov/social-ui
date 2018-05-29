import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Fetch from './Fetch';
// import Feed from './Feed';
import {get_id, get_token} from "./api";

function getAge(birthday) {
    let date = new Date(birthday);
    let ageDiff = new Date(Date.now() - date.getTime());
    return Math.abs(ageDiff.getUTCFullYear() - 1970);
}

function getAvatar(user) {
    if (user.imageUrl) {
        return user.imageUrl;
    }
    return '/icons/default-profile.jpg';
}

const ProfileBase = ({data, isLoading, error, currentUserId}) => {

    const profile = data;

    if (error) {
        return (
            <div className="global-error global-info">{error.message}</div>
        )
    }

    if (isLoading) {
        return (
            <div className="global-info">Loading...</div>
        )
    }

    return (
        <div className="global-flex">
            <section className="person-block">
                <div className="global-avatar avatar">
                    <img src={getAvatar(profile)} className="global-avatar-image avatar-image" alt="Avatar" />
                </div>
                <div className="info">
                    <div className="name">
                        {profile.name}
                    </div>
                    <div className="global-text city">
                        {getAge(profile.birthday)} years<br/>
                        {String(currentUserId) === String(profile.id) ?
                            <Link to={`/edit`} className="edit-link">Edit my profile</Link> :
                            ''}<br/>
                    </div>
                    <div className="message">
                        <span className="message-text">
                            {'"' + profile.info + '"'}
                        </span>
                    </div>
                </div>

            </section>
            {console.log(profile)}
        </div>
    );
};


class Profile extends Component {
    render() {
        let FetchedComponent = Fetch('GET', `users/${this.props.match.params.number}`,
            {token: get_token(), currentUserId: get_id()})(ProfileBase);
        return <FetchedComponent />
    }
}

export default Profile;
