import React, {Component} from 'react';
import SideBar from '../components/SideBar';
import MyMap from '../components/Map';
import Alerts from "../components/Alerts";

export default class MapView extends Component {

    render() {
        return (
            <div>
                <SideBar />
                <Alerts/>
                <MyMap />
            </div>
        );
    }
}