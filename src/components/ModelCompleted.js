import React from 'react';
import Modal from "react-bootstrap/Modal";

const ModelPopupComplete = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <a href="#" id="lnkShowModelPop" name="lnkShowModelPop" className="btn btn-lg btn-success" style={{ display: 'none' }}
        data-toggle="modal" data-target="#basicModal" onClick={showModal}>
      </a>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title>More info...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light small"><div className="container-fluid">
        <div className="row">
            <div className="col-md-6">Received by</div>
            <div className="col-md-6 ml-auto">{props.reportData.ReceivedBy}</div>
          </div>
          <div className="row">
            <div className="col-md-6">Received on</div>
            <div className="col-md-6 ml-auto">{props.reportData.RecdDate}</div>
          </div>
          <div className="row">
            <div className="col-md-6">Authoriser</div>
            <div className="col-md-6 ml-auto">{props.reportData.Authoriser}</div>
          </div>
          <div className="row">
            <div className="col-md-6">Date authorised</div>
            <div className="col-md-6 ml-auto">{props.reportData.DateAuthorised}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW received by</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWReceivedBy}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW received on</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWReceivedOn}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW process started</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWProcessStarted}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW process starter</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWProcessStarter}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW incubator</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWIncubator}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW incubator in</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWIncubatorIn}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW analysis in</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWAnalystIn}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW incubator out</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWIncubatorOut}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW analysis out</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWAnalystOut}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW filter batch</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWFilterBatch}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW media</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWMedia}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW anaerotest strip</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWAnaerotestStrip}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW anaerogen pack</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWAnaerogenPack}</div>
          </div>
          <div className="row">
            <div className="col-md-6">Manifold</div>
            <div className="col-md-6 ml-auto">{props.reportData.Manifold}</div>
          </div>
          <div className="row">
            <div className="col-md-6">Pippette</div>
            <div className="col-md-6 ml-auto">{props.reportData.Pippette}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW funnel box</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWFunnelBox}</div>
          </div>
          <div className="row">
            <div className="col-md-6">STW jar number</div>
            <div className="col-md-6 ml-auto">{props.reportData.STWJarNumber}</div>
          </div>
          <div className="row">
            <div className="col-md-6">Worksheet</div>
            <div className="col-md-6 ml-auto">{props.reportData.Worksheet}</div>
          </div>
          <div className="row">
            <div className="col-md-6">Bacti desc</div>
            <div className="col-md-6 ml-auto">{props.reportData.BactiDesc}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">Action type</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.ActionTypeDesc}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">PHS Action type</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.PHSActionTypeDesc}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">Scanned by</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.ScannedBy}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">Scanned date</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.ScannedDate}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">Released by</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.ReleasedBy}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">Released date</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.ReleasedDate}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">Completed by</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.CompletedBy}</div>
          </div>
          <div className="row">
            <div className="col-md-6 font-weight-bold">Completed date</div>
            <div className="col-md-6 ml-auto font-weight-bold">{props.reportData.CompletedDate}</div>
          </div>
        </div></Modal.Body>
        <Modal.Footer className="bg-light">
          <button onClick={hideModal} className="btn btn-primary btn-sm">Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelPopupComplete;