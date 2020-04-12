import React, {Component} from 'react';
import "./textarea.sass";

export default class Textarea extends Component {
    state = {
        name: this.props.name,
        val: this.props.val,
        require: this.props.required,
    };
    render() {
        let { name, val } = this.state;
        let { thisClass, rows } = this.props;
        return (
            <React.Fragment>
                <textarea
                    className={thisClass}
                    name={name}
                    rows={rows}
                    defaultValue={val}
                />
            </React.Fragment>
        )
    }
};
