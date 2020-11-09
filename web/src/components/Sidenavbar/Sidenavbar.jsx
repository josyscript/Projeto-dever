import React, { useState, useContext } from "react";
import { NotesContext } from "context/context";
import StoreContext from "../Store/Context";

//import dropdown from "dropdown.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faInfo,
  faPlus,
  faSearch,
  faStar,
  faStickyNote,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  SideNavBar,
  SideNavBarTop,
  SideNavBarTopProfile,
  ProfileIcon,
  ProfileTitle,
  SideNavBarTopSearch,
  SearchBlock,
  SideNavBarTopCreateNote,
  NoteTitle,
  NoteButton,
  SideNavBarTopMenuItem,
  SideNavBarBottom,
  SideNavBarBottomNeedHelp,
  FilePlus,
  FileTrash,
  FileStar,
} from "./SidenavbarStyle";

//ROTAS
import { NavLink, useHistory } from "react-router-dom";
import { postRequest } from "utils/apiRequests";
import { BASE_URL, CREATE_NOTE } from "utils/apiEndpoints";

const Sidenavbar = () => {
  const notesContext = useContext(NotesContext);
  const history = useHistory();
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);

  const handleCreateNote = async () => {
    const response = await postRequest(`${BASE_URL}${CREATE_NOTE}`);
    console.log(response);
    if (response.error) {
      setError(response.error);
      return false;
    }

    if (response._id) {
      notesContext.notesDispatch({
        type: "createNoteSuccess",
        payload: response,
      });
      history.push({
        pathname: `/all-notes/${response._id}`,
        note: response,
      });
    }

  };

  function handleClickDrop(e) {
    e.preventDefault();
    var box =  document.querySelector(".dropdown-menu");
  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
  }
 

  return (
    <SideNavBar>
      <SideNavBarTop>
        <SideNavBarTopProfile>
          <ProfileIcon>M</ProfileIcon>
          <ProfileTitle>
            Matheus Moreira            
            <div className="dropdown-container" onClick={handleClickDrop}>
              <div className="dropdown-toggle click-dropdown">
              <FontAwesomeIcon className="icon" icon={faAngleDown} />
              
              <div className="dropdown-menu">
              <button type="button">
                Perfil
              </button>
              <button type="button" onClick={() => setToken(null)}>
                Sair
              </button>
              </div>
              </div>
            </div>      
          </ProfileTitle>
        </SideNavBarTopProfile>
        <SideNavBarTopSearch>
          <SearchBlock>
            <FontAwesomeIcon className="icon" icon={faSearch} />
            <input placeholder="Procure uma nota"></input>
          </SearchBlock>
        </SideNavBarTopSearch>
        <SideNavBarTopCreateNote>
          <NoteButton onClick={handleCreateNote}>
          <FontAwesomeIcon className="icon" icon={faPlus} /> 
            
            <NoteTitle>Nova Nota</NoteTitle>
          </NoteButton>
        </SideNavBarTopCreateNote>
        <SideNavBarTopMenuItem>
          <ul>
            <li>
              <NavLink to="/fav-1">
                <FontAwesomeIcon className="icon" icon={faStar} />
                Favorito
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-notes">
               { /*} <FontAwesomeIcon className="icon" icon={faStickyNote} />*/}
               <FilePlus />
                Todas Anotações
              </NavLink>
            </li>
            <li>
              <NavLink to="/fav-2">
                <FileStar />
                Favorito
              </NavLink>
            </li>
            <li>
              <NavLink to="/trash">
                {/*<FontAwesomeIcon className="icon" icon={faTrash} />*/}
                <FileTrash />
                Lixeira
              </NavLink>
            </li>
          </ul>
        </SideNavBarTopMenuItem>
      </SideNavBarTop>
      <SideNavBarBottom>
        <SideNavBarBottomNeedHelp>
          <FontAwesomeIcon className="icon" icon={faInfo} />
          Clique aqui para mais info!
        </SideNavBarBottomNeedHelp>
      </SideNavBarBottom>
    </SideNavBar>
  );
};


export default Sidenavbar;