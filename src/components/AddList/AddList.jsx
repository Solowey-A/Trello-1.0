import React, {useState} from 'react';
import './AddList.scss'
import addSvg from "../../assets/img/add.svg";
import axios from "axios";
const AddList = ({onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const addList = () => {
        if (!inputValue) {
            alert('Enter list name');
            return
        }
        axios.post('http://localhost:3001/lists', {
            name: inputValue
        }).then(
            ({data}) => {
                const listObj = {...data, cards: []}
                onAdd(listObj);
                onClose();
            })
    }

    const onClose = () => {
        setInputValue('');
        toggleAddListPopup();
    };

    const toggleAddListPopup = () => setVisiblePopup(!visiblePopup)

    return (
        <div className="add-list">
            <button onClick={toggleAddListPopup} className="control-button control-button-add-list">
                <img src={addSvg} alt="Add list"/>
            </button>
            {visiblePopup && <div className="add-list__popup">

                <input
                    value={inputValue}
                    type="text"
                    className="add-list__popup-text-field"
                    placeholder="Add name of list"
                    onChange={e => setInputValue(e.target.value)}
                />
                <div className="add-list-buttons-wrapper">
                    <button
                        className="button-accept"
                        onClick={addList}
                    >Add List
                    </button>

                    <button
                        className="button-accept"
                        onClick={toggleAddListPopup}
                    >Cancel
                    </button>
                </div>
            </div>}

        </div>
    );

};

export default AddList;