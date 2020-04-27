import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/bootstrap-extended.css';
import Loader from '../loading.gif';
import ModelPopup from '../components/Model';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectAllCheckbox: false,
            checked: [],
            value: null,
            search: '',
            test: '',
            loading: false,
            message: '',
            messageType: '',
            moreInfoObj: "",
            actionTypes: [],
            selectedActionTypes: [],
            resultTexts: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.deleteRowsData = this.deleteRowsData.bind(this);
        this.releaseRowsData = this.releaseRowsData.bind(this);
        this.handleResultTextChange=this.handleResultTextChange.bind(this);
        this.cancel = '';
    };

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

    setSelectedActionType = (event, index, rowId) => {

        const selectedActionType = event.target.value;

        var tempObject = this.state.data;
        for (var i = 0; i < tempObject.length; i++) {
            if (tempObject[i].RowId === rowId) {
                tempObject[i].ActionTypeId = selectedActionType;
                break;
            }
        }
       
        this.setState({ data: tempObject, message: '', loading: false });
        this.setState(oldActionType => {
            const newSelectedActionTypes = oldActionType.selectedActionTypes.slice();
            newSelectedActionTypes[index] = selectedActionType;
            return {
                selectedActionTypes: newSelectedActionTypes
            };
        });
    }

    handleResultTextChange = (event, index, rowId) => {

        const tesultText = event.target.value;

        var tempObject = this.state.data;
        for (var i = 0; i < tempObject.length; i++) {
            if (tempObject[i].RowId === rowId) {
                tempObject[i].ResultText = tesultText;
                break;
            }
        }
       
        this.setState({ data: tempObject, message: '', loading: false });
        this.setState(oldResultText => {
            const newResultTexts = oldResultText.resultTexts.slice();
            newResultTexts[index] = tesultText;
            return {
                resultTexts: newResultTexts
            };
        });
    }

    handleSearchChange(event) {
        const value = event.target.value;
        this.setState({
            search: value,
            loading: true,
            message: '',
            messageType: ''
        }, () => {
            this.fetchSearchResults(value);
        });
    }

    fetchSearchResults = (query) => {

        const newQuery = query.replace(/:/g, '-');

        const searchUrl = `http://ST4W3153:9000/api/search/${newQuery}`;

        if (this.cancel) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, { CancelToken: this.cancel.token, withCredentials: true })
            .then(res => {

                var result = [];

                const resultsNotFoundMessage = !res.data.length ? 'There are no search results' : '';

                for (var i = 0; i < res.data.length; i++) {

                    result.push({
                        "RowId": res.data[i].RowId,
                        "RecId": res.data[i].RecId,
                        "ID": res.data[i].ID,
                        "LaboratoryId": res.data[i].LaboratoryId,
                        "ReasonCode": res.data[i].ReasonCode,
                        "RecordId": res.data[i].RecordId,
                        "SamplingPoint": res.data[i].SamplingPoint,
                        "SampleDate": res.data[i].SampleDate,
                        "CollectedBy": res.data[i].CollectedBy,
                        "ReceivedBy": res.data[i].ReceivedBy,
                        "RecdDate": res.data[i].RecdDate,
                        "Component": res.data[i].Component,
                        "ResultText": res.data[i].ResultText,
                        "EnteredBy": res.data[i].EnteredBy,
                        "EnteredOn": res.data[i].EnteredOn,
                        "Authoriser": res.data[i].Authoriser,
                        "DateAuthorised": res.data[i].DateAuthorised,
                        "RecStatus": res.data[i].RecStatus,
                        "STWReceivedBy": res.data[i].STWReceivedBy,
                        "STWReceivedOn": res.data[i].STWReceivedOn,
                        "STWProcessStarted": res.data[i].STWProcessStarted,
                        "STWProcessStarter": res.data[i].STWProcessStarter,
                        "STWIncubator": res.data[i].STWIncubator,
                        "STWIncubatorIn": res.data[i].STWIncubatorIn,
                        "STWAnalystIn": res.data[i].STWAnalystIn,
                        "STWIncubatorOut": res.data[i].STWIncubatorOut,
                        "STWAnalystOut": res.data[i].STWAnalystOut,
                        "STWFilterBatch": res.data[i].STWFilterBatch,
                        "STWMedia": res.data[i].STWMedia,
                        "STWAnaerotestStrip": res.data[i].STWAnaerotestStrip,
                        "STWAnaerogenPack": res.data[i].STWAnaerogenPack,
                        "Manifold": res.data[i].Manifold,
                        "Pippette": res.data[i].Pippette,
                        "STWFunnelBox": res.data[i].STWFunnelBox,
                        "STWJarNumber": res.data[i].STWJarNumber,
                        "Worksheet": res.data[i].Worksheet,
                        "FailedLevel": res.data[i].FailedLevel,
                        "BactiDesc": res.data[i].BactiDesc,
                        "ActionTypeId": res.data[i].ActionTypeId,
                        "StatusId": res.data[i].StatusId,
                        "ScannedBy": res.data[i].ScannedBy,
                        "ScannedDate": res.data[i].ScannedDate,
                        "checkedValue": false
                    })
                }

                this.setState({
                    data: result,
                    message: resultsNotFoundMessage,
                    messageType: 'warning',
                    loading: false,
                    selectAllCheckbox: false,
                    search: '',
                    selectedActionTypes: []
                });
            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        message: 'Failed to fetch the data, please check the network',
                        messageType: 'danger',
                        loading: false,
                        selectAllCheckbox: false
                    })
                }
            });
    }

    getMoreInfo = (data, index) => {
        this.setState({ moreInfoObj: data });
        document.getElementById('lnkShowModelPop').click();
    }

    releaseRowsData = () => {
        const releaseUrl = `http://ST4W3153:9000/api/Search/Release`;
        var tempObject = this.state.data;
        var tempReqObject = [];
        var tempErrors=[];

        for (var i = 0; i < tempObject.length; i++) {
            if (tempObject[i].checkedValue === true) {

                if (tempObject[i].ActionTypeId === 0) {
                    tempErrors.push(`Action type not selected for the row number ${i + 1}`);
                } else {

                    tempReqObject.push({
                        "RowId": tempObject[i].RowId,
                        "RecId": tempObject[i].RecId,
                        "ID": tempObject[i].ID,
                        "LaboratoryId": tempObject[i].LaboratoryId,
                        "ReasonCode": tempObject[i].ReasonCode,
                        "RecordId": tempObject[i].RecordId,
                        "SamplingPoint": tempObject[i].SamplingPoint,
                        "SampleDate": tempObject[i].SampleDate,
                        "CollectedBy": tempObject[i].CollectedBy,
                        "ReceivedBy": tempObject[i].ReceivedBy,
                        "RecdDate": tempObject[i].RecdDate,
                        "Component": tempObject[i].Component,
                        "ResultText": tempObject[i].ResultText,
                        "EnteredBy": tempObject[i].EnteredBy,
                        "EnteredOn": tempObject[i].EnteredOn,
                        "Authoriser": tempObject[i].Authoriser,
                        "DateAuthorised": tempObject[i].DateAuthorised,
                        "RecStatus": tempObject[i].RecStatus,
                        "STWReceivedBy": tempObject[i].STWReceivedBy,
                        "STWReceivedOn": tempObject[i].STWReceivedOn,
                        "STWProcessStarted": tempObject[i].STWProcessStarted,
                        "STWProcessStarter": tempObject[i].STWProcessStarter,
                        "STWIncubator": tempObject[i].STWIncubator,
                        "STWIncubatorIn": tempObject[i].STWIncubatorIn,
                        "STWAnalystIn": tempObject[i].STWAnalystIn,
                        "STWIncubatorOut": tempObject[i].STWIncubatorOut,
                        "STWAnalystOut": tempObject[i].STWAnalystOut,
                        "STWFilterBatch": tempObject[i].STWFilterBatch,
                        "STWMedia": tempObject[i].STWMedia,
                        "STWAnaerotestStrip": tempObject[i].STWAnaerotestStrip,
                        "STWAnaerogenPack": tempObject[i].STWAnaerogenPack,
                        "Manifold": tempObject[i].Manifold,
                        "Pippette": tempObject[i].Pippette,
                        "STWFunnelBox": tempObject[i].STWFunnelBox,
                        "STWJarNumber": tempObject[i].STWJarNumber,
                        "Worksheet": tempObject[i].Worksheet,
                        "FailedLevel": tempObject[i].FailedLevel,
                        "BactiDesc": tempObject[i].BactiDesc,
                        "ActionTypeId": tempObject[i].ActionTypeId,
                        "StatusId": 1
                    });
                }
            }
        }
        if (tempErrors.length === 0) {
            if (tempReqObject.length > 0) {

                if (this.state.selectedActionType === '0') {
                    this.setState({ loading: true, message: 'Please select a action type', messageType: 'danger' });
                }
                else {

                    var reportData = JSON.stringify(tempReqObject);
                    this.setState({ loading: true, message: '', messageType: '' });
                    axios.post(releaseUrl, reportData, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    })
                        .then(result => {
                            this.setState({
                                message: 'Data released successfully!!!',
                                messageType: 'success',
                                loading: false,
                                selectAllCheckbox: false
                            });
                            this.refreshData();
                        })
                        .catch(error => {
                            if (error) {

                                this.setState({
                                    message: 'Failed to release the data!!!',
                                    messageType: 'danger',
                                    loading: false,
                                    selectAllCheckbox: false
                                });
                            }
                        });
                }
            } else {
                this.setState({
                    loading: false,
                    message: 'Please select atleaset one item to perform release',
                    messageType: 'warning',
                    selectAllCheckbox: false
                });
            }
        } else {
            let errorString = tempErrors.map(error => {
                return <p>{error}</p>
            });

            this.setState({
                loading: false,
                message: errorString,
                messageType: 'danger',
                selectAllCheckbox: false
            });
        }
    }

    deleteRowsData = () => {
        const deleteUrl = `http://ST4W3153:9000/api/Search/Delete`;
        var tempObject = this.state.data;
        var tempReqObject = [];

        for (var i = 0; i < tempObject.length; i++) {
            if (tempObject[i].checkedValue === true) {

                tempReqObject.push({
                    "RecId": tempObject[i].RecId,
                    "RowId": tempObject[i].RowId
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
                            message: 'Selected rows deleted successfully!!!',
                            loading: false,
                            messageType: 'success',
                            selectAllCheckbox: false
                        })

                        this.refreshData();
                    })
                    .catch(error => {
                        if (error) {
                            this.setState({
                                message: 'Failed to delete the rows!!!',
                                loading: false,
                                messageType: 'danger',
                                selectAllCheckbox: false
                            })
                        }
                    });
            }
        } else {
            this.setState({
                loading: false,
                message: 'Please select atleaset one item to perform delete',
                messageType: 'warning',
                selectAllCheckbox: false
            });
        }
    }


    refreshData = (query) => {
        const searchUrl = `http://ST4W3153:9000/api/search`;

        axios.get(searchUrl, { withCredentials: true })
            .then(res => {

                var result = [];
                for (var i = 0; i < res.data.length; i++) {

                    result.push({
                        "RowId": res.data[i].RowId,
                        "RecId": res.data[i].RecId,
                        "ID": res.data[i].ID,
                        "LaboratoryId": res.data[i].LaboratoryId,
                        "ReasonCode": res.data[i].ReasonCode,
                        "RecordId": res.data[i].RecordId,
                        "SamplingPoint": res.data[i].SamplingPoint,
                        "SampleDate": res.data[i].SampleDate,
                        "CollectedBy": res.data[i].CollectedBy,
                        "ReceivedBy": res.data[i].ReceivedBy,
                        "RecdDate": res.data[i].RecdDate,
                        "Component": res.data[i].Component,
                        "ResultText": res.data[i].ResultText,
                        "EnteredBy": res.data[i].EnteredBy,
                        "EnteredOn": res.data[i].EnteredOn,
                        "Authoriser": res.data[i].Authoriser,
                        "DateAuthorised": res.data[i].DateAuthorised,
                        "RecStatus": res.data[i].RecStatus,
                        "STWReceivedBy": res.data[i].STWReceivedBy,
                        "STWReceivedOn": res.data[i].STWReceivedOn,
                        "STWProcessStarted": res.data[i].STWProcessStarted,
                        "STWProcessStarter": res.data[i].STWProcessStarter,
                        "STWIncubator": res.data[i].STWIncubator,
                        "STWIncubatorIn": res.data[i].STWIncubatorIn,
                        "STWAnalystIn": res.data[i].STWAnalystIn,
                        "STWIncubatorOut": res.data[i].STWIncubatorOut,
                        "STWAnalystOut": res.data[i].STWAnalystOut,
                        "STWFilterBatch": res.data[i].STWFilterBatch,
                        "STWMedia": res.data[i].STWMedia,
                        "STWAnaerotestStrip": res.data[i].STWAnaerotestStrip,
                        "STWAnaerogenPack": res.data[i].STWAnaerogenPack,
                        "Manifold": res.data[i].Manifold,
                        "Pippette": res.data[i].Pippette,
                        "STWFunnelBox": res.data[i].STWFunnelBox,
                        "STWJarNumber": res.data[i].STWJarNumber,
                        "Worksheet": res.data[i].Worksheet,
                        "FailedLevel": res.data[i].FailedLevel,
                        "BactiDesc": res.data[i].BactiDesc,
                        "ActionTypeId": res.data[i].ActionTypeId,
                        "StatusId": res.data[i].StatusId,
                        "ScannedBy": res.data[i].ScannedBy,
                        "ScannedDate": res.data[i].ScannedDate,
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
                        messageType: 'danger',
                        loading: false,
                        selectAllCheckbox: false
                    });
                }
            })
    }


    render() {
        return (
            <div className="form-group ml-3 mr-5 mt-50">
                <div className="h2 d-flex justify-content-center">Search</div>
                <div className="row">
                    <div className={`col-md-11 ml-5 mb-20 border alert rounded-right border-left-10 border-${this.state.messageType} ${this.state.message ? "show" : "hide"}`}><label className="col-md-12">{this.state.message}</label></div>
                    <div className="col-md-12 mt-20">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row col-md-6">
                                    <label className="col-sm-2 col-form-label font-weight-bold" htmlFor="txtSearch">ID</label>
                                    <input type="text" id="txtSearch" name="txtSearch" className="form-control col-sm-8"
                                        placeholder="Search" onChange={this.handleSearchChange} value={this.state.search} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row float-right">
                                    <input type="button" className="btn btn-success ml-2" id="btnRelease" name="btnRelease" value="Release" onClick={this.releaseRowsData}></input>
                                    <input type="button" className="btn btn-danger ml-2" id="btnDelete" name="btnDelete" value="Delete" onClick={this.deleteRowsData}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={Loader} className={`search-loading ${this.state.loading ? "show" : "hide"}`} alt="Loading..." />
                    </div>
                    <div className="table-responsive ml-3 col-md-12">
                        <table className="table table-striped small">
                            <thead>
                                <tr className="bg-success text-white">
                                    <th scope="col">
                                        <label className="checkbox">
                                            <input
                                                type="checkbox"
                                                onChange={this.selectAllCheckbox.bind(this)}
                                                checked={this.state.selectAllCheckbox}
                                            />
                                            <span className="success"></span>
                                        </label>

                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Laboratory ID</th>
                                    <th scope="col">Reason code</th>
                                    <th scope="col">Record ID</th>
                                    <th scope="col">Sampling point</th>
                                    <th scope="col">Sampled date</th>
                                    <th scope="col">Collected by</th>
                                    <th scope="col">Component</th>
                                    <th scope="col">Result text</th>
                                    <th scope="col">Entered by</th>
                                    <th scope="col">Entered on</th>
                                    <th scope="col">Rec status</th>
                                    <th scope="col">Failed revel</th>
                                    <th scope="col">Action Type</th>
                                    <th scope="col"></th>
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
                                                    <td>{item.ID}</td>
                                                    <td>{item.LaboratoryId}</td>
                                                    <td>{item.ReasonCode}</td>
                                                    <td>{item.RecordId}</td>
                                                    <td>{item.SamplingPoint}</td>
                                                    <td>{item.SampleDate}</td>
                                                    <td>{item.CollectedBy}</td>
                                                    <td>{item.Component}</td>
                                                    <td><input type="text" className="form-control dropdown-font-small" value={item.ResultText} 
                                                    onChange={e => this.handleResultTextChange(e, index, item.RowId)} /></td>
                                                    <td>{item.EnteredBy}</td>
                                                    <td>{item.EnteredOn}</td>
                                                    <td>{item.RecStatus}</td>
                                                    <td>{item.FailedLevel}</td>
                                                    <td>
                                                        <select className="form-control dropdown-font-small"
                                                            value={this.state.selectedActionTypes[index]}
                                                            onChange={e => this.setSelectedActionType(e, index, item.RowId)}>
                                                            {this.state.actionTypes.map(actionType => (
                                                                <option
                                                                    key={actionType.ActionTypeId}
                                                                    value={actionType.ActionTypeId}>
                                                                    {actionType.ActionTypeDesc}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td><input type="button" value="More info" id="btnMore" name="btnMore" className="btn btn-info btn-sm" onClick={this.getMoreInfo.bind(this, item, index)}></input></td>
                                                </tr>
                                            )
                                        },
                                        )
                                        : <tr>
                                            <td colSpan="17"><p className="text-center lead">No records found!!!</p></td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Model popup */}
                <div className="row">
                    <ModelPopup reportData={this.state.moreInfoObj} />
                </div>
            </div >
        );
    }

    componentDidMount() {
        this.setState({ data: [], message: '', loading: false });
        axios.get("http://ST4W3153:9000/api/search", { withCredentials: true }).then(res => {
            var tempData = [];

            for (var i = 0; i < res.data.length; i++) {
                tempData.push({
                    "RowId": res.data[i].RowId,
                    "RecId": res.data[i].RecId,
                    "ID": res.data[i].ID,
                    "LaboratoryId": res.data[i].LaboratoryId,
                    "ReasonCode": res.data[i].ReasonCode,
                    "RecordId": res.data[i].RecordId,
                    "SamplingPoint": res.data[i].SamplingPoint,
                    "SampleDate": res.data[i].SampleDate,
                    "CollectedBy": res.data[i].CollectedBy,
                    "ReceivedBy": res.data[i].ReceivedBy,
                    "RecdDate": res.data[i].RecdDate,
                    "Component": res.data[i].Component,
                    "ResultText": res.data[i].ResultText,
                    "EnteredBy": res.data[i].EnteredBy,
                    "EnteredOn": res.data[i].EnteredOn,
                    "Authoriser": res.data[i].Authoriser,
                    "DateAuthorised": res.data[i].DateAuthorised,
                    "RecStatus": res.data[i].RecStatus,
                    "STWReceivedBy": res.data[i].STWReceivedBy,
                    "STWReceivedOn": res.data[i].STWReceivedOn,
                    "STWProcessStarted": res.data[i].STWProcessStarted,
                    "STWProcessStarter": res.data[i].STWProcessStarter,
                    "STWIncubator": res.data[i].STWIncubator,
                    "STWIncubatorIn": res.data[i].STWIncubatorIn,
                    "STWAnalystIn": res.data[i].STWAnalystIn,
                    "STWIncubatorOut": res.data[i].STWIncubatorOut,
                    "STWAnalystOut": res.data[i].STWAnalystOut,
                    "STWFilterBatch": res.data[i].STWFilterBatch,
                    "STWMedia": res.data[i].STWMedia,
                    "STWAnaerotestStrip": res.data[i].STWAnaerotestStrip,
                    "STWAnaerogenPack": res.data[i].STWAnaerogenPack,
                    "Manifold": res.data[i].Manifold,
                    "Pippette": res.data[i].Pippette,
                    "STWFunnelBox": res.data[i].STWFunnelBox,
                    "STWJarNumber": res.data[i].STWJarNumber,
                    "Worksheet": res.data[i].Worksheet,
                    "FailedLevel": res.data[i].FailedLevel,
                    "BactiDesc": res.data[i].BactiDesc,
                    "ActionTypeId": res.data[i].ActionTypeId,
                    "StatusId": res.data[i].StatusId,
                    "ScannedBy": res.data[i].ScannedBy,
                    "ScannedDate": res.data[i].ScannedDate,
                    "checkedValue": false
                })
            }
            this.setState({
                data: tempData,
                message: '',
                messageType: '',
                loading: false,
                selectAllCheckbox: false
            })
        });

        axios.get(`http://ST4W3153:9000/api/Search/GetActionTypes`, { withCredentials: true })
            .then(res => {

                var result = [];
                for (var i = 0; i < res.data.length; i++) {
                    result.push({
                        "ActionTypeId": res.data[i].ActionTypeId,
                        "ActionTypeDesc": res.data[i].ActionTypeDesc
                    });
                }

                this.setState({
                    actionTypes: [
                        {
                            ActionTypeId: '0',
                            ActionTypeDesc: 'Select action type'
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
}

export default Search;