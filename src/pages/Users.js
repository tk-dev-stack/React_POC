import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/bootstrap-extended.css';
import Loader from '../loading.gif';

class Users extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectAllCheckbox: false,
            checked: [],
            value: null,
            username: '',
            roleId: 0,
            loading: false,
            message: '',
            messageType: '',
            roles: [],
            selectedRoleId: 0
        }

        this.saveUser = this.saveUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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

        this.setState({ data: tempObject, message: '' });
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
        this.setState({ data: tempObject, message: '' });
    }

    changeUsernameHandler(event) {
        const value = event.target.value;
        this.setState({
            username: value,
            loading: false,
            message: '',
            messageType: ''
        });
    }

    refreshResults = (query) => {
        const fetchUsersUrl = `http://ST4W3153:9000/api/User/GetUersList`;

        axios.get(fetchUsersUrl, { withCredentials: true })
            .then(res => {

                var result = [];

                for (var i = 0; i < res.data.length; i++) {

                    result.push({
                        "UserId": res.data[i].UserId,
                        "Username": res.data[i].Username,
                        "RoleId": res.data[i].RoleId,
                        "RoleDesc": res.data[i].RoleDesc,
                        "checkedValue": false
                    })
                }

                this.setState({
                    data: result,
                    loading: false,
                    selectAllCheckbox: false,
                    username: '',
                    selectedRoleId: 0
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

    saveUser = (e) => {
        
        e.preventDefault();

        const saveUserUrl = `http://ST4W3153:9000/api/User/Save`;


        this.setState({ loading: true, message: '', messageType: '' });

        if (this.state.username && this.state.selectedRoleId !== 0) {

            var requestData = JSON.stringify({ Username: this.state.username, RoleId: this.state.selectedRoleId });

            axios.post(saveUserUrl, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
                .then(result => {
                    this.setState({
                        loading: false,
                        message: 'User added successfully!!!',
                        messageType: 'success',
                        selectAllCheckbox: false
                    });
                    this.refreshResults();
                })
                .catch(error => {
                    if (error) {
                        this.setState({
                            loading: false,
                            message: 'Failed to add user!!!',
                            messageType: 'danger',
                            selectAllCheckbox: false
                        });
                    }
                });
        }
        else {
            this.setState({ loading: false, message: 'Please fill all mandatory fields', messageType: 'danger' });
        }
    }

    deleteUser = () => {
        const deleteUrl = `http://ST4W3153:9000/api/User/Delete`;
        var tempObject = this.state.data;
        var tempReqObject = [];

        for (var i = 0; i < tempObject.length; i++) {
            if (tempObject[i].checkedValue === true) {

                tempReqObject.push({
                    "UserId": tempObject[i].UserId
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
                            message: 'Selected user(s) deleted successfully!!!',
                            messageType: 'success',
                            selectAllCheckbox: false
                        });

                        this.refreshResults();
                    })
                    .catch(error => {
                        if (error) {
                            this.setState({
                                loading: false,
                                message: 'Failed to delete user(s)!!!',
                                messageType: 'danger',
                                selectAllCheckbox: false
                            });
                        }
                    });
            }
        }
        else {
            this.setState({
                loading: false,
                message: 'Please select atleaset one item to perform delete',
                messageType: 'warning',
                selectAllCheckbox: false
            });
        }
    }

    componentDidMount() {
        const fetchUsersUrl = `http://ST4W3153:9000/api/User/GetUersList`;

        axios.get(fetchUsersUrl, { withCredentials: true })
            .then(res => {

                var result = [];

                for (var i = 0; i < res.data.length; i++) {

                    result.push({
                        "UserId": res.data[i].UserId,
                        "Username": res.data[i].Username,
                        "RoleId": res.data[i].RoleId,
                        "RoleDesc": res.data[i].RoleDesc,
                        "checkedValue": false,
                        selectAllCheckbox: false
                    })
                }

                this.setState({ data: result, message: '', messageType: '', loading: false, username: '', selectedRoleId: 0 });
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

        axios.get(`http://ST4W3153:9000/api/User/GetRoles`, { withCredentials: true })
            .then(res => {

                var result = [];
                for (var i = 0; i < res.data.length; i++) {
                    result.push({
                        "RoleId": res.data[i].RoleId,
                        "RoleDesc": res.data[i].RoleDesc
                    });
                }

                this.setState({
                    roles: [
                        {
                            RoleId: '0',
                            RoleDesc: 'Select a role'
                        }
                    ].concat(result)
                });
            })
            .catch(error => {
                console.log(error);
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
                        <div className="h2 d-flex justify-content-center">Manage user</div>
                        <div className="row">
                            <div className="container mt-50">
                                <div className={`border alert rounded-right border-left-10 border-${this.state.messageType} ${this.state.message ? "show" : "hide"}`}><label className="col-md-11">{this.state.message}</label></div>
                                <div className="row mt-25">
                                    <div className="col-md-3">
                                        <label className="col-form-label font-weight-bold" htmlFor="txtUser">Username</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" id="txtUser" name="txtUser" className="form-control"
                                            placeholder="User name" onChange={e =>
                                                this.setState({
                                                    username: e.target.value
                                                })
                                            } value={this.state.username} />
                                    </div>
                                </div>
                                <div className="row mt-25">
                                    <div className="col-md-3">
                                        <label className="col-form-label font-weight-bold" htmlFor="drpRole">Role</label>
                                    </div>
                                    <div className="col-md-8">
                                        <select className="form-control dropdown-font-small" id="drpRole"
                                            value={this.state.selectedRoleId}
                                            onChange={e =>
                                                this.setState({
                                                    selectedRoleId: e.target.value
                                                })
                                            }>
                                            {this.state.roles.map(role => (
                                                <option
                                                    key={role.RoleId}
                                                    value={role.RoleId}>
                                                    {role.RoleDesc}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-30">
                                    <div className="col-md-3">
                                    </div>
                                    <div className="col-md-3">
                                        <input type="button" className="btn btn-success" id="btnAdd" name="btnAdd" value="Add" onClick={this.saveUser}></input>
                                        <input type="button" className="btn btn-danger ml-2" id="btnDelete" name="btnDelete" value="Delete" onClick={this.deleteUser}></input>
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
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Role</th>
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
                                                                    <td>{item.Username}</td>
                                                                    <td>{item.RoleDesc}</td>
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
            </div >
        );
    }

};

export default Users;
