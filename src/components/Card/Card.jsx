import React, {useState} from 'react';
import './Card.scss';
import editSvg from "../../assets/img/edit.svg";
import removeSvg from "../../assets/img/remove.svg";

import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

const Card = ({
                  text, title,
                  id, card,
                  list, onRemoveCard,
                  onEditCard, onEditCardTitle,
                  handleDragStart, dragging, getStyles, cardIndex,onChangeDeadline
              }) => {

    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleDateChange = (date) => {

        const now = new Date()

        let color;
        if (date.getDate() - now.getDate() <= 0) {
            color = '#cb0e0e';
            onChangeDeadline(list.id, {id, color})
        } else if (date.getDate() - now.getDate() === 1) {
            color = '#e3692e';
            onChangeDeadline(list.id, {id, color})
        } else if (date.getDate() - now.getDate() === 2) {
            color = '#eebf28';
            onChangeDeadline(list.id, {id, color})
        } else if (date.getDate() - now.getDate() >= 3) {
            color = '#32d430';
            onChangeDeadline(list.id, {id, color})
        }
        setSelectedDate(date)
    }

    const removeCard = () => {
        onRemoveCard(list.id, card.id)
    }

    const [visibleEditCardPopup, setVisibleEditCardPopup] = useState(false);

    const toggleVisibleEditCardPopup = () => {
        setVisibleEditCardPopup(!visibleEditCardPopup);
    }

    const editCardText = () => {
        onEditCard(list.id, {id, text})
        toggleVisibleEditCardPopup()
    }

    const editCardTitle = () => {
        onEditCardTitle(list.id, {id, title})
        toggleVisibleEditCardPopup()
    }

    const listID = list.id;
    const cardID = card.id;
    const index = cardIndex;
    const dragStart = () => {
        handleDragStart({listID, cardID, cardIndex})
    }

    return (
        <div
            draggable
            onDragStart={dragStart}
            className={dragging ? getStyles({listID, cardID, cardIndex}) : "trello-list-item"}>

            <div className="cardHeader">
                <h2 className="cardTitle">{title}</h2>
            </div>

            <div className="trello-list-item-status">
                {card.color &&
                <span
                    className="status-decor"
                    key={card.id}
                    style={{backgroundColor: `${card.color}`}}
                >
                    </span>
                }
                <button onClick={toggleVisibleEditCardPopup} className="control-button-more"><span>...</span></button>

                {visibleEditCardPopup &&
                <div className="edit-card-wrapper">
                    <div className="edit-card__popup">
                        <button onClick={toggleVisibleEditCardPopup}
                                className="control-button control-button-remove-card">
                            <img src={removeSvg} alt="remove"/>
                        </button>

                        <div onClick={editCardTitle} className="edit-group"><h2
                            className="edit-group__text">{title}</h2><img className="control-button" src={editSvg}
                                                                          alt="edit button"/></div>
                        <div onClick={editCardText} className="edit-group"><p className="edit-group__text">{text}</p>
                            <img className="control-button" src={editSvg} alt="edit button"/></div>
                        <div className="deadline">
                            <h2 className="deadline-header">Deadline here</h2>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='dialog'
                                    format='MM/dd/yyy'
                                    margin='normal'
                                    id='date-picker'
                                    label='Deadline date'
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>

                </div>}

                <button onClick={removeCard} className="control-button control-button-remove-card">
                    <img src={removeSvg} alt="remove"/>
                </button>

            </div>
            <div className="trello-list-item__text">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Card;