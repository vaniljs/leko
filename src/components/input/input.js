import React, {Component} from 'react';
import "./input.sass";

export default class Input extends Component {
    state = {
        type: this.props.type,
        name: this.props.name,
        place: this.props.placehold,
        val: this.props.val,
        require: this.props.required,
        error: true
    };
    dataSearch = (e) => {
       this.props.onSearchChange(e.target.name, e.target.value);
    };
    render() {
        let {place, name, val, type} = this.state;
        let {clas} = this.props;
        return (
            <React.Fragment>
                <input
                    type={type}
                    className={clas}
                    name={name}
                    placeholder={place}
                    defaultValue={val}
                    onInput={this.dataSearch}
                />
            </React.Fragment>
        )
    }
};
