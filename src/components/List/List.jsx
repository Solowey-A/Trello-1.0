import React, {useState} from 'react';

import removeSvg from '../../assets/img/remove.svg';
import editSvg from '../../assets/img/edit.svg';
import addSvg from '../../assets/img/add.svg'
import './List.scss'
import Card from "../Card/Card";
import AddCard from "../AddCard/AddCard";
import AddList from "../AddList/AddList";
import axios from "axios";

const List = ({
                  lists,
                  onAdd,
                  onRemoveList,
                  onEditListTitle,
                  onAddCard,
                  onRemoveCard,
                  onEditCard,
                  onEditCardTitle,
                  handleDragStart,
                  dragging,
                  onChangeDeadline,
                  getStyles
              }) => {

    const removeList = (list) => {
        if (window.confirm('Do you really want to remove this List ?')) {
            axios.delete('http://localhost:3001/lists/' + list.id).then(({data}) => {
                onRemoveList(list.id)
            })
        }
    }

    const editListTitle = (list) => {
        const newTitle = window.prompt('Rename list header', list.name);
        if (newTitle) {
            onEditListTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Failed to update')
            })
        }
    }
    return (
        <div className="list-container">
            {
                lists.map((list, index) => (
                    <div className="trello-list" key={index}>
                        <div className="trello-list-headline">
                            <h5 className="trello-list-title">
                                {list.name}
                            </h5>

                            <div className="trello-list-control">
                                <button onClick={() => editListTitle(list)} className="control-button">
                                    <img src={editSvg} alt="edit"/>
                                </button>
                                <button onClick={() => removeList(list)} className="control-button">
                                    <img src={removeSvg} alt="remove"/>
                                </button>
                            </div>
                        </div>

                        <div className="trello-list-container">

                            {list.cards ? list.cards.map((card, cardIndex) => (
                                <Card
                                    key={card.id}
                                    title={card.title}
                                    text={card.text}
                                    id={card.id}
                                    card={card}
                                    cardIndex={cardIndex}
                                    list={list}
                                    onRemoveCard={onRemoveCard}
                                    onEditCard={onEditCard}
                                    onEditCardTitle={onEditCardTitle}
                                    handleDragStart={handleDragStart}
                                    onChangeDeadline={onChangeDeadline}
                                    dragging={dragging}
                                    getStyles={getStyles}
                                />
                            )) : ''}
                        </div>

                        <AddCard
                                id={list.id}
                                list={list}
                                onAddCard={onAddCard}
                        />


                    </div>
                ))
            }
            <AddList onAdd={onAdd}/>

        </div>
    );
};

export default List;