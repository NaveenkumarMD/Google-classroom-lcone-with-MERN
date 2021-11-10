import React, { useEffect } from 'react'
import Classcard from '../Components/Classcard'
import plus from '../Assets/plus1.svg'
import '../Styles/home.css'
import todo from '../Assets/todo.png'
import toreview from '../Assets/review1.png'
import Navbarwithprofile from '../Components/Navbarwithprofile'
import Modal from 'react-modal';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Stream from './Stream'
import JoinclassroomModal from '../Components/JoinclassroomModal'
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
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
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
    document.getElementById('plus').style.zIndex = 0;
  }
  function closeModal() {
    setIsOpen(false);
    document.getElementById('plus').style.zIndex = 10;
  }
  useEffect(() => {
    fetch('/myrooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },


    }).then(res => res.json()).then(data => {
      if (data.error) {
        return toast.error(data.error)
      }
      console.log(data)
      dispatch({ type: 'GETCLASSES', payload: data.roomdata })

    }).catch(err => {
      console.log(err)
    })
  }, [])
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
          <MenuItem onClick={() => history.push("/createroom")}>Create room</MenuItem>
          <MenuItem onClick={openModal}>Join room</MenuItem>

        </Menu>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <JoinclassroomModal closeModal={closeModal}/>
      </Modal>
      <div className="join-class-button flex-space-between" style={{ justifyContent: "center" }} id="plus">


        <img src={plus} width="30px" id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick} />


      </div>
      <div className="classes-home">
        {
          store.classesasteacher && store.classesasteacher.map(item => {
            console.log(item)
            return (
              <Classcard roomdata={item}  />
            )
          })
        }
        {
          store.classesasstudent && store.classesasstudent.map(item => {
            return (
              <Classcard roomdata={item} />
            )
          })
        }



      </div>
    </div>
  )
}

export default Home
