import React, { Component } from 'react';
import Search from './pages/Search';
import ReleasedDetails from './pages/ReleasedDetails';
// import EmailRecipients from './pages/EmailRecipients';
import CompletedDetails from './pages/CompletedDetails';
import Users from './pages/Users';

export const PageSearch = () => (
    <div>
        <Search/>
    </div>
)

export const PageReleased = () => (
    <div>
        <ReleasedDetails/>
    </div>
)

export const PageCompleted = () => (
    <div>
       <CompletedDetails/>
    </div>
)

// export const PageEmailRecipients = () => (
//     <div>
//         <EmailRecipients/>
//     </div>
// )

export const PageUser = () => (
    <div>
        <Users/>
    </div>
)