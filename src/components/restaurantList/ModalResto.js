import React, { Component, Fragment } from 'react';
import isEqual from 'lodash.isequal';


class ModalResto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen : false,
            reviews : [ ]
        }
    }

}