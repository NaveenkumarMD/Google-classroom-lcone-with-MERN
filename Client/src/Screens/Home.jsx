import React from 'react'
import Classcard from '../Components/Classcard'
import plus from '../Assets/plus1.svg'
import '../Styles/home.css'
import todo from '../Assets/todo.png'
import toreview from '../Assets/review1.png'
import Navbarwithprofile from '../Components/Navbarwithprofile'
import Modal from 'react-modal';
import { GrClose } from "react-icons/gr";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useHistory} from 'react-router-dom'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '10px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "500px",
    padding: "40px",
  },
};
function Home() {
  let subtitle;
  const history = useHistory()
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function openModal() {
    setAnchorEl(null);
    setIsOpen(true);
    document.getElementById('plus').style.zIndex=0;
  }
  function closeModal() {
    setIsOpen(false);
    document.getElementById('plus').style.zIndex=10;
  }
  return (
    <div>
      <Navbarwithprofile />
      <div className="top-bar-options">
        <img src={todo} width="25px" />
        <span>To do</span>

        <img src={toreview} width="25px" />
        <span>To review</span>
      </div>
      <div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>history.push("/createroom")}>Create room</MenuItem>
        <MenuItem onClick={openModal}>Join room</MenuItem>

      </Menu>
    </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-close-btn" onClick={closeModal}><GrClose /></div>
        <div className="modal-header" style={{ alignItems: "center" }}>
          <div className="join-class-text">
            <div>Join Class</div>

            <div>Join a class to start learning,Ask your class teacher for the class code</div>
          </div>

        </div>
        <div className="modal-body">
          <input type="text" placeholder="Class Code" /><br />
          <button>Submit</button>
        </div>
        <div>

        </div>
      </Modal>
      <div className="join-class-button flex-space-between" style={{ justifyContent: "center" }} id="plus">


        <img  src={plus} width="30px"   id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} />


      </div>
      <div className="classes-home">
        <Classcard />
        <Classcard />
        <Classcard />
        <Classcard />
        <Classcard />
        <Classcard />
        <Classcard />
        <Classcard />

      </div>
    </div>
  )
}

export default Home
