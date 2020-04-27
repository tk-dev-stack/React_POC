import React from 'react';
import SearchPage from '../pages/Search';
import ReleasedPage from '../pages/ReleasedDetails';
import CompletedPage from '../pages/CompletedDetails';
import EmailRecipientsPage from '../pages/EmailRecipients';

// Private routes.
const Search = () => <SearchPage/>;
const Released = () => <ReleasedPage />;
const Completed = () => <CompletedPage/>;
const EmailRecipients = () => <EmailRecipientsPage/>;

export {
	Search,
	Released,
	Completed,
	EmailRecipients
};
