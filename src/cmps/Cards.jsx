import React, { useState } from 'react';

const Songs = () => {
    const [songs, setSongs] = useState([
        {id:1, title:'in The name of Love', artist:'Martin Garrix', order:1},
        {id:2, title:'Lions In The Wild', artist:'Martin Garrix', order:2},
        {id:3, title:'Hold ON', artist:'Martin Garrix', order:3},
        {id:4, title:'BUisness', artist:'Eminem', order:6},
        {id:5, title:'the way i Am', artist:'Eminem', order:5},
        {id:6, title:'Bandit', artist:'JUICE WRLD', order:4},
        {id:7, title:'Animals', artist:'Martin Garrix', order:7}
    ])
    const [currentCard, setCurrentCard] = useState(null)

    function simpleSort (a, b) {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    const onDragStarted = (e, card) => {
        setCurrentCard(card)
    }

    const onDragOver = (e, song) => {
        e.preventDefault()
        const target = e.target.closest('.song-item')
        // if (e.target.className === 'song-item') {
            target.style.borderTop = '2px solid rgb(88, 196, 69)'
        // }
    }

    const onDragLeave = e => {
        if (e.target.className === 'song-item') {
            e.target.style.borderTop = '1px solid gray'
        }
    }

    const onDrop = (e, card) => {
        e.preventDefault()
        
        if (e.target.closest('.song-item')) {
            if (currentCard !== card) {
                setSongs(songs.map(s => {
                    if (card.order < currentCard.order) {
                        if (s.order < card.order) {
                            return s
                        }
                        if (s.id == currentCard.id) {
                            return {...s, order:card.order}
                        }
                        if(s.order > currentCard.order) {
                            return s
                        } else {
                            return {...s, order:s.order+1}
                        }
                    } else {
                        if (s.id === currentCard.id) {
                            return {...s, order:card.order - 1}
                        }
                        // if (s.id === card.id) {
                        //     return {...s, order:currentCard.order }
                        // }
                        if (s.order < card.order && s.order > currentCard.order) {
                            return {...s, order: s.order - 1}
                        } else {
                            return s
                        }
                    }
                }))
                
            }
                
        }
    // setCurrentCard(null)
    console.log(';;')
    e.target.style.borderTop =  e.target.style.borderTop == '2px solid rgb(88, 196, 69)' ? '1px solid gray' : ''
        
    }

    return (
        <div
        className='songs-list'
        >
        <ul>
            {songs.sort(simpleSort).map(song => 
                <li
                onDrag={e => onDragStarted(e, song)}
                onDragOver={e => onDragOver(e, song)}
                onDragLeave={e => onDragLeave(e)}
                onDrop={e => onDrop(e, song)}
                draggable={true}
                className='song-item'
                key={song.id}
                >
                    <div
                    style={{
                        textAlign: 'left'
                    }}
                    >
                    <strong>
                        {song.order}
                    </strong>
                    &nbsp;
                    <strong>
                    {song.title}
                    </strong>
                    <br/>
                    {song.artist}
                    </div>

                    <div 

                    className='burger'>
                        <span
                        className='song-span'
                        />
                    </div>
                    
                </li>
                )}
        </ul>
        </div>
    );
};

export default Songs;