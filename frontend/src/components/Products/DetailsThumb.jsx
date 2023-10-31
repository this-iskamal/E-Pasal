import React, { Component } from 'react'
import server from '../../utils/server';

export class DetailsThumb extends Component {
    render() {
        const {image, tab, myRef} = this.props;
        return (
            <div className="thumb" ref={myRef}>
                {
                image.map((img, index) =>(
                    <img src={`${server}/${img.image}`} alt="" key={index} 
                    onClick={() => tab(index)}
                    />
                ))
                }
            </div>
        )
    }
}

export default DetailsThumb
