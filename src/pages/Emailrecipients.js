import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/bootstrap-extended.css';
import Loader from '../loading.gif';
import validator from 'email-validator';

class EmailRecipients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectAllCheckbox: false,
            checked: [],
            value: null,
            email: '',
            loading: false,
            message: '',
            messageType: ''
        }

        this.addEmail = this.addEmail.bind(this);
        this.deleteEmails = this.deleteEmails.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.cancel = '';
    }

    selectAllCheckbox = (e) => {
        var selectAll = e.target.checked;
        this.setState({ selectAllCheckbox: selectAll });
        var tempObject = this.state.data;
        if (e.target.checked === true) {
            for (var i = 0; i < tempObject.length; i++) {
                tempObject[i].checkedValue = true;
            } 
        }
        if (e.target.checked === false) {
            for (var i = 0; i < tempObject.length; i++) {
                tempObject[i].checkedValue = false;
            } 
        }

        this.setState({ data: tempObject, message:'' });
    }

    singleCheckbox = (index, ObjectValue, date) => {
        if (this.state.selectAllCheckbox === true) {
            this.setState({ selectAllCheckbox: false });
        }
        var tempObject = this.state.data;
        for (var i = 0; i < tempObject.length; i++) {
            if (i === index) {
                (tempObject[i].checkedValue === true) ? tempObject[i].checkedValue = false : tempObject[i].checkedValue = true;
            }
        }
        this.setState({ data: tempObject, message:'' });
    }

    changeHandler(event) {
        const value = event.target.value;
        this.setState({
            email: value,
            loading: false,
            message: '',
            messageType: ''
        });
    }


    refreshResults = (query) => {
        const fetchEmailsUrl = `http://ST4W3153:9000/api/EmailRecipient`;

        if (this.cancel) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();

        axios.get(fetchEmailsUrl, { CancelToken: this.cancel.token, withCredentials: true })
            .then(res => {

                var result = [];

                for (var i = 0; i < res.data.length; i++) {

                    result.push({
                        "RecipientId": res.data[i].RecipientId,
                        "Email": res.data[i].Email,
                        "checkedValue": false
                    })
                }

                this.setState({
                    data: result,
                    loading: false,
                    selectAllCheckbox: false
                });
            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        message: 'Failed to fetch the data, please check the network',
                        loading: false,
                        messageType: 'danger',
                        selectAllCheckbox: false
                    })
                }
            });
    }

    addEmail = (e) => {
        e.preventDefault();

        const addEmailUrl = `http://ST4W3153:9000/api/EmailRecipient/Add`;

        
        this.setState({ loading: true, message: '', messageType: '' });

        if(validator.validate(this.state.email))
        {

        var requestData = JSON.stringify(this.state.email);

        axios.post(addEmailUrl, requestData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(result => {
                this.setState({
                    loading: false,
                    message: 'Email added successfully!!!',
                    messageType: 'success',
                    selectAllCheckbox: false
                });
                this.refreshResults();
            })
            .catch(error => {
                if (error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to add email address!!!',
                        messageType: 'danger',
                        selectAllCheckbox: false
                    });
                }
            });
        }
        else{
            this.setState({ loading: false, message: 'Please enter valid email address', messageType: 'danger' });
        }
    }

    deleteEmails = () => {
        const deleteUrl = `http://ST4W3153:9000/api/EmailRecipient/Delete`;
        var tempObject = this.state.data;
        var tempReqObject = [];

        for (var i = 0; i < tempObject.length; i++) {
            if (tempObject[i].checkedValue === true) {

                tempReqObject.push({
                    "RecipientId": tempObject[i].RecipientId
                })
            }
        }

        if (tempReqObject.length > 0) {

            const deleteConfirm = window.confirm("Are you sure you wish to delete this item(s)?");
            if (deleteConfirm === true) {

                var reportData = JSON.stringify(tempReqObject);
                this.setState({ loading: true, message: '', messageType: '' });
                axios.post(deleteUrl, reportData, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                    .then(result => {
                        this.setState({
                            loading: false,
                            message: 'Selected emails deleted successfully!!!',
                            messageType: 'success',
                            selectAllCheckbox: false
                        });

                        this.refreshResults();
                    })
                    .catch(error => {
                        if (error) {
                            this.setState({
                                loading: false,
                                message: 'Failed to delete emails!!!',
                                messageType: 'danger',
                                selectAllCheckbox: false
                            });
                        }
                    });
            }
        }
        else{
            this.setState({
                loading: false,
                message: 'Please select atleaset one item to perform delete',
                messageType: 'warning',
                selectAllCheckbox: false
            });
        }
    }

    componentDidMount() {
        const fetchEmailsUrl = `http://ST4W3153:9000/api/EmailRecipient`;

        axios.get(fetchEmailsUrl, { withCredentials: true })
            .then(res => {

                var result = [];

                for (var i = 0; i < res.data.length; i++) {

                    result.push({
                        "RecipientId": res.data[i].RecipientId,
                        "Email": res.data[i].Email,
                        "checkedValue": false,
                        selectAllCheckbox: false
                    })
                }

                this.setState({ data: result, message: '', messageType: '', loading: false });
            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        message: 'Failed to fetch the data, please check the network',
                        loading: false,
                        messageType: 'danger',
                        selectAllCheckbox: false
                    })
                }
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (

            <div className="container mt-50">
                <div className="row">
                    <div className="col-md-2" />
                    <div className="col-md-8">
                        <div className="h2 d-flex justify-content-center">Manage email recipients</div>
                        <div className="row">
                            <div className="container mt-50">
                                <div className={`border alert rounded-right border-left-10 border-${this.state.messageType} ${this.state.message ? "show" : "hide"}`}><label className="col-md-11">{this.state.message}</label></div>
                                <div className="row mt-25">
                                    <div className="col-md-3">
                                        <label className="col-form-label font-weight-bold" htmlFor="txtEmail">Email address</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" id="txtEmail" name="txtEmail" className="form-control"
                                            placeholder="Email address" onChange={this.changeHandler} value={this.state.email} />
                                    </div>
                                </div>
                                <div className="row mt-30">
                                    <div className="col-md-3">
                                    </div>
                                    <div className="col-md-3">
                                        <input type="button" className="btn btn-success" id="btnAdd" name="btnAdd" value="Add" onClick={this.addEmail}></input>
                                        <input type="button" className="btn btn-danger ml-2" id="btnDelete" name="btnDelete" value="Delete" onClick={this.deleteEmails}></input>                                        
                                    </div>
                                </div>
                                <div className="row mt-10">
                                    <img src={Loader} className={`search-loading ${this.state.loading ? "show" : "hide"}`} alt="Loading..." />
                                </div>
                                <div className="row mt-20">

                                    <div className="table-responsive">
                                        <table className="table table-striped small">
                                            <thead>
                                                <tr className="bg-success text-white">
                                                    <th scope="col" className="fixed-width-50">
                                                        <label className="checkbox">
                                                            <input
                                                                type="checkbox"
                                                                onChange={this.selectAllCheckbox.bind(this)}
                                                                checked={this.state.selectAllCheckbox}
                                                            />
                                                            <span className="success"></span>
                                                        </label>

                                                    </th>
                                                    <th scope="col">Email Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.data.length > 0
                                                        ? this.state.data.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <label className="checkbox">
                                                                            <input type="checkbox" checked={item.checkedValue}
                                                                                onChange={this.singleCheckbox.bind(this, index, item)} />
                                                                            <span className="success"></span>
                                                                        </label>
                                                                    </td>
                                                                    <td>{item.Email}</td>
                                                                </tr>
                                                            )
                                                        },
                                                        )
                                                        : <tr>
                                                            <td colSpan="3"><p className="text-center lead">No records found!!!</p></td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="colmd-2" />
            </div>


        );
    }

};

export default EmailRecipients;
