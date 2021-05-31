import React, { Component } from 'react';
import style from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class Layout extends Component {

  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  toggleMenuClose = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={style.Layout}>
        <main>
          <Drawer isOpen={this.state.menu} onClick={this.toggleMenuClose}/>
          <MenuToggle
            onToggle={this.toggleMenuHandler}
            isOpen={this.state.menu}
          />
          {this.props.children}
        </main>
      </div>
    )
  }
} 

export default Layout;