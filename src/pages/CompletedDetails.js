import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/bootstrap-extended.css';
import Loader from '../loading.gif';
import ModelPopupCompleted from '../components/ModelCompleted'; 

class CompletedDetails extends React.Component {
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
            moreInfoObj: ""
        }

        this.deleteRowsData = this.deleteRowsData.bind(this);
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

    fetchSearchResults = (query) => {
        const searchUrl = `http://ST4W3153:9000/api/Completed`;

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
                        "StatusId": res.data[i].StatusId,
                        "ActionTypeDesc":res.data[i].ActionTypeDesc,
                        "PHSActionTypeDesc":res.data[i].PHSActionTypeDesc,
                        "ScannedBy": res.data[i].ScannedBy,
                        "ScannedDate": res.data[i].ScannedDate,
                        "ReleasedBy": res.data[i].ReleasedBy,
                        "ReleasedDate": res.data[i].ReleasedDate,
                        "CompletedBy": res.data[i].CompletedBy,
                        "CompletedDate": res.data[i].CompletedDate,
                        "checkedValue": false
                    })
                }

                this.setState({
                    data: result,
                    message: resultsNotFoundMessage,
                    messageType: 'warning',
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

    getMoreInfo = (data, index) => {
        this.setState({ moreInfoObj: data });
        document.getElementById('lnkShowModelPop').click();
    }

    deleteRowsData = () => {
        const deleteUrl = `http://ST4W3153:9000/api/Completed/Delete`;
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
        } else{
            this.setState({
                loading: false,
                message: 'Please select atleaset one item to perform delete',
                messageType: 'warning',
                selectAllCheckbox: false
            });
        }
    }

    refreshData = (query) => {
        const searchUrl = `http://ST4W3153:9000/api/Completed`;

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
                        "StatusId": res.data[i].StatusId,
                        "ActionTypeDesc":res.data[i].ActionTypeDesc,
                        "PHSActionTypeDesc":res.data[i].PHSActionTypeDesc,
                        "ScannedBy": res.data[i].ScannedBy,
                        "ScannedDate": res.data[i].ScannedDate,
                        "ReleasedBy": res.data[i].ReleasedBy,
                        "ReleasedDate": res.data[i].ReleasedDate,
                        "CompletedBy": res.data[i].CompletedBy,
                        "CompletedDate": res.data[i].CompletedDate,
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
                    })
                }
            });
    }

    render() {
        return (
            <div className="form-group ml-3 mr-5 mt-50">
                <div className="h2 d-flex justify-content-center">Completed details</div>
                <div className="row">
                    <div className={`col-md-11 ml-5 mb-20 border alert rounded-right border-left-10 border-${this.state.messageType} ${this.state.message ? "show" : "hide"}`}><label className="col-md-12">{this.state.message}</label></div>
                    <div className="col-md-12 mt-5">
                        <div className="row">
                            <div className="form-group col-md-6">
                                {/* No Search */}
                            </div>
                            <div className="form-group col-md-12">
                                <div className="row float-right">
                                    <div className="col-md-12">
                                        <input type="button" className="btn btn-danger" id="btnDelete" name="btnDelete" value="Delete" onClick={this.deleteRowsData}></input>
                                    </div>
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
                                                    <td>{item.ResultText}</td>
                                                    <td>{item.EnteredBy}</td>
                                                    <td>{item.EnteredOn}</td>
                                                    <td>{item.RecStatus}</td>
                                                    <td>{item.FailedLevel}</td>
                                                    <td><input type="button" value="More info" id="btnMore" name="btnMore" className="btn btn-info btn-sm" onClick={this.getMoreInfo.bind(this, item, index)}></input></td>
                                                </tr>
                                            )
                                        },
                                        )
                                        :
                                        <tr>
                                            <td colSpan="15"><p className="text-center lead">No records found!!!</p></td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Model popup */}
                <div className="row">
                    <ModelPopupCompleted reportData={this.state.moreInfoObj} />
                </div>
            </div >
        );
    }

    componentDidMount() {
        this.setState({ data: [], message: '', messageType: '', loading: false });
        axios.get(`http://ST4W3153:9000/api/Completed`, { withCredentials: true }).then(res => {
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
                    "StatusId": res.data[i].StatusId,
                    "ActionTypeDesc":res.data[i].ActionTypeDesc,
                    "PHSActionTypeDesc":res.data[i].PHSActionTypeDesc,
                    "ScannedBy": res.data[i].ScannedBy,
                    "ScannedDate": res.data[i].ScannedDate,
                    "ReleasedBy": res.data[i].ReleasedBy,
                    "ReleasedDate": res.data[i].ReleasedDate,
                    "CompletedBy": res.data[i].CompletedBy,
                    "CompletedDate": res.data[i].CompletedDate,
                    "checkedValue": false
                })
            }
            this.setState({ data: tempData, message: '', messageType: '', loading: false, selectAllCheckbox: false })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
}

export default CompletedDetails;