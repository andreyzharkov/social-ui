import React, {Component} from 'react';

import Fetch from './Fetch';
import {get_token, get_id} from './api'
import {Link} from 'react-router-dom';
import './Feed.css'

function formatDate(date) {
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();

    function leadingZeros(value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    }

    day = leadingZeros(day);
    month = leadingZeros(month);
    hours = leadingZeros(hours);
    minutes = leadingZeros(minutes);

    return `${hours}:${minutes} ${day}.${month}.${year}`
}

function getAvatar(user) {
    if (user.imageUrl) {
        return user.imageUrl;
    }
    return '/icons/default-avatar.png';
}

const FeedBase = ({data, isLoading, error, userId, type}) => {

    const posts = data;

    if (error) {
        return (
            <div>{error.message}</div>
        )
    }

    if (isLoading || userId == null) {
        return (
            <div>Loading...</div>
        )
    }

    if (posts.length === 0) {
        return (
            <div>EMPTY</div>
        )
    }

    return (
        <div>
            {posts.map(post =>
                <article key={post.id} className="feed-entry">
                    <div className="global-header feed-entry-header">
                    <span className="feed-entry-author">
                        <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
                    </span>
                        <span className="global-text feed-entry-date">{formatDate(post.dateTime)}</span>
                        <br/>
                    </div>
                    <div className="feed-entry-post">
                        <img src={getAvatar(post.user)} className="feed-entry-avatar" alt="Post" />
                        <div className="global-text feed-entry-text">
                            {post.text}
                            {post.imageUrl ?
                                <img src={post.imageUrl} className="feed-entry-image" width="100px" alt="Post" />
                                : ''
                            }
                        </div>
                    </div>
                </article>
            )}
        </div>
    );
};

class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasNewPost: false,
            type: this.props.type,
            userId: get_id(),
            token: get_token()
        };

        this.update = this.update.bind(this);
    }

    update() {
        // Just to update component
        this.setState({hasNewPost: true});
        this.setState({hasNewPost: false});
    }

    render() {
        let FetchedComponent = Fetch('GET', `users/${this.state.userId}/posts/${this.state.type}`,
            {token: this.state.token, userId: this.state.userId, type: this.state.type})(FeedBase);

        return (
            <section className="feed-block">
                <div className="feed-block-scroll">
                    <FetchedComponent />
                </div>
            </section>
        )
    }
}

export default Feed;
