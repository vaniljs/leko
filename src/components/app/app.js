import React, {Component} from 'react';
import Input from "../input";
import Textarea from "../textarea";
import "./app.sass";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            json: [],
            sortNormal: true,
            sortColumn: 'id',
        };
    }

    connect(e) {
        fetch("http://эваполимер.рф/game-of-thrones/functions.php", {
            method: 'POST',
            body: ('param=' + JSON.stringify(e)),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    data: json,
                    json: json
                });
            })
            .catch(err => console.log(err));
    }

    addPerson = (e) => {
        e.preventDefault();
        let obj = {
            id: this.state.data.length + 1,
            name: e.target.name.value,
            description: e.target.description.value,
            reason_murder: e.target.reason_murder.value,
            killer: e.target.name_killer.value,
            weapon: e.target.weapon.value,
        };
        this.setState({
            isLoaded: false
        });
        this.connect({'add': obj});
    };

    delete = (e) => {
        this.setState({
            isLoaded: false
        });
        this.connect({'del': {'id': e.target.id}});
        this.onSearchChange;
    };

    sortColumn = (e) => {
        let dataHave = this.state.json;
        let nameSort = e.currentTarget.dataset.name;
        if (e.currentTarget.dataset.name === this.state.sortColumn && this.state.sortNormal) {
            dataHave.sort(function (a, b) {if (a[nameSort] > b[nameSort]) {return -1}});
            this.setState({
                sortColumn: nameSort,
                data: dataHave,
                sortNormal: false
            })
        } else {
            dataHave.sort(function (a, b) {if (a[nameSort] < b[nameSort]) {return -1}});
            this.setState({
                data: dataHave,
                sortColumn: nameSort,
                sortNormal: true
            })
        }
    };

    componentDidMount() {
        this.connect({'get': 'get'});
    }

    render() {
        const {error, isLoaded, data, sortNormal, sortColumn} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div className="container mt-5">
                    <form
                        onSubmit={this.addPerson}>
                        <div className="form-row align-items-center">
                            <div className="col-md-6 col-sm-12 mt-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <img src="img/royalty.svg" alt=""/>
                                        </div>
                                    </div>
                                    <Input
                                        name="name"
                                        clas="form-control"
                                        val="Дейенерис Таргариен"/>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <img src="img/skull.svg" alt=""/>
                                        </div>
                                    </div>
                                    <Input
                                        name="reason_murder"
                                        clas="form-control"
                                        val="Убийство"/>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <img src="img/scream.svg" alt=""/>
                                        </div>
                                    </div>
                                    <Input
                                        name="name_killer"
                                        clas="form-control"
                                        val="Джон Сноу"/>
                                </div>
                                <div className="input-group mt-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <img src="img/sword.svg" alt=""/>
                                        </div>
                                    </div>
                                    <Input
                                        name="weapon"
                                        clas="form-control"
                                        val="Кинжал"/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 mt-3">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <img src="img/paper.svg" alt=""/>
                                        </div>
                                    </div>
                                    <Textarea
                                        name="description"
                                        rows="8"
                                        val="Дочь свергнутого короля Семи Королевств из династии Таргариенов Эйриса Безумного. "
                                    />
                                </div>
                            </div>
                            <div className="col-2 mt-3 offset-10 d-flex justify-content-end">
                                {isLoaded ? false : <img src="img/rolling.svg" alt=""/>}
                                <button type="submit" className="btn btn-dark float-right ml-3">
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </form>
                    <table className="table table-responsive table-hover table-dark text-center mt-2">
                        <thead>
                        <tr>
                            <th scope="col"
                                data-name="id"
                                onClick={this.sortColumn}>
                                {sortColumn === "id" ? (
                                <img
                                    src="img/arrow.svg"
                                    alt=""
                                    className={sortNormal ? '' : "sort_reverse"}/>
                                ) : false}
                                #
                            </th>
                            <th scope="col"
                                className="name"
                                data-name="name"
                                onClick={this.sortColumn}>
                                {sortColumn === "name" ? (
                                    <img
                                        src="img/arrow.svg"
                                        alt=""
                                        className={sortNormal ? '' : "sort_reverse"}/>
                                ) : false}
                                Имя
                            </th>
                            <th scope="col"
                                className="description"
                                data-name="description"
                                onClick={this.sortColumn}>
                                {sortColumn === "description" ? (
                                    <img
                                        src="img/arrow.svg"
                                        alt=""
                                        className={sortNormal ? '' : "sort_reverse"}/>
                                ) : false}
                                Описание
                            </th>
                            <th
                                scope="col"
                                data-name="reason_murder"
                                onClick={this.sortColumn}>
                                {sortColumn === "reason_murder" ? (
                                    <img
                                        src="img/arrow.svg"
                                        alt=""
                                        className={sortNormal ? '' : "sort_reverse"}/>
                                ) : false}
                                Причина
                            </th>
                            <th
                                scope="col"
                                className="killer"
                                data-name="killer"
                                onClick={this.sortColumn}>
                                {sortColumn === "killer" ? (
                                    <img
                                        src="img/arrow.svg"
                                        alt=""
                                        className={sortNormal ? '' : "sort_reverse"}/>
                                ) : false}
                                Убийца
                            </th>
                            <th
                                scope="col"
                                data-name="weapon"
                                onClick={this.sortColumn}>
                                {sortColumn === "weapon" ? (
                                    <img
                                        src="img/arrow.svg"
                                        alt=""
                                        className={sortNormal ? '' : "sort_reverse"}/>
                                ) : false}
                                Орудие
                            </th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <th>{item.name}</th>
                                <th>{item.description}</th>
                                <th>{item.reason_murder}</th>
                                <th>{item.killer}</th>
                                <th>{item.weapon}</th>
                                <th>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        id={item.id}
                                        onClick={this.delete.bind(this)}>
                                        X
                                    </button>
                                </th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
};

