import React, { Component } from 'react';
import './App.css';
import { PageSearch, PageReleased, PageCompleted,PageUser } from './pages';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './logo.png';

const CompanyLogo = () =>
  (
    <div className="float-right">
    <img src={Logo} alt="Logo"></img>
    </div>
  )

const Main = () => (
  <main>
    <Switch>
          
      <Route exact path='/' component={PageSearch} />
      <Route exact path='/Released' component={PageReleased} />
      <Route exact path='/Completed' component={PageCompleted} />       
      <Route exact path='/User' component={PageUser} /> 
    </Switch>
  </main>
)

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      links: [
        { path: "/Search", text: "Search", isActive: true },       
        { path: "/Released", text: "Released details", isActive: false },
        { path: "/Completed", text: "Completed details", isActive: false },
        { path: "/EmailRecipients", text: "Manage email recipients", isActive: false },
        { path: "/User", text: "Manage user", isActive: false },
      ],
      
      Permission:["Search","Completed","User"]
    }

  }

  handleClick(i) {
    const links = this.state.links.slice();
    for (const j in links) {
      links[j].isActive = i === j;
    }
    this.setState({ links: links });
  }
  getIndex(path) {
    var arr = this.state.Permission;
    if(path.split('/')[1]){
      var checkArryValue = arr.includes(path.split('/')[1]); 
    }
    return checkArryValue;      
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success text-white font-weight-bold">
          <ul className="navbar-nav">
            {this.state.links.map((link, i) =>
              <NavLink
                path={link.path}
                text={link.text}
                isActive={link.isActive}
                key={link.path}
                flag={this.getIndex(link.path)}              
                onClick={() => this.handleClick(i)}
              />
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

class NavLink extends Component {

  render() {
    return (      
        this.props.flag ?
          <li className={"nav-item " + (this.props.isActive ? "active" : "")}>
          <Link
            className="nav-link"
            to={this.props.path}
            onClick={() => this.props.onClick()}
          >
            {this.props.text}</Link>
        </li>:null
    );
  }
}

const App = () => (
  <div>
    <Header />
    <CompanyLogo />
    <Main />
    
  </div>
)

export default App;