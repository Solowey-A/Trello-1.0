import React, {useState} from 'react';

import './AddCard.scss';
import addSvg from "../../assets/img/add.svg";
import axios from "axios";


const AddCard = ({list, onAddCard}) => {
    const [visibleAddCardPopup, setVisibleAddCardPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [titleInputValue, setTitleInputValue] = useState('');

    const toggleAddCardPopup = () => {
        setVisibleAddCardPopup(!visibleAddCardPopup)
        setInputValue('')
        setTitleInputValue('')
    }

    const addCard = () => {
        const obj = {
            listId: list.id,
            title: titleInputValue,
            text: inputValue,
            color: '#1262d9'
        }
        axios.post('http://localhost:3001/cards', obj)
            .then(
                ({data}) => {

            onAddCard(list.id, data)
            toggleAddCardPopup()
        })

    }

    return (
        <div className="trello-list-bottom-control">
            <button id={list.id} onClick={toggleAddCardPopup} className="control-button control-button-add-card">
                <img src={addSvg} alt="Add card"/>
                <span>Add new task</span>
            </button>

            {visibleAddCardPopup &&
            <div className="add-card__popup">

                <input
                    value={titleInputValue}
                    type="text"
                    className="add-card__popup-text-field"
                    placeholder="Add task title"
                    onChange={e => setTitleInputValue(e.target.value)}
                />

                <textarea
                    value={inputValue}
                    className="add-card__popup-text-field"
                    placeholder="Add task description"
                    onChange={e => setInputValue(e.target.value)}
                />

                <div className="add-list-buttons-wrapper">
                    <button
                        className="button-accept"
                        onClick={addCard}
                    >Add Card
                    </button>

                    <button
                        className="button-accept"
                        onClick={toggleAddCardPopup}
                    >Cancel
                    </button>
                </div>
            </div>
            }
        </div>
    );
};

export default AddCard;